export const RATE = 50;
export const TIMELINE = "2 месеца";

export function phaseBadge(id) {
  return `Фаза ${id + 1}`;
}

export const PHASES = [
  {
    id: 0,
    title: "Discovery & Setup",
    color: "#6366f1",
    tasks: [
      { id: "P0-01", name: "Kickoff + архитектурен документ + ER диаграма", hours: 4 },
      { id: "P0-02", name: "Monorepo setup, linting, conventions (Cursor scaffold)", hours: 2 },
      { id: "P0-03", name: "CI/CD pipeline (GitHub Actions → Render deploy)", hours: 3 },
      { id: "P0-04", name: "Render staging + production environments", hours: 5 },
      { id: "P0-05", name: "Neon DB provisioning + connection + migrations env", hours: 3 },
      { id: "P0-06", name: "Design system (shadcn/Tailwind) + UI review", hours: 5 },
      { id: "P0-07", name: "Resend account + sending domain (DNS, SPF/DKIM)", hours: 2 },
    ],
  },
  {
    id: 1,
    title: "Backend Core & Auth",
    color: "#8b5cf6",
    tasks: [
      { id: "B-01", name: "Database schema design review + migrations", hours: 10 },
      { id: "B-02", name: "NestJS API scaffold + validation + error handling", hours: 4 },
      { id: "B-03", name: "JWT auth + refresh tokens + session flow", hours: 6 },
      { id: "B-04", name: "Register / Login / Forgot / Reset password", hours: 6 },
      { id: "B-05", name: "RBAC middleware - 4 роли + permissions matrix review", hours: 10 },
      { id: "B-06", name: "Account approval workflow (pending → approved → building)", hours: 8 },
      { id: "B-07", name: "User profile API (read/update, change password)", hours: 3 },
      { id: "B-08", name: "Audit log engine (access + admin actions)", hours: 10 },
      { id: "B-09", name: "Rate limiting, CORS, security headers", hours: 3 },
      { id: "B-10", name: "2FA за Admin & Manager (TOTP)", hours: 5 },
    ],
  },
  {
    id: 2,
    title: "Сгради, Достъп, Автомобили",
    color: "#a855f7",
    tasks: [
      { id: "B-11", name: "Building CRUD + структура (входове, гаражи, паркинги, бариери)", hours: 10 },
      { id: "B-12", name: "Manager ↔ Building assignment + tenant isolation", hours: 5 },
      { id: "B-13", name: "Access rights - постоянен / наем (period) / гост (temporary)", hours: 14 },
      { id: "B-14", name: "Vehicle plates CRUD + временен достъп + change history", hours: 9 },
      { id: "B-15", name: "Messaging API - building-wide / per user / per entrance", hours: 7 },
      { id: "B-16", name: "Smart Home external link config per entrance/garage", hours: 2 },
      { id: "B-17", name: "Media upload service (S3/Render disk) + image resize", hours: 5 },
    ],
  },
  {
    id: 3,
    title: "CMS & Публично съдържание",
    color: "#d946ef",
    tasks: [
      { id: "B-18", name: "News API - CRUD, categories, publish/unpublish", hours: 5 },
      { id: "B-19", name: "Events API - CRUD, date filter, upcoming sort", hours: 5 },
      { id: "B-20", name: "Loyalty partners API - CRUD, categories, QR/barcode data", hours: 7 },
      { id: "B-21", name: "Emblema Sport API - venues CRUD + contact links", hours: 5 },
      { id: "B-22", name: "Emblema Radio API - stream URL / playlist config", hours: 2 },
      { id: "B-23", name: "Public endpoints (no auth) - mobile feed aggregation", hours: 3 },
    ],
  },
  {
    id: 4,
    title: "Нотификации",
    color: "#ec4899",
    tasks: [
      { id: "N-01", name: "Firebase FCM + APNs project setup + certificates", hours: 5 },
      { id: "N-02", name: "Push service - triggers, templates, device tokens", hours: 6 },
      { id: "N-03", name: "In-app notification inbox API + read/unread state", hours: 5 },
      { id: "N-04", name: "Resend integration - transactional email (approval, messages, templates)", hours: 6 },
      { id: "N-05", name: "Notification preferences per user", hours: 3 },
    ],
  },
  {
    id: 5,
    title: "Mobile App (iOS + Android)",
    color: "#f43f5e",
    tasks: [
      { id: "M-01", name: "App shell - navigation, bottom tabs, auth guard", hours: 10 },
      { id: "M-02", name: "Auth screens - login, register, forgot password", hours: 6 },
      { id: "M-03", name: "News - list, detail, pull-to-refresh", hours: 5 },
      { id: "M-04", name: "Events - list, detail, date filter", hours: 5 },
      { id: "M-05", name: "Emblema Sport - list + detail", hours: 5 },
      { id: "M-06", name: "Loyalty card - partners, categories, QR display", hours: 8 },
      { id: "M-07", name: "Emblema Radio - player, mini player, background audio", hours: 12 },
      { id: "M-08", name: "User profile - view/edit, linked buildings", hours: 5 },
      { id: "M-09", name: "My Access - buildings list + Smart Home external links", hours: 6 },
      { id: "M-10", name: "My Vehicles - list + request add plate", hours: 4 },
      { id: "M-11", name: "Messages inbox - list, detail, mark read", hours: 6 },
      { id: "M-12", name: "Push notification handling + deep linking", hours: 5 },
      { id: "M-13", name: "App icons, splash screen, store listing copy", hours: 3 },
      { id: "M-14", name: "EAS builds (iOS + Android), signing, TestFlight / internal track", hours: 8 },
      { id: "M-15", name: "Mobile UX review + client feedback iteration", hours: 6 },
    ],
  },
  {
    id: 6,
    title: "Web Admin Panel",
    color: "#f97316",
    tasks: [
      { id: "W-01", name: "Admin shell - layout, sidebar, responsive, role routing", hours: 8 },
      { id: "W-02", name: "Manager: user list, invite, remove, edit rights", hours: 7 },
      { id: "W-03", name: "Manager: access management UI - assign, types, date ranges", hours: 14 },
      { id: "W-04", name: "Manager: vehicle plates + history log", hours: 6 },
      { id: "W-05", name: "Manager: compose message + trigger push", hours: 5 },
      { id: "W-06", name: "Manager: audit log viewer + filters", hours: 5 },
      { id: "W-07", name: "Admin: building CRUD + structure tree editor", hours: 10 },
      { id: "W-08", name: "Admin: assign managers to buildings", hours: 4 },
      { id: "W-09", name: "Admin: global users + registration approval queue", hours: 6 },
      { id: "W-10", name: "Admin: CMS - News, Events, Partners, Sport, Radio", hours: 12 },
      { id: "W-11", name: "Admin: global audit log", hours: 5 },
      { id: "W-12", name: "Dashboard widgets - stats, recent activity", hours: 5 },
      { id: "W-13", name: "Admin UX review + client feedback iteration", hours: 5 },
    ],
  },
  {
    id: 7,
    title: "QA, Security & Launch",
    color: "#eab308",
    tasks: [
      { id: "Q-01", name: "Automated tests - auth, RBAC, access logic (Jest)", hours: 10 },
      { id: "Q-02", name: "Manual QA - mobile regression iOS + Android", hours: 12 },
      { id: "Q-03", name: "Manual QA - web admin regression", hours: 8 },
      { id: "Q-04", name: "Security review - OWASP, role isolation, JWT audit", hours: 6 },
      { id: "Q-05", name: "API performance smoke test on Render", hours: 3 },
      { id: "Q-06", name: "UAT - 2 client review cycles + fix iterations", hours: 14 },
      { id: "Q-07", name: "App Store + Google Play submission + review support", hours: 6 },
      { id: "Q-08", name: "API docs (Swagger) + deployment runbook", hours: 4 },
      { id: "Q-09", name: "Production launch + handover session", hours: 4 },
    ],
  },
];

export const TOKEN_ITEMS = [
  { id: "TOK-01", name: "Cursor Pro subscription", detail: "2 мес. × ~20 €", euro: 40 },
  { id: "TOK-02", name: "Claude Sonnet - code generation & refactor", detail: "~90M in + 25M out tokens", euro: 220 },
  { id: "TOK-03", name: "Claude Sonnet - debugging & tests", detail: "~30M in + 10M out tokens", euro: 80 },
  { id: "TOK-04", name: "Claude Opus - architecture & RBAC", detail: "~8M in + 3M out tokens", euro: 70 },
];

export const TOKEN_NOTE =
  "Ориентировъчна оценка за AI consumption по време на разработката.";

/** Разходи за сметка на клиента */
export const CLIENT_COST_ITEMS = [
  {
    id: "CC-01",
    name: "Render - Web Service (NestJS API)",
    detail: "Standard · 1 vCPU · 2 GB · ~$25/mo",
    euroMonthly: 23,
  },
  {
    id: "CC-02",
    name: "Render - Static Site (Web Admin)",
    detail: "Free tier",
    euroMonthly: 0,
  },
  {
    id: "CC-03",
    name: "Neon - PostgreSQL (Launch)",
    detail: "10 GB · autoscaling · ~$19/mo",
    euroMonthly: 18,
  },
  {
    id: "CC-04",
    name: "Render - Background Worker",
    detail: "Push/email queue · ~$7/mo",
    euroMonthly: 7,
  },
  {
    id: "CC-07",
    name: "Resend - Transactional Email",
    detail: "Pro · 50 000 emails/mo · ~$20/mo (Free: 3 000/mo за staging)",
    euroMonthly: 18,
  },
  {
    id: "CC-08",
    name: "Expo EAS - Starter",
    detail: "Cloud builds + OTA updates · 3 000 MAU · ~$19/mo (Free: 15 iOS + 15 Android builds/mo за dev)",
    euroMonthly: 18,
  },
  {
    id: "CC-05",
    name: "Apple Developer Program",
    detail: "Годишна такса · iOS App Store release · ~$99/год",
    euroOneTime: 92,
  },
  {
    id: "CC-06",
    name: "Google Play Console",
    detail: "Еднократна такса · Android release · ~$25",
    euroOneTime: 23,
  },
];

export const CLIENT_COST_NOTE =
  "Render, Neon, Resend, Expo EAS и store таксите се покриват от клиента - директно към доставчиците.";

export const INCLUDED = [
  "Backend REST API + PostgreSQL (Neon)",
  "Multi-tenancy (множество сгради)",
  "Auth + RBAC (4 роли) + 2FA",
  "Mobile app - iOS & Android (Expo + EAS builds)",
  "Web Admin (Manager + Central Admin)",
  "Новини, Събития, Спорт, Лоялност, Радио",
  "Access management + автомобилни номера",
  "Push + in-app + email нотификации (Resend)",
  "Audit log + CI/CD + QA + App Store submission",
  "External Smart Home links",
  "Deploy на Render + Neon + Resend setup",
];

export const EXCLUDED = [
  "Smart Home модул (врати, осветление)",
  "Домофон в приложението",
  "LPR / разпознаване на номера",
  "Hikvision / Shelly интеграция",
  "Marketplace / плащания",
  "Отделен PM / Scrum процес",
];

export const TECH_STACK = [
  { label: "Mobile", value: "React Native (Expo + EAS)" },
  { label: "Web Admin", value: "Next.js 14+ / React" },
  { label: "Backend", value: "NestJS (Render Web Service)" },
  { label: "Database", value: "PostgreSQL (Neon)" },
  { label: "Auth", value: "JWT + refresh tokens + 2FA" },
  { label: "Push", value: "Firebase Cloud Messaging" },
  { label: "Email", value: "Resend (transactional)" },
  { label: "AI Dev", value: "Cursor + Claude Sonnet/Opus" },
];

export function formatNum(n) {
  return n.toLocaleString("bg-BG");
}

export const VAT_LABEL = "без ДДС";

/** Форматира EUR цена */
export function fmtPrice(amount, opts = {}) {
  const { approx = true, suffix = "" } = opts;
  const prefix = approx ? "~" : "";
  return `${prefix}${formatNum(amount)} €${suffix}`;
}

export function calcTotals() {
  let devHours = 0;
  let devPrice = 0;

  const phaseTotals = PHASES.map((phase) => {
    const ph = phase.tasks.reduce((s, t) => s + t.hours, 0);
    devHours += ph;
    devPrice += ph * RATE;
    return { ...phase, badge: phaseBadge(phase.id), hours: ph, price: ph * RATE };
  });

  const tokenPrice = TOKEN_ITEMS.reduce((s, t) => s + t.euro, 0);
  const clientMonthly = CLIENT_COST_ITEMS.reduce(
    (s, t) => s + (t.euroMonthly ?? 0),
    0
  );
  const clientApple =
    CLIENT_COST_ITEMS.find((t) => t.id === "CC-05")?.euroOneTime ?? 0;
  const clientGoogle =
    CLIENT_COST_ITEMS.find((t) => t.id === "CC-06")?.euroOneTime ?? 0;
  const clientRelease = clientApple + clientGoogle;

  return {
    devHours,
    devPrice,
    tokenPrice,
    clientMonthly,
    clientApple,
    clientGoogle,
    clientRelease,
    devGrandTotal: devPrice + tokenPrice,
    phaseTotals,
  };
}

export function getMaxPhaseHours(phaseTotals) {
  return Math.max(...phaseTotals.map((p) => p.hours), 1);
}
