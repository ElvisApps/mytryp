import { useLanguage } from "../i18n/LanguageContext";
import { Link } from "react-router-dom";
import { introduction, pickupNotice } from "../config/portal";
import { plans } from "../config/pricing";
import { money } from "../lib/income";
export default function Home() {
  const { t: tr } = useLanguage();
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow light">{tr("THE MYTRYP DRIVER GUIDE")}</span>
          <h1>
            {" "}
            {tr("Your journey.")} <br /> {tr("Your earnings.")} <br />
            <em>{tr("Your mytryp.")}</em>
          </h1>
          <p>{tr(introduction)}</p>
          <Link className="button lime" to="/requirements">
            {" "}
            {tr("Get ready to drive")} <span aria-hidden="true">↗</span>
          </Link>
          <Link className="text-link" to="/rules">
            {" "}
            {tr("Read the driver rules →")}{" "}
          </Link>
        </div>
        <div className="hero-art" aria-hidden="true">
          <div className="map-grid" />
          <div className="route-line" />
          <span className="map-pin pin-one">●</span>
          <span className="map-pin pin-two">●</span>
          <div className="map-label label-one">{tr("Your pickup")}</div>
          <div className="map-label label-two">{tr("Their doorstep")}</div>
          <div className="trip-card">
            <span className="trip-icon">↗</span>
            <div>
              <strong>{tr("Door to door.")}</strong>
              <span>{tr("Safer journeys start here.")}</span>
            </div>
          </div>
          <span className="art-coordinate">
            {tr("BUILT AROUND YOUR JOURNEY")}
          </span>
        </div>
      </section>
      <section className="quick-facts">
        <div>
          <strong>100%</strong>
          <span>{tr("of trip fares stay with you")}</span>
        </div>
        <div>
          <strong>
            {tr("From")} {money(plans[0].price)}
          </strong>
          <span>
            {tr("for")} {tr(plans[0].duration)} {tr("of access")}
          </span>
        </div>
        <div>
          <strong>{tr("One plan")}</strong>
          <span>{tr("eligible rides & deliveries")}</span>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{tr("YOUR DRIVER TOOLKIT")}</span>
            <h2>{tr("Know before you go.")}</h2>
          </div>
          <p>{tr("Everything you need to prepare for the road.")}</p>
        </div>
        <div className="toolkit">
          {[
            [
              "01",
              "Drive with confidence",
              "Simple operating rules and practical safety precautions.",
              "/rules",
              "Rules & Safety",
            ],
            [
              "02",
              "Get your documents ready",
              "Your eligibility, vehicle checks and onboarding checklist.",
              "/requirements",
              "Driver Requirements",
            ],
            [
              "03",
              "Make the numbers work",
              "Compare plans and explore earnings with clear assumptions.",
              "/subscriptions",
              "Subscriptions & Income",
            ],
          ].map(([n, t, d, url, link]) => (
            <Link className="tool-card" to={url} key={n}>
              <span className="card-number">
                {tr(n)} <span>↗</span>
              </span>
              <h3>{tr(t)}</h3>
              <p>{tr(d)}</p>
              <strong>{tr(link)} →</strong>
            </Link>
          ))}
        </div>
      </section>
      <aside className="notice">
        <strong>{tr(pickupNotice.title)}</strong>
        <p>{tr(pickupNotice.body)}</p>
        <Link to="/rules">{tr("Read the rules →")}</Link>
      </aside>
    </>
  );
}
