import { useLanguage } from "../i18n/LanguageContext";
export default function PageIntro({ eyebrow, title, children }) {
  const { t: tr } = useLanguage();
  return (
    <section className="page-intro">
      <span className="eyebrow">{tr(eyebrow)}</span>
      <h1>{tr(title)}</h1>
      <p>{tr(children)}</p>
    </section>
  );
}
