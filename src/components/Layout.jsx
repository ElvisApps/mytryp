import { useLanguage } from "../i18n/LanguageContext";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import { brand } from "../config/portal";
export const links = [
  ["/", "Home"],
  ["/rules", "Rules & Safety"],
  ["/requirements", "Requirements"],
  ["/subscriptions", "Subscriptions & Income"],
];
export default function Layout() {
  const { t: tr, language, setLanguage } = useLanguage();
  const { pathname } = useLocation();
  const main = useRef(null);
  useEffect(() => {
    document.title = `${tr(links.find(([url]) => url === pathname)?.[1] || "Page not found")} | mytryp ${tr("Driver Portal")}`;
  }, [pathname, tr]);
  useEffect(() => {
    window.scrollTo(0, 0);
    main.current?.focus();
  }, [pathname]);
  return (
    <>
      <a
        className="skip"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          main.current?.focus();
          main.current?.scrollIntoView();
        }}
      >
        {" "}
        {tr("Skip to content")}{" "}
      </a>
      <header>
        <div className="header-inner">
          <NavLink
            to="/"
            className="brand"
            aria-label={tr("mytryp Driver Portal home")}
          >
            {tr(
              brand.logoUrl ? (
                <img src={brand.logoUrl} alt="mytryp" />
              ) : (
                <span className="wordmark">
                  {" "}
                  {tr("mytryp")}
                  <span className="brand-dot">.</span>
                </span>
              ),
            )}
            <span className="brand-divider" />
            <span className="brand-label">{tr("Driver Portal")}</span>
          </NavLink>
          <label className="language-picker">
            <span className="sr-only">Language / Polelo</span>
            <select
              aria-label="Language / Polelo"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <option value="en">English</option>
              <option value="nso">Sepedi</option>
            </select>
          </label>
          <span className="header-note">
            {tr("Your next trip starts here")}
          </span>
        </div>
        <nav aria-label={tr("Main navigation")}>
          <div className="nav-inner">
            {links.map(([to, label]) => (
              <NavLink key={to} to={to} end={to === "/"}>
                {tr(label)}
              </NavLink>
            ))}
          </div>
        </nav>
      </header>
      <main id="main" tabIndex="-1" ref={main}>
        <Outlet />
      </main>
      <footer>
        <div>
          <span className="wordmark">
            {" "}
            {tr("mytryp")}
            <span className="brand-dot">.</span>
          </span>
          <p>{tr("Better informed. Better prepared.")}</p>
        </div>
        <div>
          <p>{tr("Driver information portal · Read only")}</p>
          <small>{tr(brand.reviewLabel)}</small>
        </div>
      </footer>
    </>
  );
}
