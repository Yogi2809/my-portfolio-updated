import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const links = [
  { label: "Home", hash: "#home" },
  { label: "About", hash: "#about" },
  { label: "Strategic Initiatives", hash: "#initiatives" },
  { label: "Skills & Expertise", hash: "#skills" },
  { label: "Experience", hash: "#experience" },
  { label: "Resume", hash: "#resume" },
  { label: "Contact", hash: "#contact" },
];

const SiteNav = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const go = (hash: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      // From a detail page: navigate home first, then scroll
      navigate("/" + hash);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link to="/" className="nav-logo" onClick={() => setOpen(false)}>
          Yogesh Mishra<span>.</span>
        </Link>
        <div className={`nav-links${open ? " open" : ""}`}>
          {links.map((l) => (
            <a
              key={l.hash}
              href={"/" + l.hash}
              onClick={(e) => {
                e.preventDefault();
                go(l.hash);
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
        <button
          className="nav-burger"
          aria-label="Toggle menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
    </nav>
  );
};

export default SiteNav;
