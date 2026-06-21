import { useMemo } from "react";
import {
  PHASES,
  TOKEN_ITEMS,
  TOKEN_NOTE,
  CLIENT_COST_ITEMS,
  CLIENT_COST_NOTE,
  INCLUDED,
  EXCLUDED,
  TECH_STACK,
  RATE,
  TIMELINE,
  VAT_LABEL,
  formatNum,
  fmtPrice,
  calcTotals,
  getMaxPhaseHours,
  phaseBadge,
} from "../data";
import "../App.css";
import "../demo/Demo.css";
import { MockBrowserIcon, MockPhoneIcon } from "../demo/DemoLinkIcons";

function GlowOrb({ color, style }) {
  return <div className="glow-orb" style={{ background: color, ...style }} />;
}

function StatCard({ label, value, sub, highlight, large }) {
  return (
    <div className={`stat-card ${highlight ? "stat-card--highlight" : ""} ${large ? "stat-card--large" : ""}`}>
      <span className="stat-card__label">{label}</span>
      <span className="stat-card__value">{value}</span>
      {sub && <span className="stat-card__sub">{sub}</span>}
    </div>
  );
}

function SummaryPanel({
  devHours,
  devPrice,
  tokenPrice,
  devGrandTotal,
  clientMonthly,
  clientApple,
  clientGoogle,
}) {
  return (
    <>
      <div className="summary-panel">
        <div className="summary-panel__dev">
          <div className="summary-hero-block">
            <span className="summary-hero-block__eyebrow">Разработка - общо</span>
            <div className="summary-hero-block__value">{fmtPrice(devGrandTotal)}</div>
            <div className="summary-hero-block__meta">
              <span>{formatNum(devHours)} часа</span>
              <span className="summary-hero-block__dot">·</span>
              <span>{TIMELINE}</span>
            </div>
          </div>
          <div className="hero__stats hero__stats--3 summary-panel__stats">
            <StatCard label="Dev цена" value={fmtPrice(devPrice)} large />
            <StatCard label="AI tokens" value={fmtPrice(tokenPrice)} large />
            <StatCard label="Dev часове" value={`${formatNum(devHours)} ч.`} large highlight />
          </div>
        </div>

        <div className="summary-panel__client">
          <div className="summary-client-block">
            <span className="summary-client-block__eyebrow">За сметка на клиента</span>
            <div className="summary-client-block__value">
              {fmtPrice(clientMonthly, { suffix: "/мес" })}
            </div>
            <div className="summary-client-block__label">Render + Neon + Resend + Expo · директно към доставчик</div>
            <div className="summary-client-block__divider" />
            <div className="summary-client-releases">
              <div className="summary-client-release">
                <span className="summary-client-release__platform">iOS · App Store</span>
                <span className="summary-client-release__price">{fmtPrice(clientApple)}</span>
                <span className="summary-client-release__note">/год · Apple Developer</span>
              </div>
              <div className="summary-client-release">
                <span className="summary-client-release__platform">Android · Google Play</span>
                <span className="summary-client-release__price">{fmtPrice(clientGoogle)}</span>
                <span className="summary-client-release__note">еднократно</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="summary-footnote">
        <span className="summary-footnote__dev">Dev цени и AI tokens - {VAT_LABEL}</span>
        <span className="summary-footnote__sep">·</span>
        <span className="summary-footnote__client">Infra и store такси - директно към Render, Neon, Resend, Expo, Apple, Google</span>
      </p>
    </>
  );
}

function PhaseCard({ phase }) {
  const phaseHours = phase.tasks.reduce((s, t) => s + t.hours, 0);
  const phasePrice = phaseHours * RATE;

  return (
    <section className="phase-card glass-card" id={`phase-${phase.id}`}>
      <div className="phase-card__header">
        <div className="phase-card__title-row">
          <span className="phase-badge" style={{ background: phase.color }}>
            {phaseBadge(phase.id)}
          </span>
          <h3>{phase.title}</h3>
        </div>
        <div className="phase-totals">
          <span className="phase-totals__hours">{formatNum(phaseHours)} ч.</span>
          <span className="phase-totals__price">{fmtPrice(phasePrice)}</span>
        </div>
      </div>
      <div className="task-list">
        {phase.tasks.map((task) => (
          <div key={task.id} className="task-row task-row--active">
            <span className="task-id">{task.id}</span>
            <span className="task-name">{task.name}</span>
            <span className="task-hours">{task.hours} ч.</span>
            <span className="task-price">{fmtPrice(task.hours * RATE)}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function CostRows({ items, type }) {
  return (
    <div className="task-list">
      {items.map((item) => (
        <div key={item.id} className="task-row task-row--active task-row--cost">
          <span className="task-id">{item.id}</span>
          <span className="task-name">
            {item.name}
            <span className="task-detail">{item.detail}</span>
          </span>
          <span className="task-hours">
            {type === "monthly" ? "/мес" : type === "onetime" ? "еднокр." : "-"}
          </span>
          <span className="task-price">
            {fmtPrice(item.euroMonthly ?? item.euroOneTime ?? item.euro ?? 0)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function OfferPage() {
  const {
    devHours,
    devPrice,
    tokenPrice,
    clientMonthly,
    clientApple,
    clientGoogle,
    clientRelease,
    devGrandTotal,
    phaseTotals,
  } = useMemo(() => calcTotals(), []);

  const maxPhaseHours = useMemo(() => getMaxPhaseHours(phaseTotals), [phaseTotals]);

  const monthlyItems = CLIENT_COST_ITEMS.filter((i) => i.euroMonthly != null);
  const releaseItems = CLIENT_COST_ITEMS.filter((i) => i.euroOneTime != null);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="app app--single">
      <GlowOrb color="rgba(99,102,241,0.18)" style={{ top: "-8%", left: "-5%", width: 500, height: 500 }} />
      <GlowOrb color="rgba(168,85,247,0.14)" style={{ top: "20%", right: "-10%", width: 400, height: 400 }} />
      <GlowOrb color="rgba(236,72,153,0.1)" style={{ bottom: "5%", left: "30%", width: 350, height: 350 }} />

      <main className="page">
        <section className="hero-summary glass-card">
          <div className="hero-summary__header">
            <div>
              <h1 className="hero__title">
                Emblema
                <span className="hero__title-accent"> App Platform</span>
              </h1>
              <p className="hero__subtitle">
                Mobile · Web Admin · Backend API · Cursor + Claude
              </p>
            </div>
          </div>

          <SummaryPanel
            devHours={devHours}
            devPrice={devPrice}
            tokenPrice={tokenPrice}
            devGrandTotal={devGrandTotal}
            clientMonthly={clientMonthly}
            clientApple={clientApple}
            clientGoogle={clientGoogle}
          />
        </section>

        <section className="section" id="demos">
          <h2 className="section-title">Интерактивно демо</h2>
          <p className="section-desc">
            Mock UI прототип без backend - всички основни функционалности на Admin и Mobile app.
          </p>
          <div className="demo-links">
            <a href="/#/demo/admin" target="_blank" rel="noopener noreferrer" className="demo-link-card glass-card">
              <span className="demo-link-card__eyebrow">Web Admin</span>
              <span className="demo-link-card__title">Demo Admin Panel</span>
              <span className="demo-link-card__desc">
                Manager + Central Admin · жители, достъп, CMS, audit log
              </span>
              <span className="demo-link-card__cta">
                <span className="demo-link-card__cta-icon demo-link-card__cta-icon--browser">
                  <MockBrowserIcon size={20} />
                </span>
                <span>Отвори admin</span>
                <span className="demo-link-card__cta-arrow" aria-hidden="true">→</span>
              </span>
            </a>
            <a href="/#/demo/mobile" target="_blank" rel="noopener noreferrer" className="demo-link-card glass-card">
              <span className="demo-link-card__eyebrow">Mobile App</span>
              <span className="demo-link-card__title">Demo Mobile App</span>
              <span className="demo-link-card__desc">
                Welcome → вход/регистрация → app · iPhone 15 Pro
              </span>
              <span className="demo-link-card__cta">
                <span className="demo-link-card__cta-icon demo-link-card__cta-icon--phone">
                  <MockPhoneIcon size={20} />
                </span>
                <span>Отвори app</span>
                <span className="demo-link-card__cta-arrow" aria-hidden="true">→</span>
              </span>
            </a>
          </div>
        </section>

        <section className="section" id="scope">
          <h2 className="section-title">Обхват на проекта</h2>
          <div className="scope-grid">
            <div className="scope-card glass-card scope-card--included">
              <h3>✓ Включено</h3>
              <ul>
                {INCLUDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="scope-card glass-card scope-card--excluded">
              <h3>✗ Извън обхват</h3>
              <ul>
                {EXCLUDED.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="note-card glass-card">
            <strong>Smart Home:</strong> External link only - без вътрешна интеграция.
          </div>
          <div className="note-card glass-card note-card--client">
            <strong>Разходи за клиента:</strong> {CLIENT_COST_NOTE}
          </div>
        </section>

        <section className="section section--summary-table" id="summary">
          <h2 className="section-title section-title--large">Обобщение по фази</h2>
          <div className="phase-grid">
            {phaseTotals.map((p) => (
              <button
                key={p.id}
                type="button"
                className="phase-summary-card glass-card no-print"
                onClick={() => scrollTo(`phase-${p.id}`)}
              >
                <div className="phase-summary-card__badge" style={{ background: p.color }}>
                  {p.badge}
                </div>
                <div className="phase-summary-card__title">{p.title}</div>
                <div className="phase-summary-card__bar">
                  <div
                    className="phase-summary-card__bar-fill"
                    style={{
                      width: `${Math.min(100, (p.hours / maxPhaseHours) * 100)}%`,
                      background: p.color,
                    }}
                  />
                </div>
                <div className="phase-summary-card__meta">
                  <span>{formatNum(p.hours)} ч.</span>
                  <span>{fmtPrice(p.price)}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="summary-table glass-card">
            <div className="summary-table__head">
              <span>Фаза</span><span>Описание</span><span>Часове</span><span>Цена</span>
            </div>
            {phaseTotals.map((p) => (
              <div key={p.id} className="summary-table__row">
                <span>{p.badge}</span>
                <span>{p.title}</span>
                <span>{formatNum(p.hours)} ч.</span>
                <span>{fmtPrice(p.price)}</span>
              </div>
            ))}
            <div className="summary-table__row summary-table__row--tokens">
              <span>AI</span>
              <span>Claude / Cursor tokens</span>
              <span>-</span>
              <span>{fmtPrice(tokenPrice)}</span>
            </div>
            <div className="summary-table__row summary-table__row--total">
              <span>-</span>
              <span>Разработка общо</span>
              <span>{formatNum(devHours)} ч.</span>
              <span>{fmtPrice(devGrandTotal)}</span>
            </div>
            <div className="summary-table__section">За сметка на клиента</div>
            <div className="summary-table__row summary-table__row--infra">
              <span>Infra</span>
              <span>Render + Neon + Resend + Expo</span>
              <span>-</span>
              <span>{fmtPrice(clientMonthly, { suffix: "/мес" })}</span>
            </div>
            <div className="summary-table__row summary-table__row--infra">
              <span>iOS</span>
              <span>Apple Developer · App Store</span>
              <span>-</span>
              <span>{fmtPrice(clientApple)} /год</span>
            </div>
            <div className="summary-table__row summary-table__row--infra">
              <span>Android</span>
              <span>Google Play Console</span>
              <span>-</span>
              <span>{fmtPrice(clientGoogle)}</span>
            </div>
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Технологичен стек</h2>
          <div className="tech-grid glass-card">
            {TECH_STACK.map((t) => (
              <div key={t.label} className="tech-item">
                <span className="tech-label">{t.label}</span>
                <span className="tech-value">{t.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="estimate">
          <h2 className="section-title">Детайлна оценка по тикети</h2>
          <p className="section-desc">
            Kickoff, review и client feedback са вградени в тикетите - без отделен PM процес.
          </p>

          {PHASES.map((phase) => (
            <PhaseCard key={phase.id} phase={phase} />
          ))}

          <section className="phase-card glass-card token-section">
            <div className="phase-card__header">
              <div className="phase-card__title-row">
                <span className="phase-badge" style={{ background: "#0ea5e9" }}>AI</span>
                <h3>Claude / Cursor - AI tokens (est.)</h3>
              </div>
              <div className="phase-totals">
                <span className="phase-totals__price">{fmtPrice(tokenPrice)}</span>
              </div>
            </div>
            <p className="token-section__desc">{TOKEN_NOTE}</p>
            <CostRows items={TOKEN_ITEMS} />
          </section>

          <section className="phase-card glass-card client-section">
            <div className="phase-card__header">
              <div className="phase-card__title-row">
                <span className="phase-badge" style={{ background: "#10b981" }}>Клиент</span>
                <h3>Render + Neon + Resend + Expo + App Store - за сметка на клиента</h3>
              </div>
            </div>
            <p className="token-section__desc">{CLIENT_COST_NOTE}</p>

            <h4 className="cost-subtitle">Месечно (Render + Neon + Resend + Expo)</h4>
            <CostRows items={monthlyItems} type="monthly" />
            <div className="cost-subtotal">
              <span>Месечно общо</span>
              <span>{fmtPrice(clientMonthly, { suffix: "/мес" })}</span>
            </div>

            <h4 className="cost-subtitle">iOS - App Store (Apple Developer)</h4>
            <CostRows items={releaseItems.filter((i) => i.id === "CC-05")} type="onetime" />

            <h4 className="cost-subtitle">Android - Google Play</h4>
            <CostRows items={releaseItems.filter((i) => i.id === "CC-06")} type="onetime" />
            <div className="cost-subtotal">
              <span>Store release общо</span>
              <span>{fmtPrice(clientRelease)}</span>
            </div>
          </section>
        </section>

        <section className="section" id="total">
          <h2 className="section-title section-title--large">Обобщение</h2>
          <section className="hero-summary hero-summary--bottom glass-card">
            <SummaryPanel
              devHours={devHours}
              devPrice={devPrice}
              tokenPrice={tokenPrice}
              devGrandTotal={devGrandTotal}
              clientMonthly={clientMonthly}
              clientApple={clientApple}
              clientGoogle={clientGoogle}
            />
          </section>
        </section>

        <footer className="app-footer">
          <span>Emblema App - Project Estimation · {VAT_LABEL}</span>
          <span>
            {formatNum(devHours)} ч. · {fmtPrice(devGrandTotal)} · клиент: {fmtPrice(clientMonthly, { suffix: "/мес" })} + iOS {fmtPrice(clientApple)}/год + Android {fmtPrice(clientGoogle)}
          </span>
        </footer>
      </main>
    </div>
  );
}
