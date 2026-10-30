export function estimateIncome({ trips, fare, days, plan }) {
  if (
    ![trips, fare, days, plan?.price, plan?.days].every(Number.isFinite) ||
    trips < 0 ||
    fare < 0 ||
    days <= 0 ||
    plan.price < 0 ||
    plan.days <= 0
  )
    throw new RangeError("Invalid estimate inputs");
  const gross = trips * fare * days;
  const periods = Math.ceil(days / plan.days);
  const cost = periods * plan.price;
  return { days, gross, periods, cost, afterSubscription: gross - cost };
}
export const money = (value) =>
  new Intl.NumberFormat("en-ZA", {
    style: "currency",
    currency: "ZAR",
    maximumFractionDigits: 0,
  }).format(value);
