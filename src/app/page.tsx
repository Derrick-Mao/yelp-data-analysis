import Link from "next/link";

interface AnalysisItem {
  title: string;
  description: string;
  emoji: string;
  path: string;
}

const Home = () => {
  const analysisItems: AnalysisItem[] = [
    {
      title: "Rating-Text Anomalies",
      description: "Anomalies between the star rating and the review text",
      emoji: "⚠️",
      path: "/anomaly"
    },
    {
      title: "Seasonal Popularity",
      description: "Seasonal popularity of businesses across different regions",
      emoji: "🌦️",
      path: "/popularity"
    },
    {
      title: "City & Category Trends",
      description: "Popularity trends across different cities and categories",
      emoji: "📊",
      path: "/area"
    },
    {
      title: "Elite vs Non-Elite Users",
      description: "Yelp review behavior comparison between elite and non-elite users",
      emoji: "👑",
      path: "/behavior"
    },
    {
      title: "Category Phrases",
      description: "Frequently used phrases in reviews for every category",
      emoji: "💬",
      path: "/phrase"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Yelp Dataset Analysis
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Analyzing patterns and insights from millions of Yelp reviews and businesses
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="p-6 sm:p-8">
            <div className="text-2xl font-semibold text-gray-800 mb-4">About the Project</div>
            <p className="text-gray-600 mb-6">
              This project an in-depth analysis on the{" "}
              <a 
                href="https://www.kaggle.com/datasets/yelp-dataset/yelp-dataset?select=yelp_academic_dataset_review.json" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Yelp Dataset
              </a>{" "}
              from Kaggle, exploring topics such as business trends, user behavior, and review patterns.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {analysisItems.map((item, index) => (
                <Link href={item.path} key={index} passHref className="block border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-300 hover:border-blue-200 group">
                    <div className="flex items-start">
                      <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-200">{item.emoji}</span>
                      <div>
                        <div className="font-bold text-lg text-gray-800 mb-1 group-hover:text-blue-600 transition-colors duration-200">{item.title}</div>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;