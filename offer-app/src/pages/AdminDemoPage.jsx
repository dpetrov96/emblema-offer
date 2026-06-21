import { useCallback, useMemo, useState } from "react";
import { IconMenu } from "../demo/MobileIcons";
import { createInitialAdminState, nextId, nowAuditTime } from "../demo/adminDemoState";
import { ADMIN_NAV } from "../demo/mockData";
import {
  AccessSection,
  ApprovalsSection,
  AuditSection,
  BuildingsSection,
  DashboardSection,
  EventsSection,
  ManagersSection,
  MessagesSection,
  NewsSection,
  PartnersSection,
  RadioSection,
  SportSection,
  UsersSection,
  VehiclesSection,
} from "../demo/AdminSections";
import "../demo/Demo.css";

function AdminToast({ message }) {
  if (!message) return null;
  return <div className="demo-toast" role="status">{message}</div>;
}

function SectionContent({ section, role, state, setState, form, setForm, onNavigate, onAudit, onToast }) {
  const shared = { state, setState, form, setForm, onAudit, onToast };

  switch (section) {
    case "dashboard":
      return <DashboardSection {...shared} role={role} onNavigate={onNavigate} />;
    case "users":
      return <UsersSection {...shared} />;
    case "approvals":
      return <ApprovalsSection {...shared} />;
    case "access":
      return <AccessSection {...shared} />;
    case "vehicles":
      return <VehiclesSection {...shared} />;
    case "messages":
      return <MessagesSection {...shared} />;
    case "audit":
      return <AuditSection {...shared} />;
    case "buildings":
      return <BuildingsSection {...shared} />;
    case "managers":
      return <ManagersSection {...shared} />;
    case "cms-news":
      return <NewsSection {...shared} />;
    case "cms-events":
      return <EventsSection {...shared} />;
    case "cms-partners":
      return <PartnersSection {...shared} />;
    case "cms-sport":
      return <SportSection {...shared} />;
    case "cms-radio":
      return <RadioSection {...shared} />;
    default:
      return null;
  }
}

export default function AdminDemoPage() {
  const [role, setRole] = useState("manager");
  const [section, setSection] = useState("dashboard");
  const [navOpen, setNavOpen] = useState(false);
  const [state, setState] = useState(createInitialAdminState);
  const [form, setForm] = useState(null);
  const [toast, setToast] = useState("");

  const nav = useMemo(
    () => ADMIN_NAV.filter((n) => n.roles.includes(role)),
    [role]
  );

  const sectionLabel = nav.find((n) => n.id === section)?.label ?? "Admin";

  const onToast = useCallback((message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  }, []);

  const onAudit = useCallback((action, target) => {
    setState((s) => ({
      ...s,
      auditLog: [
        { id: nextId(s.auditLog), action, user: role === "admin" ? "Admin" : "Manager", target, time: nowAuditTime() },
        ...s.auditLog,
      ],
    }));
  }, [role]);

  const selectSection = (id) => {
    setSection(id);
    setForm(null);
    setNavOpen(false);
  };

  const onNavigate = (targetSection, mode) => {
    setSection(targetSection);
    setNavOpen(false);
    if (mode === "add") {
      setForm({ section: targetSection, mode: "add" });
    } else if (mode === "compose") {
      setForm({ section: targetSection, mode: "compose" });
    } else {
      setForm(null);
    }
  };

  const switchRole = (nextRole) => {
    setRole(nextRole);
    setSection("dashboard");
    setForm(null);
    setNavOpen(false);
  };

  return (
    <div className={`demo-page demo-page--admin demo-page--immersive${navOpen ? " demo-page--admin-nav-open" : ""}`}>
      <AdminToast message={toast} />

      <header className="demo-admin-mobile-header">
        <button
          type="button"
          className="demo-admin-mobile-header__menu"
          onClick={() => setNavOpen(true)}
          aria-label="Отвори меню"
        >
          <IconMenu size={22} stroke={2} />
        </button>
        <div className="demo-admin-mobile-header__center">
          <span className="demo-admin-mobile-header__title">{sectionLabel}</span>
        </div>
        <div className="demo-role-switch demo-role-switch--header">
          <button type="button" className={role === "manager" ? "active" : ""} onClick={() => switchRole("manager")}>Mod</button>
          <button type="button" className={role === "admin" ? "active" : ""} onClick={() => switchRole("admin")}>Admin</button>
        </div>
      </header>

      <button
        type="button"
        className="demo-admin-drawer-backdrop"
        aria-label="Затвори меню"
        onClick={() => setNavOpen(false)}
      />

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
                onClick={() => selectSection(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="demo-sidebar__footer">
            <div className="demo-role-switch demo-role-switch--sidebar">
              <button type="button" className={role === "manager" ? "active" : ""} onClick={() => switchRole("manager")}>Manager</button>
              <button type="button" className={role === "admin" ? "active" : ""} onClick={() => switchRole("admin")}>Admin</button>
            </div>
          </div>
        </aside>
        <main className="demo-content">
          <SectionContent
            section={section}
            role={role}
            state={state}
            setState={setState}
            form={form}
            setForm={setForm}
            onNavigate={onNavigate}
            onAudit={onAudit}
            onToast={onToast}
          />
        </main>
      </div>
    </div>
  );
}
