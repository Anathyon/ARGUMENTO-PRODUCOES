import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import TrabalhosList from "./pages/TrabalhosList";
import TrabalhoDetail from "./pages/TrabalhoDetail";
import PortfolioList from "./pages/PortfolioList";
import PortfolioDetail from "./pages/PortfolioDetail";
import NoticiasList from "./pages/NoticiasList";
import NoticiaDetail from "./pages/NoticiaDetail";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/trabalhos" element={<TrabalhosList />} />
      <Route path="/trabalhos/:id" element={<TrabalhoDetail />} />
      <Route path="/portfolio" element={<PortfolioList />} />
      <Route path="/portfolio/:id" element={<PortfolioDetail />} />
      <Route path="/noticias" element={<NoticiasList />} />
      <Route path="/noticias/:id" element={<NoticiaDetail />} />
    </Routes>
  );
}
