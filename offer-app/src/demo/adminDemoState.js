import {
  ACCESS_ENTRIES,
  AUDIT_LOG,
  BUILDINGS,
  EVENTS,
  MESSAGES,
  NEWS,
  PARTNERS,
  RADIO_CONFIG,
  SPORT_VENUES,
  USERS,
  VEHICLES,
} from "./mockData";

export const INITIAL_MANAGERS = [
  { id: 1, manager: "Стефан Илиев", building: "Emblema Residence" },
  { id: 2, manager: "Diana Koleva", building: "Emblema Garden" },
];

export const INITIAL_BUILDING_STRUCTURE = [
  { id: 1, label: "Вход A → Бариера, Домофон, Smart Home link" },
  { id: 2, label: "Вход B → Бариера, Паркинг -1" },
  { id: 3, label: "Гараж 2 → Smart Home link" },
];

export function createInitialAdminState() {
  return {
    users: USERS.map((u) => ({ ...u })),
    access: ACCESS_ENTRIES.map((a) => ({ ...a })),
    vehicles: VEHICLES.map((v) => ({ ...v })),
    messages: MESSAGES.map((m) => ({ ...m })),
    auditLog: AUDIT_LOG.map((a) => ({ ...a })),
    buildings: BUILDINGS.map((b) => ({ ...b })),
    managers: INITIAL_MANAGERS.map((m) => ({ ...m })),
    news: NEWS.map((n) => ({ ...n })),
    events: EVENTS.map((e) => ({ ...e })),
    partners: PARTNERS.map((p) => ({ ...p, image: p.image ?? "" })),
    sportVenues: SPORT_VENUES.map((s) => ({ ...s, image: s.image ?? "" })),
    radioConfig: { ...RADIO_CONFIG },
    buildingStructure: INITIAL_BUILDING_STRUCTURE.map((s) => ({ ...s })),
  };
}

export function nextId(items) {
  return items.reduce((max, item) => Math.max(max, item.id ?? 0), 0) + 1;
}

export function todayLabel() {
  return new Date().toLocaleDateString("bg-BG");
}

export function nowAuditTime() {
  const d = new Date();
  return `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")} ${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}
