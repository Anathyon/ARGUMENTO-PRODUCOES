import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const HomePage       = lazy(() => import("./pages/Home"));
const TrabalhosList  = lazy(() => import("./pages/TrabalhosList"));
const TrabalhoDetail = lazy(() => import("./pages/TrabalhoDetail"));
const PortfolioList  = lazy(() => import("./pages/PortfolioList"));
const PortfolioDetail = lazy(() => import("./pages/PortfolioDetail"));
const NoticiasList   = lazy(() => import("./pages/NoticiasList"));
const NoticiaDetail  = lazy(() => import("./pages/NoticiaDetail"));

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-8 w-8 rounded-full border-2 border-brand-orange border-t-transparent animate-spin" />
    </div>
  );
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trabalhos" element={<TrabalhosList />} />
        <Route path="/trabalhos/:slug" element={<TrabalhoDetail />} />
        <Route path="/portfolio" element={<PortfolioList />} />
        <Route path="/portfolio/:slug" element={<PortfolioDetail />} />
        <Route path="/noticias" element={<NoticiasList />} />
        <Route path="/noticias/:slug" element={<NoticiaDetail />} />
      </Routes>
    </Suspense>
  );
}
