import { Routes, Route, Link } from "react-router-dom";
import IndexPage from "@/routes/index";
import StationsPage from "@/routes/stations";
import NewsPage from "@/routes/news";
import ArticleDetailPage from "@/routes/news_.articleId";
import ServicesPage from "@/routes/services";
import MarketplaceLayout from "@/routes/marketplace";
import MarketplaceIndex from "@/routes/marketplace.index";
import BuyIndex from "@/routes/marketplace.buy.index";
import BuyDetail from "@/routes/marketplace.buy.carId";
import SellIndex from "@/routes/marketplace.sell.index";
import SellDetail from "@/routes/marketplace.sell.carId";
import RentPage from "@/routes/marketplace.rent";
import AdminLayout, { AdminIndexRedirect } from "@/routes/admin";
import AdminArticlesPage from "@/routes/admin.articles";
import AdminStationsPage from "@/routes/admin.stations";
import AuthPage from "@/routes/auth";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/stations" element={<StationsPage />} />
      <Route path="/news" element={<NewsPage />} />
      <Route path="/news/:articleId" element={<ArticleDetailPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminIndexRedirect />} />
        <Route path="articles" element={<AdminArticlesPage />} />
        <Route path="stations" element={<AdminStationsPage />} />
      </Route>
      <Route path="/marketplace" element={<MarketplaceLayout />}>
        <Route index element={<MarketplaceIndex />} />
        <Route path="buy" element={<BuyIndex />} />
        <Route path="buy/:carId" element={<BuyDetail />} />
        <Route path="sell" element={<SellIndex />} />
        <Route path="sell/:carId" element={<SellDetail />} />
        <Route path="rent" element={<RentPage />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}