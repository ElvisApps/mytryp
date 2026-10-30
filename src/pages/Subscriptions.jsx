import { useLanguage } from "../i18n/LanguageContext";
import { useState } from "react";
import PageIntro from "../components/PageIntro";
import {
  plans,
  pricing,
  subscriptionNotes,
  assumptions,
} from "../config/pricing";
import { estimateIncome, money } from "../lib/income";
export default function Subscriptions() {
  const { t: tr } = useLanguage();
  const [planId, setPlanId] = useState(pricing.defaultPlan);
  const [trips, setTrips] = useState(pricing.trips.initial);
  const [fare, setFare] = useState(pricing.fare.initial);
  const plan = plans.find((p) => p.id === planId);
  return (
    <>
      <PageIntro
        eyebrow={tr("03 / SUBSCRIPTIONS & INCOME")}
        title={tr("Choose your pace. See the numbers.")}
      >
        {" "}
        {tr(
          "Simple access plans. You keep 100% of your trip fares, with a separate subscription cost.",
        )}{" "}
      </PageIntro>
      <div className="plans">
        {plans.map((p) => (
          <article
            className={`plan ${p.id === planId ? "selected" : ""}`}
            key={p.id}
          >
            <div className="plan-top">
              <h2>{tr(p.name)}</h2>
              <span>
                {tr(
                  p.days === 30
                    ? "LONGER COVERAGE"
                    : tr(p.duration).toUpperCase(),
                )}
              </span>
            </div>
            <p className="plan-price">
              {money(p.price)}
              <small> / {tr(p.duration)}</small>
            </p>
            <p>{tr(p.description)}</p>
            <button
              className={p.id === planId ? "button dark" : "button outline"}
              aria-pressed={p.id === planId}
              onClick={() => setPlanId(p.id)}
            >
              {tr(
                p.id === planId ? "Selected for estimate" : "Use in estimator",
              )}
              {tr(" ")}
              <span aria-hidden="true">↗</span>
            </button>
          </article>
        ))}
      </div>
      <div className="pricing-notes">
        {subscriptionNotes.map((note) => (
          <p key={note}>
            <span aria-hidden="true">✓</span>
            {tr(note)}
          </p>
        ))}
      </div>
      <section className="calculator" aria-labelledby="calculator-title">
        <div className="calculator-controls">
          <span className="eyebrow">{tr("PLAN YOUR POSSIBILITIES")}</span>
          <h2 id="calculator-title">{tr("Your income estimator")}</h2>
          <p>
            {tr(
              "Adjust your activity to explore a potential earnings scenario.",
            )}
          </p>
          <label htmlFor="plan">{tr("Subscription")}</label>
          <select
            id="plan"
            value={planId}
            onChange={(e) => setPlanId(e.target.value)}
          >
            {plans.map((p) => (
              <option key={p.id} value={p.id}>
                {tr(p.name)} — {money(p.price)} / {tr(p.duration)}
              </option>
            ))}
          </select>
          <div className="slider-label">
            <label htmlFor="trips">{tr("Completed trips per day")}</label>
            <output htmlFor="trips">{tr(trips)}</output>
          </div>
          <input
            id="trips"
            type="range"
            min={pricing.trips.min}
            max={pricing.trips.max}
            step={pricing.trips.step}
            value={trips}
            onChange={(e) => setTrips(Number(e.target.value))}
          />
          <div className="range-ends">
            <span>
              {tr(pricing.trips.min)} {tr("trips")}
            </span>
            <span>
              {tr(pricing.trips.max)} {tr("trips")}
            </span>
          </div>
          <div className="slider-label">
            <label htmlFor="fare">{tr("Average driver fare per trip")}</label>
            <output htmlFor="fare">{money(fare)}</output>
          </div>
          <input
            id="fare"
            type="range"
            min={pricing.fare.min}
            max={pricing.fare.max}
            step={pricing.fare.step}
            value={fare}
            onChange={(e) => setFare(Number(e.target.value))}
          />
          <div className="range-ends">
            <span>{money(pricing.fare.min)}</span>
            <span>{money(pricing.fare.max)}</span>
          </div>
          <p className="control-note">
            {" "}
            {tr(
              "Use the fare earned by the driver, excluding the passenger’s separate R",
            )}
            {tr(pricing.bookingFee)} {tr("ride booking fee.")}{" "}
          </p>
        </div>
        <div
          className="calculator-results"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="eyebrow light">{tr("YOUR ESTIMATED EARNINGS")}</span>
          <h3>
            {tr(plan.name)} {tr("subscription")}
          </h3>
          <div className="estimate-table">
            <table>
              <caption className="sr-only">
                {" "}
                {tr("Gross and after-subscription estimates by horizon")}{" "}
              </caption>
              <thead>
                <tr>
                  <th scope="col">{tr("Period")}</th>
                  <th scope="col">{tr("Gross")}</th>
                  <th scope="col">{tr("Plan cost")}</th>
                  <th scope="col">{tr("After plan")}</th>
                </tr>
              </thead>
              <tbody>
                {pricing.horizons.map((days) => {
                  const r = estimateIncome({ trips, fare, days, plan });
                  return (
                    <tr key={days}>
                      <th scope="row">
                        {tr(
                          days === 1
                            ? "Daily"
                            : days === 7
                              ? "Weekly"
                              : "30 days",
                        )}
                        <small>
                          {tr(r.periods)} × {money(plan.price)}
                        </small>
                      </th>
                      <td>{money(r.gross)}</td>
                      <td>{money(r.cost)}</td>
                      <td>
                        <strong>{money(r.afterSubscription)}</strong>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="result-highlight">
            <span>{tr("30-day earnings after subscription")}</span>
            <strong>
              {money(
                estimateIncome({ trips, fare, days: 30, plan })
                  .afterSubscription,
              )}
            </strong>
            <small>{tr("Before fuel and all other operating expenses.")}</small>
          </div>
          <p className="result-disclaimer">
            {" "}
            {tr(
              "An illustration, not guaranteed income or take-home profit.",
            )}{" "}
          </p>
        </div>
      </section>
      <section className="assumptions">
        <h2>{tr("How we calculate it")}</h2>
        <ul>
          {assumptions.map((a) => (
            <li key={a}>{tr(a)}</li>
          ))}
        </ul>
      </section>
    </>
  );
}
