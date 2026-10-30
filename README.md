# mytryp Driver Portal

A complete, responsive, read-only React + Vite website for driver information and an interactive earnings illustration. No authentication, backend, payments, tracking or persistent user content. Calculator changes exist only in browser memory.

## Local setup

Use Node.js 22 or 24 and npm. From this directory:

```sh
npm ci
npm run dev
```

Open the URL printed by Vite. For production validation:

```sh
npm test
npm run build
npm run preview
```

`dist/` is the production website. Use a web server; do not open index.html directly through file://.

## Content and branding

- `src/config/portal.js`: introduction, operating rules, requirements, onboarding steps, review notice and optional logo URL.
- `src/config/pricing.js`: plans, prices, durations, slider settings, booking fee, subscription notes and calculation assumptions. Review the explanatory text when changing numeric values.
- `src/styles.css`: temporary evergreen/navy (#122b29) and lime (#d4f76b) theme, typography and responsive layout. No original brand assets were provided. Replace these colours, wordmark and `public/favicon.svg` when official branding is available.
- For a logo: add it in `public/`, then set `brand.logoUrl` to `${import.meta.env.BASE_URL}your-logo.svg` in portal.js.
- `src/lib/income.js`: pure earnings calculation, independently tested in `tests/income.test.js`.

All policy and pricing content is maintained in the config files. Layout labels are in reusable components and App.jsx. Management must review all policies, legal eligibility, permit and insurance requirements, plan availability and support processes before launch. No unconfirmed support addresses or emergency numbers are invented. Remove/change the review notice only after review.

## Calculator assumptions

Gross = completed trips/day × average driver fare × horizon days.
Subscription cost = ceil(horizon days / subscription days) × subscription price.
Estimated earnings after subscription = gross − subscription cost.

Horizons are independent scenarios starting with a new plan, with continuous daily activity and no existing coverage. Whole subscriptions are paid upfront; unused days are not prorated. With 8 trips/day and R60 average fare:

| Plan    | 1-day cost | 7-day cost | 30-day cost | 30-day gross | After subscription (30 days) |
| ------- | ---------: | ---------: | ----------: | -----------: | ---------------------------: |
| Daily   |        R25 |       R175 |        R750 |      R14,400 |                      R13,650 |
| Weekly  |       R130 |       R130 |        R650 |      R14,400 |                      R13,750 |
| Monthly |       R500 |       R500 |        R500 |      R14,400 |                      R13,900 |

The passenger R5 ride booking fee is separate and excluded. Delivery income is excluded. Fuel, insurance, maintenance, taxes, data and other costs are excluded; this is not profit or guaranteed income. At zero trips the estimate is negative by the applicable subscription cost.

## Routing and GitHub Pages

`HashRouter` provides four routes: `#/`, `#/rules`, `#/requirements`, `#/subscriptions`. Hash routing works on GitHub Pages on refresh and direct links without rewrite rules or a 404 workaround. `base: './'` ensures built assets work under both a repository subpath and a custom domain. An unknown hash route shows a recovery link.

## Deploy only after approval

Nothing has been published. The included Actions workflow runs only via `workflow_dispatch`; a push does not deploy.

After management approval:

1. Create a GitHub repository and commit the contents of this directory at the repository root (including package-lock.json and .github/).
2. In repository **Settings → Pages → Build and deployment**, select **GitHub Actions**.
3. In **Settings → Environments → github-pages**, configure required reviewers if your GitHub plan supports them. The workflow’s manual trigger alone is not a required-reviewer gate.
4. In **Actions**, select **Deploy GitHub Pages (manual approval only)** and choose **Run workflow**. This is the publication action; do not run it before approval.
5. Approve the environment deployment if configured. Use the returned Pages URL and test each hash link and a refresh.

To update, edit configuration, run tests/build, commit, review, and manually run the workflow again. To roll back, restore a known-good commit and manually rerun. To remove publication, unpublish the site in repository Pages settings.

## Accessibility and QA

Semantic headings and landmarks, labelled range controls with native keyboard support, a labelled subscription selector, active navigation, visible focus, a skip link, route-change focus, live estimate announcements, reduced-motion support and responsive tables are included. No third-party fonts or remote assets are required.

Before launch, review on mobile and desktop, keyboard-tab through all controls, test sliders with arrow keys and check with a screen reader. Automated formula tests do not replace assistive-technology or real-device review.

## English / Sepedi and sticky header

Choose **English** or **Sepedi** in the header. The selection applies across all four pages, navigation, policy content, onboarding steps, pricing, calculator labels and document titles. Switching language keeps current calculator inputs. The selection lasts while the tab is open and resets to English on reload; no preference or personal information is stored. The HTML language changes to `en` or `nso` for assistive technology.

Translations are bundled locally: no remote translation service, API key or external translation request. Edit `src/i18n/sepedi.js` to maintain the Sepedi text. Keys match English source text exactly; when changing policy wording, update its translation key and value too. Missing translations fall back to English. `npm test` checks configured policy/pricing text and static translated UI labels for coverage. Have a fluent Sepedi reviewer approve policy translations before publishing.

The complete header (branding, language selector and navigation) stays sticky at the top on desktop and mobile. Navigation can scroll horizontally on narrow screens.
