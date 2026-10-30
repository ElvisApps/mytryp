import { useLanguage } from "./i18n/LanguageContext";
import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Layout from "./components/Layout";
import PageIntro from "./components/PageIntro";
import Home from "./pages/Home";
import Rules from "./pages/Rules";
import Requirements from "./pages/Requirements";
import Subscriptions from "./pages/Subscriptions";
export default function App() {
  const { t: tr } = useLanguage();
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="rules" element={<Rules />} />
          <Route path="requirements" element={<Requirements />} />
          <Route path="subscriptions" element={<Subscriptions />} />
          <Route
            path="*"
            element={
              <>
                <PageIntro
                  eyebrow={tr("PAGE NOT FOUND")}
                  title={tr("Let’s get you back on track.")}
                >
                  {" "}
                  {tr("This page does not exist.")}{" "}
                </PageIntro>
                <Link className="button dark" to="/">
                  {" "}
                  {tr("Return home")}{" "}
                </Link>
              </>
            }
          />
        </Route>
      </Routes>
    </HashRouter>
  );
}
