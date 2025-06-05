import time
from functools import reduce
from operator import add
from pyspark.sql import SparkSession
from pyspark.sql.functions import explode, split, trim, to_timestamp, month, year, col, count, when

def create_spark_session():
    return SparkSession.builder \
        .appName("YelpCheckinPrecompute") \
        .config("spark.jars.packages", "org.mongodb.spark:mongo-spark-connector_2.12:10.5.0") \
        .config("spark.mongodb.read.connection.uri", "mongodb://100.105.156.62:27017/yelpdb") \
        .config("spark.mongodb.write.connection.uri", "mongodb://100.105.156.62:27017/yelpdb") \
        .master("local[*]") \
        .getOrCreate()

def precompute_checkin_summary():
    spark = create_spark_session()
    print("Spark session created.")

    # Load raw data
    checkin_df = spark.read.format("mongodb").option("collection", "checkins").load()
    business_df = spark.read.format("mongodb").option("collection", "businesses").load()

    # Drop unnecessary columns
    business_df = business_df.drop("address", "state", "postal_code", "attributes")

    # Join business info to checkins
    merged_df = checkin_df.join(
        business_df.select("business_id", "name", "city", "categories"),
        on="business_id", how="inner"
    )

    # Explode check-in timestamps and extract month/year
    exploded_df = merged_df \
        .withColumn("checkin_time", explode(split(col("date"), ", "))) \
        .withColumn("checkin_time", to_timestamp(trim(col("checkin_time")), "yyyy-MM-dd HH:mm:ss")) \
        .withColumn("month", month(col("checkin_time"))) \
        .withColumn("year", year(col("checkin_time")))

    # Monthly aggregation
    month_df = exploded_df.groupBy("business_id", "month").agg(count("*").alias("monthly_checkins"))

    # Pivot table with months
    month_abbr = [
        "Jan Count", "Feb Count", "Mar Count", "Apr Count", "May Count", "Jun Count",
        "Jul Count", "Aug Count", "Sep Count", "Oct Count", "Nov Count", "Dec Count"
    ]
    pivot_df = month_df.groupBy("business_id").pivot("month", list(range(1, 13))).sum("monthly_checkins")

    pivot_df = pivot_df.select(
        "business_id", *[col(str(i + 1)).alias(month_abbr[i]) for i in range(12)]
    )

    # Replace nulls with 0
    for m in month_abbr:
        pivot_df = pivot_df.withColumn(m, when(col(m).isNull(), 0).otherwise(col(m)))

    # Total count column
    total_expr = reduce(add, [col(m) for m in month_abbr])
    pivot_df = pivot_df.withColumn("Total Count", total_expr)

    # Re-join business info
    result_df = pivot_df.join(business_df.select("business_id", "name", "city", "categories"), on="business_id", how="left")

    # Reorder columns
    result_df = result_df.select("business_id", "name", "city", "categories", *month_abbr, "Total Count")

    # Save to MongoDB as a new collection
    result_df.write.format("mongodb") \
        .mode("overwrite") \
        .option("collection", "monthly_business_checkins") \
        .save()

    print("Summary written to MongoDB collection: `monthly_business_checkins`")

if __name__ == "__main__":
    start = time.time()
    precompute_checkin_summary()
    print(f"Done in {time.time() - start:.2f}s")