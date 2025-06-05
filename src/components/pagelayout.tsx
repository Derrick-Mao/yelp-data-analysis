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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`text-2xl font-bold mb-2 ${titleColor}`}>{title}</div>
        {description && (
          <p className={`mb-6 ${descriptionColor}`}>{description}</p>
        )}
        {children}
    </div>
  );
}
