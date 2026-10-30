import { useLanguage } from "../i18n/LanguageContext";
import PageIntro from "../components/PageIntro";
import { rules, mainRoadAlert, emergencyNotice } from "../config/portal";
export default function Rules() {
  const { t: tr } = useLanguage();
  return (
    <>
      <PageIntro
        eyebrow={tr("01 / RULES & SAFETY")}
        title={tr("Drive safely. Move respectfully.")}
      >
        {" "}
        {tr(
          "Practical rules for every mytryp journey. Your safety and your passengers’ safety come first.",
        )}{" "}
      </PageIntro>
      <aside className="alert">
        <strong>{tr(mainRoadAlert.title)}</strong>
        <p>{tr(mainRoadAlert.body)}</p>
      </aside>
      <div className="policy-grid">
        {rules.map((rule, i) => (
          <section className="policy-card" key={rule.title}>
            <span className="eyebrow">
              0{tr(i + 1)} / {tr(rule.tag)}
            </span>
            <h2>{tr(rule.title)}</h2>
            <ul>
              {rule.items.map((item) => (
                <li key={item}>{tr(item)}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <aside className="notice">
        <strong>{tr(emergencyNotice.title)}</strong>
        <p>{tr(emergencyNotice.body)}</p>
      </aside>
    </>
  );
}
