import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import WarpBackground from "./components/WarpBackground";
import SiteNav from "./components/SiteNav";
import HomePage from "./pages/HomePage";
import InitiativeDetail from "./pages/InitiativeDetail";
import { identity } from "./data/content";

const App = () => (
  <BrowserRouter>
    <WarpBackground />
    <div className="scene-veil" aria-hidden="true" />
    <SiteNav />
    <main className="site-main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/initiatives/:slug" element={<InitiativeDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
    <footer className="footer">
      © {new Date().getFullYear()} {identity.name} — {identity.role}
    </footer>
    <Analytics />
  </BrowserRouter>
);

export default App;
