export const BUILDINGS = [
  { id: 1, name: "Emblema Residence", address: "ул. Оборище 12, София", units: 84, entrances: 3 },
  { id: 2, name: "Emblema Garden", address: "бул. България 98, София", units: 56, entrances: 2 },
];

export const USERS = [
  { id: 1, name: "Иван Петров", email: "ivan@email.com", apt: "12A", role: "User", status: "active" },
  { id: 2, name: "Мария Георгиева", email: "maria@email.com", apt: "5B", role: "User", status: "active" },
  { id: 3, name: "Георги Димитров", email: "georgi@email.com", apt: "8C", role: "User", status: "pending" },
  { id: 4, name: "Елена Стоянова", email: "elena@email.com", apt: "21D", role: "User", status: "active" },
];

export const ACCESS_ENTRIES = [
  { id: 1, user: "Иван Петров", type: "Постоянен", entrance: "Вход A", valid: "Безсрочен" },
  { id: 2, user: "Гост - Петър", type: "Гост", entrance: "Вход A", valid: "21.06 - 23.06" },
  { id: 3, user: "Наемател - Анна", type: "Наем", entrance: "Гараж 2", valid: "01.06 - 30.09" },
];

export const VEHICLES = [
  { id: 1, plate: "CA1234AB", owner: "Иван Петров", type: "Постоянен", status: "active" },
  { id: 2, plate: "CB5678CD", owner: "Мария Георгиева", type: "Временен", status: "active" },
  { id: 3, plate: "CA9012EF", owner: "Нов заявен", type: "Заявка", status: "pending" },
];

export const MESSAGES = [
  { id: 1, title: "Ремонт на асансьор", audience: "Цяла сграда", sent: "20.06.2026", read: "78%" },
  { id: 2, title: "Ново паркомясто", audience: "Вход B", sent: "18.06.2026", read: "92%" },
];

export const AUDIT_LOG = [
  { id: 1, action: "Достъп добавен", user: "Manager", target: "Иван Петров", time: "21.06 09:14" },
  { id: 2, action: "Новина публикувана", user: "Admin", target: "Лятен фестивал", time: "20.06 16:30" },
  { id: 3, action: "Регистрация одобрена", user: "Manager", target: "Георги Димитров", time: "19.06 11:02" },
];

export const NEWS = [
  { id: 1, title: "Лятен фестивал в двора", category: "Събития", date: "20.06.2026", published: true },
  { id: 2, title: "Подобрения в паркинга", category: "Обслужване", date: "15.06.2026", published: true },
  { id: 3, title: "Нови партньори в лоялност", category: "Лоялност", date: "10.06.2026", published: false },
];

export const EVENTS = [
  { id: 1, title: "Йога на покрива", date: "25.06.2026", time: "08:00", location: "Покрив" },
  { id: 2, title: "Детски работилница", date: "28.06.2026", time: "11:00", location: "Club Emblema" },
];

export const PARTNERS = [
  {
    id: 1,
    name: "Green Bistro",
    category: "Ресторант",
    discount: "15%",
    icon: "restaurant",
    iconTone: "amber",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=240&h=240&fit=crop&q=80",
  },
  {
    id: 2,
    name: "FitZone",
    category: "Спорт",
    discount: "20%",
    icon: "gym",
    iconTone: "violet",
    image: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=240&h=240&fit=crop&q=80",
  },
  {
    id: 3,
    name: "AutoCare",
    category: "Авто",
    discount: "10%",
    icon: "auto",
    iconTone: "blue",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=240&h=240&fit=crop&q=80",
  },
];

export const SPORT_VENUES = [
  {
    id: 1,
    name: "Emblema Tennis",
    sport: "Тенис",
    phone: "+359 888 111 222",
    image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=240&h=240&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Emblema Pool",
    sport: "Басейн",
    phone: "+359 888 333 444",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=240&h=240&fit=crop&q=80",
  },
];

export const RADIO_CONFIG = {
  name: "Emblema Radio",
  stream: "https://stream.emblema.bg/live",
  status: "Live",
  listeners: 42,
};

export const MOBILE_NEWS = [
  {
    id: 1,
    title: "Лятен фестивал в двора",
    excerpt: "На 5 юли организираме музика, храна и детска зона.",
    date: "20.06",
    category: "Събития",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=240&h=240&fit=crop&q=80",
    heroImage: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=480&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Подобрения в паркинга",
    excerpt: "Нова LED осветление и маркировка на ниво -1.",
    date: "15.06",
    category: "Обслужване",
    image: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=240&h=240&fit=crop&q=80",
    heroImage: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=800&h=480&fit=crop&q=80",
  },
];

export const MOBILE_EVENTS = [
  {
    id: 1,
    title: "Йога на покрива",
    date: "25 юни",
    time: "08:00",
    location: "Покрив",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=240&h=240&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Детска работилница",
    date: "28 юни",
    time: "11:00",
    location: "Club Emblema",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=240&h=240&fit=crop&q=80",
  },
];

export const MOBILE_MESSAGES = [
  {
    id: 1,
    title: "Ремонт на асансьор",
    preview: "На 22.06 асансьорът ще бъде спрян...",
    unread: true,
    date: "20.06",
    icon: "elevator",
    tone: "amber",
  },
  {
    id: 2,
    title: "Ново паркомясто",
    preview: "Свободни места на ниво -2...",
    unread: false,
    date: "18.06",
    icon: "parking",
    tone: "blue",
  },
];

export const MOBILE_HOME = {
  userName: "Иван",
  building: "Emblema Residence",
  stats: [
    { id: "messages", label: "Съобщения", value: "2", screen: "messages", icon: "message", tone: "blue", highlight: true },
    { id: "events", label: "Събития", value: "2", screen: "events", icon: "calendar", tone: "indigo" },
    { id: "access", label: "Достъп", value: "2", screen: "access", icon: "key", tone: "green" },
  ],
};

export const MOBILE_FEATURED = [
  {
    id: 1,
    tag: "Събитие",
    title: "Йога на покрива",
    subtitle: "25 юни · 08:00",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=320&h=200&fit=crop&q=80",
    screen: "events",
    tone: "indigo",
  },
  {
    id: 2,
    tag: "Лоялност",
    title: "Green Bistro",
    subtitle: "15% отстъпка",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=320&h=200&fit=crop&q=80",
    screen: "loyalty",
    tone: "amber",
  },
  {
    id: 3,
    tag: "Радио",
    title: "Emblema Radio",
    subtitle: "Live · 42 слушатели",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=320&h=200&fit=crop&q=80",
    screen: "radio",
    tone: "rose",
  },
];

export const MOBILE_ACCESS = [
  { id: 1, building: "Emblema Residence", entrance: "Вход A", smartHome: true },
  { id: 2, building: "Emblema Residence", entrance: "Гараж 2", smartHome: true },
];

export const MOBILE_VEHICLES = [
  { id: 1, plate: "CA1234AB", status: "Активен" },
  { id: 2, plate: "CB5678CD", status: "До 30.09" },
];

export const ADMIN_NAV = [
  { id: "dashboard", label: "Табло", roles: ["manager", "admin"] },
  { id: "users", label: "Жители", roles: ["manager", "admin"] },
  { id: "approvals", label: "Одобрения", roles: ["manager", "admin"] },
  { id: "access", label: "Достъп", roles: ["manager", "admin"] },
  { id: "vehicles", label: "Автомобили", roles: ["manager", "admin"] },
  { id: "messages", label: "Съобщения", roles: ["manager", "admin"] },
  { id: "audit", label: "Audit log", roles: ["manager", "admin"] },
  { id: "buildings", label: "Сгради", roles: ["admin"] },
  { id: "managers", label: "Мениджъри", roles: ["admin"] },
  { id: "cms-news", label: "CMS · Новини", roles: ["admin"] },
  { id: "cms-events", label: "CMS · Събития", roles: ["admin"] },
  { id: "cms-partners", label: "CMS · Лоялност", roles: ["admin"] },
  { id: "cms-sport", label: "CMS · Спорт", roles: ["admin"] },
  { id: "cms-radio", label: "CMS · Радио", roles: ["admin"] },
];
