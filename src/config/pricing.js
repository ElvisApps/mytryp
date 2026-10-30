export const plans = [
  {
    id: "daily",
    name: "Daily",
    price: 25,
    days: 1,
    duration: "24 hours",
    description: "For a day on the road.",
  },
  {
    id: "weekly",
    name: "Weekly",
    price: 130,
    days: 7,
    duration: "7 days",
    description: "For your weekly routine.",
  },
  {
    id: "monthly",
    name: "Monthly",
    price: 500,
    days: 30,
    duration: "30 days",
    description: "For consistent driving.",
  },
];
export const pricing = {
  bookingFee: 5,
  defaultPlan: "monthly",
  trips: { min: 0, max: 30, step: 1, initial: 8 },
  fare: { min: 10, max: 500, step: 5, initial: 60 },
  horizons: [1, 7, 30],
};
export const subscriptionNotes = [
  "Drivers retain 100% of trip fares. Subscription charges are separate.",
  "Passengers pay a separate R5 booking fee per ride. It is not driver income and is not added to the estimates. This ride booking fee does not automatically apply to deliveries.",
  "One active subscription covers eligible rides and deliveries. No subscription gives priority dispatch.",
  "Plan availability and any introductory offers must be confirmed in the driver app.",
];
export const assumptions = [
  "The same number of completed trips and the same average driver fare apply every day, including weekends. No demand or income is guaranteed.",
  "Each horizon starts with a new subscription and no unused coverage. Cost = ceiling(days ÷ plan duration) × plan price. Coverage is renewed continuously.",
  "A longer subscription is charged in full, even for a shorter estimate. Weekly coverage for 30 days requires five weekly subscriptions; unused coverage is not refunded or prorated in this model.",
  "Gross = trips per day × average driver fare × days. After subscription = gross − subscription costs. Negative amounts mean the subscription exceeds gross income.",
  "Fuel, insurance, maintenance, taxes, mobile data and all other expenses are excluded. The result is not take-home profit. Delivery earnings and passenger booking fees are excluded.",
];
