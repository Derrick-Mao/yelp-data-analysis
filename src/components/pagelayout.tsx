import Header from "../components/header";

interface PageLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  titleColor?: string;
  descriptionColor?: string;
}

export default function PageLayout({
  title,
  description,
  children,
  titleColor = "text-white",
  descriptionColor = "text-white",
}: PageLayoutProps) {
  return (
    <div>
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className={`text-2xl font-bold mb-2 ${titleColor}`}>{title}</h2>
        {description && (
          <p className={`mb-6 ${descriptionColor}`}>{description}</p>
        )}
        {children}
      </main>
    </div>
  );
}
