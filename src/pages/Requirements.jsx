import { useLanguage } from "../i18n/LanguageContext";
import PageIntro from "../components/PageIntro";
import { requirements, onboarding, requirementNote } from "../config/portal";
export default function Requirements() {
  const { t: tr } = useLanguage();
  return (
    <>
      <PageIntro
        eyebrow={tr("02 / DRIVER REQUIREMENTS")}
        title={tr("Ready for your first trip?")}
      >
        {" "}
        {tr(
          "Prepare your documents and vehicle before starting verification in the driver app.",
        )}{" "}
      </PageIntro>
      <div className="requirements-grid">
        {requirements.map((r, i) => (
          <section className="policy-card" key={r.title}>
            <span className="step-badge">0{tr(i + 1)}</span>
            <h2>{tr(r.title)}</h2>
            <ul>
              {r.items.map((item) => (
                <li key={item}>{tr(item)}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <section className="section">
        <span className="eyebrow">{tr("FROM APPLICATION TO APPROVAL")}</span>
        <h2>{tr("Your onboarding, step by step.")}</h2>
        <ol className="steps">
          {onboarding.map(([title, body], i) => (
            <li key={title}>
              <span>{tr(i + 1)}</span>
              <div>
                <h3>{tr(title)}</h3>
                <p>{tr(body)}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
      <aside className="notice">
        <strong>{tr("Before you go online")}</strong>
        <p>{tr(requirementNote)}</p>
      </aside>
    </>
  );
}
