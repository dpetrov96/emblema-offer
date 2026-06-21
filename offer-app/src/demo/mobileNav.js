export const TAB_ROOTS = new Set(["home", "sport", "loyalty", "radio", "more"]);

export const AUTH_SCREENS = new Set([
  "welcome",
  "login",
  "register",
  "forgot-password",
  "forgot-sent",
  "reset-password",
  "pending-approval",
]);

export const STACK_SCREENS = new Set([
  "news-detail",
  "loyalty-qr",
  "notifications",
  "profile",
  "events",
  "access",
  "vehicles",
  "messages",
  ...AUTH_SCREENS,
]);

/** RN-style: horizontal push for stack/auth, fade for tab switches */
export function getTransitionType(from, to, explicitDir) {
  if (explicitDir === "back") return "back";
  if (explicitDir === "forward") return "forward";
  if (TAB_ROOTS.has(from) && TAB_ROOTS.has(to) && from !== to) return "fade";
  if (from === to) return "none";
  return "forward";
}
