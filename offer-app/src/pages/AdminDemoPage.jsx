import { useMemo, useState } from "react";
import { DemoBackLink } from "../demo/DemoShell";
import "../demo/Demo.css";
import {
  ADMIN_NAV,
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
} from "../demo/mockData";

function StatBox({ label, value, sub }) {
  return (
    <div className="demo-stat">
      <span className="demo-stat__label">{label}</span>
      <span className="demo-stat__value">{value}</span>
      {sub && <span className="demo-stat__sub">{sub}</span>}
    </div>
  );
}

function MockTable({ columns, rows }) {
  return (
    <div className="demo-table-wrap">
      <table className="demo-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key}>{c.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id ?? row[columns[0].key]}>
              {columns.map((c) => (
                <td key={c.key}>
                  {c.render ? c.render(row) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SectionContent({ section, role }) {
  switch (section) {
    case "dashboard":
      return (
        <>
          <h2 className="demo-content__title">Табло · {role === "admin" ? "Central Admin" : "Manager"}</h2>
          <div className="demo-stats-row">
            <StatBox label="Жители" value="84" sub="Emblema Residence" />
            <StatBox label="Чакащи одобрение" value="3" sub="регистрации" />
            <StatBox label="Push днес" value="2" sub="изпратени" />
            <StatBox label="Активен достъп" value="126" sub="записи" />
          </div>
          <div className="demo-panels">
            <div className="demo-panel">
              <h3>Последна активност</h3>
              <ul className="demo-list">
                {AUDIT_LOG.map((a) => (
                  <li key={a.id}>
                    <strong>{a.action}</strong> · {a.target}
                    <span>{a.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="demo-panel">
              <h3>Бързи действия</h3>
              <div className="demo-actions">
                <button type="button" className="demo-btn">+ Нов достъп</button>
                <button type="button" className="demo-btn">✉ Съобщение</button>
                <button type="button" className="demo-btn demo-btn--ghost">Одобри заявки (3)</button>
              </div>
            </div>
          </div>
        </>
      );
    case "users":
      return (
        <>
          <h2 className="demo-content__title">Жители</h2>
          <MockTable
            columns={[
              { key: "name", label: "Име" },
              { key: "email", label: "Email" },
              { key: "apt", label: "Ап." },
              { key: "status", label: "Статус", render: (r) => <span className={`demo-pill demo-pill--${r.status}`}>{r.status}</span> },
            ]}
            rows={USERS}
          />
        </>
      );
    case "approvals":
      return (
        <>
          <h2 className="demo-content__title">Опашка за одобрение</h2>
          <MockTable
            columns={[
              { key: "name", label: "Кандидат" },
              { key: "email", label: "Email" },
              { key: "apt", label: "Ап." },
              { key: "actions", label: "", render: () => (
                <div className="demo-inline-actions">
                  <button type="button" className="demo-btn demo-btn--sm">Одобри</button>
                  <button type="button" className="demo-btn demo-btn--sm demo-btn--ghost">Отхвърли</button>
                </div>
              ) },
            ]}
            rows={USERS.filter((u) => u.status === "pending")}
          />
        </>
      );
    case "access":
      return (
        <>
          <h2 className="demo-content__title">Управление на достъп</h2>
          <MockTable
            columns={[
              { key: "user", label: "Потребител" },
              { key: "type", label: "Тип" },
              { key: "entrance", label: "Точка" },
              { key: "valid", label: "Валидност" },
            ]}
            rows={ACCESS_ENTRIES}
          />
        </>
      );
    case "vehicles":
      return (
        <>
          <h2 className="demo-content__title">Автомобилни номера</h2>
          <MockTable
            columns={[
              { key: "plate", label: "Номер" },
              { key: "owner", label: "Собственик" },
              { key: "type", label: "Тип" },
              { key: "status", label: "Статус", render: (r) => <span className={`demo-pill demo-pill--${r.status}`}>{r.status}</span> },
            ]}
            rows={VEHICLES}
          />
        </>
      );
    case "messages":
      return (
        <>
          <h2 className="demo-content__title">Съобщения & Push</h2>
          <div className="demo-form">
            <label>Заглавие<input defaultValue="Важно съобщение" /></label>
            <label>Аудитория<select defaultValue="building"><option>Цяла сграда</option><option>Вход A</option><option>Конкретен потребител</option></select></label>
            <label>Текст<textarea rows={3} defaultValue="Mock съобщение за демо..." /></label>
            <button type="button" className="demo-btn">Изпрати push + in-app</button>
          </div>
          <h3 className="demo-subtitle">История</h3>
          <MockTable
            columns={[
              { key: "title", label: "Заглавие" },
              { key: "audience", label: "До" },
              { key: "sent", label: "Изпратено" },
              { key: "read", label: "Прочетено" },
            ]}
            rows={MESSAGES}
          />
        </>
      );
    case "audit":
      return (
        <>
          <h2 className="demo-content__title">Audit log</h2>
          <MockTable
            columns={[
              { key: "time", label: "Време" },
              { key: "user", label: "Актор" },
              { key: "action", label: "Действие" },
              { key: "target", label: "Обект" },
            ]}
            rows={AUDIT_LOG}
          />
        </>
      );
    case "buildings":
      return (
        <>
          <h2 className="demo-content__title">Сгради & структура</h2>
          <MockTable
            columns={[
              { key: "name", label: "Сграда" },
              { key: "address", label: "Адрес" },
              { key: "units", label: "Ап." },
              { key: "entrances", label: "Входове" },
            ]}
            rows={BUILDINGS}
          />
          <div className="demo-tree">
            <h3>Структура · Emblema Residence</h3>
            <ul>
              <li>Вход A → Бариера, Домофон, Smart Home link</li>
              <li>Вход B → Бариера, Паркинг -1</li>
              <li>Гараж 2 → Smart Home link</li>
            </ul>
          </div>
        </>
      );
    case "managers":
      return (
        <>
          <h2 className="demo-content__title">Мениджъри ↔ Сгради</h2>
          <MockTable
            columns={[
              { key: "manager", label: "Мениджър" },
              { key: "building", label: "Сграда" },
            ]}
            rows={[
              { id: 1, manager: "Стефан Илиев", building: "Emblema Residence" },
              { id: 2, manager: "Дiana Koleva", building: "Emblema Garden" },
            ]}
          />
        </>
      );
    case "cms-news":
      return (
        <>
          <h2 className="demo-content__title">CMS · Новини</h2>
          <MockTable
            columns={[
              { key: "title", label: "Заглавие" },
              { key: "category", label: "Категория" },
              { key: "date", label: "Дата" },
              { key: "published", label: "Статус", render: (r) => (r.published ? "Публикувана" : "Чернова") },
            ]}
            rows={NEWS}
          />
        </>
      );
    case "cms-events":
      return (
        <>
          <h2 className="demo-content__title">CMS · Събития</h2>
          <MockTable columns={[
            { key: "title", label: "Събитие" },
            { key: "date", label: "Дата" },
            { key: "time", label: "Час" },
            { key: "location", label: "Локация" },
          ]} rows={EVENTS} />
        </>
      );
    case "cms-partners":
      return (
        <>
          <h2 className="demo-content__title">CMS · Лоялност</h2>
          <MockTable columns={[
            { key: "name", label: "Партньор" },
            { key: "category", label: "Категория" },
            { key: "discount", label: "Отстъпка" },
          ]} rows={PARTNERS} />
        </>
      );
    case "cms-sport":
      return (
        <>
          <h2 className="demo-content__title">CMS · Emblema Sport</h2>
          <MockTable columns={[
            { key: "name", label: "Обект" },
            { key: "sport", label: "Спорт" },
            { key: "phone", label: "Контакт" },
          ]} rows={SPORT_VENUES} />
        </>
      );
    case "cms-radio":
      return (
        <>
          <h2 className="demo-content__title">CMS · Emblema Radio</h2>
          <div className="demo-panel demo-panel--radio">
            <p><strong>{RADIO_CONFIG.name}</strong></p>
            <p>Stream: {RADIO_CONFIG.stream}</p>
            <p>Статус: {RADIO_CONFIG.status} · {RADIO_CONFIG.listeners} слушатели (mock)</p>
            <button type="button" className="demo-btn">Запази конфигурация</button>
          </div>
        </>
      );
    default:
      return null;
  }
}

export default function AdminDemoPage() {
  const [role, setRole] = useState("manager");
  const [section, setSection] = useState("dashboard");

  const nav = useMemo(
    () => ADMIN_NAV.filter((n) => n.roles.includes(role)),
    [role]
  );

  return (
    <div className="demo-page demo-page--admin demo-page--immersive">
      <div className="demo-admin-layout">
        <aside className="demo-sidebar">
          <div className="demo-sidebar__brand">
            <span className="demo-sidebar__logo">Emblema</span>
            <span className="demo-sidebar__product">Admin Panel</span>
          </div>
          <p className="demo-sidebar__label">{role === "admin" ? "Central Admin" : "Building Manager"}</p>
          <nav className="demo-sidebar__nav">
            {nav.map((item) => (
              <button
                key={item.id}
                type="button"
                className={section === item.id ? "active" : ""}
                onClick={() => setSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="demo-sidebar__footer">
            <div className="demo-role-switch demo-role-switch--sidebar">
              <button type="button" className={role === "manager" ? "active" : ""} onClick={() => { setRole("manager"); setSection("dashboard"); }}>Manager</button>
              <button type="button" className={role === "admin" ? "active" : ""} onClick={() => { setRole("admin"); setSection("dashboard"); }}>Admin</button>
            </div>
            <DemoBackLink />
          </div>
        </aside>
        <main className="demo-content">
          <SectionContent section={section} role={role} />
        </main>
      </div>
    </div>
  );
}
