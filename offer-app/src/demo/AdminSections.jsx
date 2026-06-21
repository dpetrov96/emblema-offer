import { useEffect, useState } from "react";
import { nextId, nowAuditTime, todayLabel } from "./adminDemoState";

function StatBox({ label, value, sub }) {
  return (
    <div className="demo-stat">
      <span className="demo-stat__label">{label}</span>
      <span className="demo-stat__value">{value}</span>
      {sub && <span className="demo-stat__sub">{sub}</span>}
    </div>
  );
}

function SectionHeader({ title, onAdd, addLabel = "+ Добави" }) {
  return (
    <div className="demo-section-head">
      <h2 className="demo-content__title">{title}</h2>
      {onAdd && (
        <button type="button" className="demo-btn demo-btn--sm" onClick={onAdd}>
          {addLabel}
        </button>
      )}
    </div>
  );
}

function DataTable({ columns, rows, emptyLabel = "Няма записи" }) {
  if (!rows.length) {
    return <p className="demo-empty">{emptyLabel}</p>;
  }
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
                <td key={c.key} data-label={c.label}>
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

function FormPanel({ title, children, onCancel, onSubmit, submitLabel = "Запази" }) {
  return (
    <div className="demo-form-panel">
      <div className="demo-form-panel__head">
        <h3>{title}</h3>
        <button type="button" className="demo-btn demo-btn--ghost demo-btn--sm" onClick={onCancel}>
          Отказ
        </button>
      </div>
      <form
        className="demo-form demo-form--wide"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
      >
        {children}
        <div className="demo-form-actions">
          <button type="button" className="demo-btn demo-btn--ghost" onClick={onCancel}>
            Отказ
          </button>
          <button type="submit" className="demo-btn">
            {submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }) {
  return <label>{label}{children}</label>;
}

function RowActions({ onEdit, onDelete, extra }) {
  return (
    <div className="demo-inline-actions">
      {extra}
      {onEdit && (
        <button type="button" className="demo-btn demo-btn--sm demo-btn--ghost" onClick={onEdit}>
          Редакция
        </button>
      )}
      {onDelete && (
        <button type="button" className="demo-btn demo-btn--sm demo-btn--danger" onClick={onDelete}>
          Изтрий
        </button>
      )}
    </div>
  );
}

function useFormState(initial, open) {
  const [form, setForm] = useState(initial);
  useEffect(() => {
    if (open) setForm(initial);
  }, [open, initial]);
  return [form, setForm];
}

export function DashboardSection({ state, role, onNavigate, onAudit }) {
  const pending = state.users.filter((u) => u.status === "pending").length;
  return (
    <>
      <h2 className="demo-content__title">Табло · {role === "admin" ? "Central Admin" : "Manager"}</h2>
      <div className="demo-stats-row">
        <StatBox label="Жители" value={String(state.users.filter((u) => u.status === "active").length)} sub="Emblema Residence" />
        <StatBox label="Чакащи одобрение" value={String(pending)} sub="регистрации" />
        <StatBox label="Push днес" value={String(state.messages.length)} sub="изпратени" />
        <StatBox label="Активен достъп" value={String(state.access.length)} sub="записи" />
      </div>
      <div className="demo-panels">
        <div className="demo-panel">
          <h3>Последна активност</h3>
          <ul className="demo-list">
            {state.auditLog.slice(0, 5).map((a) => (
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
            <button type="button" className="demo-btn" onClick={() => onNavigate("access", "add")}>+ Нов достъп</button>
            <button type="button" className="demo-btn" onClick={() => onNavigate("messages", "compose")}>✉ Съобщение</button>
            <button type="button" className="demo-btn demo-btn--ghost" onClick={() => onNavigate("approvals")}>
              Одобри заявки ({pending})
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function UsersSection({ state, setState, form, setForm, onAudit, onToast }) {
  const open = form?.section === "users";
  const editing = open && form.mode === "edit" ? state.users.find((u) => u.id === form.id) : null;
  const initial = editing ?? { name: "", email: "", apt: "", status: "active" };
  const [draft, setDraft] = useFormState(initial, open);

  if (open) {
    return (
      <FormPanel
        title={form.mode === "edit" ? "Редакция на жител" : "Нов жител"}
        onCancel={() => setForm(null)}
        onSubmit={() => {
          if (!draft.name.trim() || !draft.email.trim()) return;
          if (form.mode === "edit") {
            setState((s) => ({
              ...s,
              users: s.users.map((u) => (u.id === form.id ? { ...u, ...draft, role: "User" } : u)),
            }));
            onAudit("Жител обновен", draft.name);
            onToast("Жителят е обновен");
          } else {
            const id = nextId(state.users);
            setState((s) => ({
              ...s,
              users: [...s.users, { id, role: "User", ...draft }],
            }));
            onAudit("Жител добавен", draft.name);
            onToast("Жителят е добавен");
          }
          setForm(null);
        }}
      >
        <Field label="Име"><input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} required /></Field>
        <Field label="Email"><input type="email" value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} required /></Field>
        <Field label="Апартамент"><input value={draft.apt} onChange={(e) => setDraft({ ...draft, apt: e.target.value })} placeholder="12A" /></Field>
        <Field label="Статус">
          <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
            <option value="active">active</option>
            <option value="pending">pending</option>
          </select>
        </Field>
      </FormPanel>
    );
  }

  return (
    <>
      <SectionHeader title="Жители" onAdd={() => setForm({ section: "users", mode: "add" })} addLabel="+ Жител" />
      <DataTable
        columns={[
          { key: "name", label: "Име" },
          { key: "email", label: "Email" },
          { key: "apt", label: "Ап." },
          { key: "status", label: "Статус", render: (r) => <span className={`demo-pill demo-pill--${r.status}`}>{r.status}</span> },
          {
            key: "actions",
            label: "",
            render: (r) => (
              <RowActions
                onEdit={() => setForm({ section: "users", mode: "edit", id: r.id })}
                onDelete={() => {
                  setState((s) => ({ ...s, users: s.users.filter((u) => u.id !== r.id) }));
                  onAudit("Жител изтрит", r.name);
                  onToast("Жителят е изтрит");
                }}
              />
            ),
          },
        ]}
        rows={state.users}
      />
    </>
  );
}

export function ApprovalsSection({ state, setState, onAudit, onToast }) {
  const pending = state.users.filter((u) => u.status === "pending");
  const approve = (user) => {
    setState((s) => ({
      ...s,
      users: s.users.map((u) => (u.id === user.id ? { ...u, status: "active" } : u)),
    }));
    onAudit("Регистрация одобрена", user.name);
    onToast(`${user.name} е одобрен`);
  };
  const reject = (user) => {
    setState((s) => ({ ...s, users: s.users.filter((u) => u.id !== user.id) }));
    onAudit("Регистрация отхвърлена", user.name);
    onToast(`${user.name} е отхвърлен`);
  };

  return (
    <>
      <SectionHeader title="Опашка за одобрение" />
      <DataTable
        columns={[
          { key: "name", label: "Кандидат" },
          { key: "email", label: "Email" },
          { key: "apt", label: "Ап." },
          {
            key: "actions",
            label: "",
            render: (r) => (
              <RowActions
                extra={(
                  <>
                    <button type="button" className="demo-btn demo-btn--sm" onClick={() => approve(r)}>Одобри</button>
                    <button type="button" className="demo-btn demo-btn--sm demo-btn--ghost" onClick={() => reject(r)}>Отхвърли</button>
                  </>
                )}
              />
            ),
          },
        ]}
        rows={pending}
        emptyLabel="Няма чакащи заявки"
      />
    </>
  );
}

export function AccessSection({ state, setState, form, setForm, onAudit, onToast }) {
  const open = form?.section === "access";
  const editing = open && form.mode === "edit" ? state.access.find((a) => a.id === form.id) : null;
  const initial = editing ?? { user: "", type: "Постоянен", entrance: "Вход A", valid: "Безсрочен" };
  const [draft, setDraft] = useFormState(initial, open);

  if (open) {
    return (
      <FormPanel
        title={form.mode === "edit" ? "Редакция на достъп" : "Нов достъп"}
        onCancel={() => setForm(null)}
        onSubmit={() => {
          if (!draft.user.trim()) return;
          if (form.mode === "edit") {
            setState((s) => ({
              ...s,
              access: s.access.map((a) => (a.id === form.id ? { ...a, ...draft } : a)),
            }));
            onAudit("Достъп обновен", draft.user);
            onToast("Достъпът е обновен");
          } else {
            setState((s) => ({
              ...s,
              access: [...s.access, { id: nextId(state.access), ...draft }],
            }));
            onAudit("Достъп добавен", draft.user);
            onToast("Достъпът е добавен");
          }
          setForm(null);
        }}
      >
        <Field label="Потребител"><input value={draft.user} onChange={(e) => setDraft({ ...draft, user: e.target.value })} required /></Field>
        <Field label="Тип">
          <select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })}>
            <option>Постоянен</option>
            <option>Гост</option>
            <option>Наем</option>
          </select>
        </Field>
        <Field label="Точка"><input value={draft.entrance} onChange={(e) => setDraft({ ...draft, entrance: e.target.value })} /></Field>
        <Field label="Валидност"><input value={draft.valid} onChange={(e) => setDraft({ ...draft, valid: e.target.value })} placeholder="Безсрочен или период" /></Field>
      </FormPanel>
    );
  }

  return (
    <>
      <SectionHeader title="Управление на достъп" onAdd={() => setForm({ section: "access", mode: "add" })} addLabel="+ Достъп" />
      <DataTable
        columns={[
          { key: "user", label: "Потребител" },
          { key: "type", label: "Тип" },
          { key: "entrance", label: "Точка" },
          { key: "valid", label: "Валидност" },
          {
            key: "actions",
            label: "",
            render: (r) => (
              <RowActions
                onEdit={() => setForm({ section: "access", mode: "edit", id: r.id })}
                onDelete={() => {
                  setState((s) => ({ ...s, access: s.access.filter((a) => a.id !== r.id) }));
                  onAudit("Достъп изтрит", r.user);
                  onToast("Достъпът е изтрит");
                }}
              />
            ),
          },
        ]}
        rows={state.access}
      />
    </>
  );
}

export function VehiclesSection({ state, setState, form, setForm, onAudit, onToast }) {
  const open = form?.section === "vehicles";
  const editing = open && form.mode === "edit" ? state.vehicles.find((v) => v.id === form.id) : null;
  const initial = editing ?? { plate: "", owner: "", type: "Постоянен", status: "active" };
  const [draft, setDraft] = useFormState(initial, open);

  if (open) {
    return (
      <FormPanel
        title={form.mode === "edit" ? "Редакция на автомобил" : "Нов автомобил"}
        onCancel={() => setForm(null)}
        onSubmit={() => {
          if (!draft.plate.trim()) return;
          if (form.mode === "edit") {
            setState((s) => ({
              ...s,
              vehicles: s.vehicles.map((v) => (v.id === form.id ? { ...v, ...draft } : v)),
            }));
            onAudit("Автомобил обновен", draft.plate);
            onToast("Автомобилът е обновен");
          } else {
            setState((s) => ({
              ...s,
              vehicles: [...s.vehicles, { id: nextId(state.vehicles), ...draft }],
            }));
            onAudit("Автомобил добавен", draft.plate);
            onToast("Автомобилът е добавен");
          }
          setForm(null);
        }}
      >
        <Field label="Рег. номер"><input value={draft.plate} onChange={(e) => setDraft({ ...draft, plate: e.target.value.toUpperCase() })} required /></Field>
        <Field label="Собственик"><input value={draft.owner} onChange={(e) => setDraft({ ...draft, owner: e.target.value })} /></Field>
        <Field label="Тип">
          <select value={draft.type} onChange={(e) => setDraft({ ...draft, type: e.target.value })}>
            <option>Постоянен</option>
            <option>Временен</option>
            <option>Заявка</option>
          </select>
        </Field>
        <Field label="Статус">
          <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
            <option value="active">active</option>
            <option value="pending">pending</option>
          </select>
        </Field>
      </FormPanel>
    );
  }

  return (
    <>
      <SectionHeader title="Автомобилни номера" onAdd={() => setForm({ section: "vehicles", mode: "add" })} addLabel="+ Автомобил" />
      <DataTable
        columns={[
          { key: "plate", label: "Номер" },
          { key: "owner", label: "Собственик" },
          { key: "type", label: "Тип" },
          { key: "status", label: "Статус", render: (r) => <span className={`demo-pill demo-pill--${r.status}`}>{r.status}</span> },
          {
            key: "actions",
            label: "",
            render: (r) => (
              <RowActions
                onEdit={() => setForm({ section: "vehicles", mode: "edit", id: r.id })}
                onDelete={() => {
                  setState((s) => ({ ...s, vehicles: s.vehicles.filter((v) => v.id !== r.id) }));
                  onAudit("Автомобил изтрит", r.plate);
                  onToast("Автомобилът е изтрит");
                }}
              />
            ),
          },
        ]}
        rows={state.vehicles}
      />
    </>
  );
}

export function MessagesSection({ state, setState, form, setForm, onAudit, onToast }) {
  const composing = form?.section === "messages" && form.mode === "compose";
  const [draft, setDraft] = useFormState({ title: "", audience: "Цяла сграда", body: "" }, composing);

  if (composing) {
    return (
      <FormPanel
        title="Ново съобщение & Push"
        onCancel={() => setForm(null)}
        onSubmit={() => {
          if (!draft.title.trim()) return;
          const id = nextId(state.messages);
          setState((s) => ({
            ...s,
            messages: [{ id, title: draft.title, audience: draft.audience, sent: todayLabel(), read: "0%" }, ...s.messages],
          }));
          onAudit("Push изпратен", draft.title);
          onToast("Съобщението е изпратено");
          setForm(null);
        }}
        submitLabel="Изпрати push + in-app"
      >
        <Field label="Заглавие"><input value={draft.title} onChange={(e) => setDraft({ ...draft, title: e.target.value })} required /></Field>
        <Field label="Аудитория">
          <select value={draft.audience} onChange={(e) => setDraft({ ...draft, audience: e.target.value })}>
            <option>Цяла сграда</option>
            <option>Вход A</option>
            <option>Вход B</option>
            <option>Конкретен потребител</option>
          </select>
        </Field>
        <Field label="Текст"><textarea rows={4} value={draft.body} onChange={(e) => setDraft({ ...draft, body: e.target.value })} placeholder="Текст на съобщението..." /></Field>
      </FormPanel>
    );
  }

  return (
    <>
      <SectionHeader title="Съобщения & Push" onAdd={() => setForm({ section: "messages", mode: "compose" })} addLabel="+ Съобщение" />
      <DataTable
        columns={[
          { key: "title", label: "Заглавие" },
          { key: "audience", label: "До" },
          { key: "sent", label: "Изпратено" },
          { key: "read", label: "Прочетено" },
          {
            key: "actions",
            label: "",
            render: (r) => (
              <RowActions
                onDelete={() => {
                  setState((s) => ({ ...s, messages: s.messages.filter((m) => m.id !== r.id) }));
                  onAudit("Съобщение изтрито", r.title);
                  onToast("Съобщението е изтрито");
                }}
              />
            ),
          },
        ]}
        rows={state.messages}
      />
    </>
  );
}

export function AuditSection({ state }) {
  return (
    <>
      <SectionHeader title="Audit log" />
      <DataTable
        columns={[
          { key: "time", label: "Време" },
          { key: "user", label: "Актор" },
          { key: "action", label: "Действие" },
          { key: "target", label: "Обект" },
        ]}
        rows={state.auditLog}
      />
    </>
  );
}

export function BuildingsSection({ state, setState, form, setForm, onAudit, onToast }) {
  const open = form?.section === "buildings";
  const editing = open && form.mode === "edit" ? state.buildings.find((b) => b.id === form.id) : null;
  const initial = editing ?? { name: "", address: "", units: "", entrances: "" };
  const [draft, setDraft] = useFormState(initial, open);
  const structureOpen = form?.section === "buildings" && form.mode === "structure";
  const [structureDraft, setStructureDraft] = useFormState({ label: "" }, structureOpen);

  if (structureOpen) {
    return (
      <FormPanel
        title="Нова точка в структурата"
        onCancel={() => setForm(null)}
        onSubmit={() => {
          if (!structureDraft.label.trim()) return;
          setState((s) => ({
            ...s,
            buildingStructure: [...s.buildingStructure, { id: nextId(s.buildingStructure), label: structureDraft.label }],
          }));
          onAudit("Структура добавена", structureDraft.label);
          onToast("Точката е добавена");
          setForm(null);
        }}
      >
        <Field label="Описание"><input value={structureDraft.label} onChange={(e) => setStructureDraft({ label: e.target.value })} placeholder="Вход C → ..." required /></Field>
      </FormPanel>
    );
  }

  if (open && form.mode !== "structure") {
    return (
      <FormPanel
        title={form.mode === "edit" ? "Редакция на сграда" : "Нова сграда"}
        onCancel={() => setForm(null)}
        onSubmit={() => {
          if (!draft.name.trim()) return;
          const payload = { ...draft, units: Number(draft.units) || 0, entrances: Number(draft.entrances) || 0 };
          if (form.mode === "edit") {
            setState((s) => ({
              ...s,
              buildings: s.buildings.map((b) => (b.id === form.id ? { ...b, ...payload } : b)),
            }));
            onAudit("Сграда обновена", draft.name);
            onToast("Сградата е обновена");
          } else {
            setState((s) => ({
              ...s,
              buildings: [...s.buildings, { id: nextId(state.buildings), ...payload }],
            }));
            onAudit("Сграда добавена", draft.name);
            onToast("Сградата е добавена");
          }
          setForm(null);
        }}
      >
        <Field label="Име"><input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} required /></Field>
        <Field label="Адрес"><input value={draft.address} onChange={(e) => setDraft({ ...draft, address: e.target.value })} /></Field>
        <Field label="Апартаменти"><input type="number" min="0" value={draft.units} onChange={(e) => setDraft({ ...draft, units: e.target.value })} /></Field>
        <Field label="Входове"><input type="number" min="0" value={draft.entrances} onChange={(e) => setDraft({ ...draft, entrances: e.target.value })} /></Field>
      </FormPanel>
    );
  }

  return (
    <>
      <SectionHeader title="Сгради & структура" onAdd={() => setForm({ section: "buildings", mode: "add" })} addLabel="+ Сграда" />
      <DataTable
        columns={[
          { key: "name", label: "Сграда" },
          { key: "address", label: "Адрес" },
          { key: "units", label: "Ап." },
          { key: "entrances", label: "Входове" },
          {
            key: "actions",
            label: "",
            render: (r) => (
              <RowActions
                onEdit={() => setForm({ section: "buildings", mode: "edit", id: r.id })}
                onDelete={() => {
                  setState((s) => ({ ...s, buildings: s.buildings.filter((b) => b.id !== r.id) }));
                  onAudit("Сграда изтрита", r.name);
                  onToast("Сградата е изтрита");
                }}
              />
            ),
          },
        ]}
        rows={state.buildings}
      />
      <div className="demo-tree">
        <div className="demo-tree__head">
          <h3>Структура · Emblema Residence</h3>
          <button type="button" className="demo-btn demo-btn--sm demo-btn--ghost" onClick={() => setForm({ section: "buildings", mode: "structure" })}>+ Точка</button>
        </div>
        <ul>
          {state.buildingStructure.map((item) => (
            <li key={item.id} className="demo-tree__item">
              <span>{item.label}</span>
              <button
                type="button"
                className="demo-tree__remove"
                onClick={() => {
                  setState((s) => ({ ...s, buildingStructure: s.buildingStructure.filter((x) => x.id !== item.id) }));
                  onToast("Точката е премахната");
                }}
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export function ManagersSection({ state, setState, form, setForm, onAudit, onToast }) {
  const open = form?.section === "managers";
  const editing = open && form.mode === "edit" ? state.managers.find((m) => m.id === form.id) : null;
  const initial = editing ?? { manager: "", building: state.buildings[0]?.name ?? "" };
  const [draft, setDraft] = useFormState(initial, open);

  if (open) {
    return (
      <FormPanel
        title={form.mode === "edit" ? "Редакция на назначение" : "Ново назначение"}
        onCancel={() => setForm(null)}
        onSubmit={() => {
          if (!draft.manager.trim()) return;
          if (form.mode === "edit") {
            setState((s) => ({
              ...s,
              managers: s.managers.map((m) => (m.id === form.id ? { ...m, ...draft } : m)),
            }));
            onAudit("Мениджър обновен", draft.manager);
            onToast("Назначението е обновено");
          } else {
            setState((s) => ({
              ...s,
              managers: [...s.managers, { id: nextId(state.managers), ...draft }],
            }));
            onAudit("Мениджър добавен", draft.manager);
            onToast("Мениджърът е добавен");
          }
          setForm(null);
        }}
      >
        <Field label="Мениджър"><input value={draft.manager} onChange={(e) => setDraft({ ...draft, manager: e.target.value })} required /></Field>
        <Field label="Сграда">
          <select value={draft.building} onChange={(e) => setDraft({ ...draft, building: e.target.value })}>
            {state.buildings.map((b) => (
              <option key={b.id} value={b.name}>{b.name}</option>
            ))}
          </select>
        </Field>
      </FormPanel>
    );
  }

  return (
    <>
      <SectionHeader title="Мениджъри ↔ Сгради" onAdd={() => setForm({ section: "managers", mode: "add" })} addLabel="+ Назначение" />
      <DataTable
        columns={[
          { key: "manager", label: "Мениджър" },
          { key: "building", label: "Сграда" },
          {
            key: "actions",
            label: "",
            render: (r) => (
              <RowActions
                onEdit={() => setForm({ section: "managers", mode: "edit", id: r.id })}
                onDelete={() => {
                  setState((s) => ({ ...s, managers: s.managers.filter((m) => m.id !== r.id) }));
                  onAudit("Мениджър премахнат", r.manager);
                  onToast("Назначението е премахнато");
                }}
              />
            ),
          },
        ]}
        rows={state.managers}
      />
    </>
  );
}

function CmsTableSection({ title, addLabel, sectionKey, state, setState, form, setForm, onAudit, onToast, columns, fields, mapSave }) {
  const open = form?.section === sectionKey;
  const collectionKey = sectionKey === "cms-news" ? "news"
    : sectionKey === "cms-events" ? "events"
      : sectionKey === "cms-partners" ? "partners"
        : "sportVenues";
  const items = state[collectionKey];
  const editing = open && form.mode === "edit" ? items.find((x) => x.id === form.id) : null;
  const initial = editing ?? Object.fromEntries(fields.map((f) => [f.key, f.default ?? (f.type === "checkbox" ? false : "")]));
  const [draft, setDraft] = useFormState(initial, open);

  if (open) {
    return (
      <FormPanel
        title={form.mode === "edit" ? `Редакция · ${title}` : `Ново · ${title}`}
        onCancel={() => setForm(null)}
        onSubmit={() => {
          const payload = mapSave ? mapSave(draft) : draft;
          if (fields.some((f) => f.required && !String(payload[f.key] ?? "").trim())) return;
          if (form.mode === "edit") {
            setState((s) => ({
              ...s,
              [collectionKey]: s[collectionKey].map((x) => (x.id === form.id ? { ...x, ...payload } : x)),
            }));
            onAudit(`${title} обновено`, payload.title ?? payload.name);
            onToast("Записът е обновен");
          } else {
            setState((s) => ({
              ...s,
              [collectionKey]: [...s[collectionKey], { id: nextId(items), ...payload }],
            }));
            onAudit(`${title} добавено`, payload.title ?? payload.name);
            onToast("Записът е добавен");
          }
          setForm(null);
        }}
      >
        {fields.map((f) => (
          <Field key={f.key} label={f.label}>
            {f.type === "select" ? (
              <select value={draft[f.key]} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })}>
                {f.options.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            ) : f.type === "checkbox" ? (
              <input type="checkbox" checked={!!draft[f.key]} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.checked })} />
            ) : f.type === "textarea" ? (
              <textarea rows={3} value={draft[f.key]} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })} />
            ) : (
              <input type={f.type ?? "text"} value={draft[f.key]} onChange={(e) => setDraft({ ...draft, [f.key]: e.target.value })} required={f.required} />
            )}
          </Field>
        ))}
      </FormPanel>
    );
  }

  return (
    <>
      <SectionHeader title={title} onAdd={() => setForm({ section: sectionKey, mode: "add" })} addLabel={addLabel} />
      <DataTable
        columns={[
          ...columns,
          {
            key: "actions",
            label: "",
            render: (r) => (
              <RowActions
                onEdit={() => setForm({ section: sectionKey, mode: "edit", id: r.id })}
                onDelete={() => {
                  setState((s) => ({
                    ...s,
                    [collectionKey]: s[collectionKey].filter((x) => x.id !== r.id),
                  }));
                  onAudit(`${title} изтрито`, r.title ?? r.name);
                  onToast("Записът е изтрит");
                }}
              />
            ),
          },
        ]}
        rows={items}
      />
    </>
  );
}

export function NewsSection(props) {
  return (
    <CmsTableSection
      {...props}
      title="CMS · Новини"
      addLabel="+ Новина"
      sectionKey="cms-news"
      columns={[
        { key: "title", label: "Заглавие" },
        { key: "category", label: "Категория" },
        { key: "date", label: "Дата" },
        { key: "published", label: "Статус", render: (r) => (r.published ? "Публикувана" : "Чернова") },
      ]}
      fields={[
        { key: "title", label: "Заглавие", required: true },
        { key: "category", label: "Категория", type: "select", options: ["Събития", "Обслужване", "Лоялност", "Общи"] },
        { key: "date", label: "Дата", default: todayLabel() },
        { key: "published", label: "Публикувана", type: "checkbox", default: false },
      ]}
      mapSave={(d) => ({ ...d, published: !!d.published })}
    />
  );
}

export function EventsSection(props) {
  return (
    <CmsTableSection
      {...props}
      title="CMS · Събития"
      addLabel="+ Събитие"
      sectionKey="cms-events"
      columns={[
        { key: "title", label: "Събитие" },
        { key: "date", label: "Дата" },
        { key: "time", label: "Час" },
        { key: "location", label: "Локация" },
      ]}
      fields={[
        { key: "title", label: "Заглавие", required: true },
        { key: "date", label: "Дата", default: todayLabel() },
        { key: "time", label: "Час", default: "18:00" },
        { key: "location", label: "Локация", required: true },
      ]}
    />
  );
}

export function PartnersSection(props) {
  return (
    <CmsTableSection
      {...props}
      title="CMS · Лоялност"
      addLabel="+ Партньор"
      sectionKey="cms-partners"
      columns={[
        { key: "name", label: "Партньор" },
        { key: "category", label: "Категория" },
        { key: "discount", label: "Отстъпка" },
      ]}
      fields={[
        { key: "name", label: "Име", required: true },
        { key: "category", label: "Категория", type: "select", options: ["Ресторант", "Спорт", "Авто", "Услуги"] },
        { key: "discount", label: "Отстъпка", default: "10%" },
        { key: "image", label: "URL на изображение", type: "url" },
      ]}
    />
  );
}

export function SportSection(props) {
  return (
    <CmsTableSection
      {...props}
      title="CMS · Emblema Sport"
      addLabel="+ Обект"
      sectionKey="cms-sport"
      columns={[
        { key: "name", label: "Обект" },
        { key: "sport", label: "Спорт" },
        { key: "phone", label: "Контакт" },
      ]}
      fields={[
        { key: "name", label: "Име", required: true },
        { key: "sport", label: "Спорт", type: "select", options: ["Тенис", "Басейн", "Фитнес", "Йога"] },
        { key: "phone", label: "Телефон", default: "+359 888 000 000" },
        { key: "image", label: "URL на изображение", type: "url" },
      ]}
    />
  );
}

export function RadioSection({ state, setState, onAudit, onToast }) {
  const [draft, setDraft] = useState(state.radioConfig);
  useEffect(() => {
    setDraft(state.radioConfig);
  }, [state.radioConfig]);

  return (
    <>
      <SectionHeader title="CMS · Emblema Radio" />
      <form
        className="demo-form demo-form--wide demo-panel demo-panel--radio"
        onSubmit={(e) => {
          e.preventDefault();
          setState((s) => ({ ...s, radioConfig: { ...draft } }));
          onAudit("Radio конфигурация запазена", draft.name);
          onToast("Конфигурацията е запазена");
        }}
      >
        <Field label="Име на станцията"><input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} /></Field>
        <Field label="Stream URL"><input value={draft.stream} onChange={(e) => setDraft({ ...draft, stream: e.target.value })} /></Field>
        <Field label="Статус">
          <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
            <option>Live</option>
            <option>Offline</option>
            <option>Maintenance</option>
          </select>
        </Field>
        <Field label="Слушатели (mock)"><input type="number" min="0" value={draft.listeners} onChange={(e) => setDraft({ ...draft, listeners: Number(e.target.value) || 0 })} /></Field>
        <div className="demo-form-actions">
          <button type="submit" className="demo-btn">Запази конфигурация</button>
        </div>
      </form>
    </>
  );
}
