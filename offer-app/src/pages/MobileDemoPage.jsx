import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DemoBackLink, IphoneFrame } from "../demo/DemoShell";
import {
  IconBell,
  IconBuilding,
  IconCalendar,
  IconCar,
  IconChevronLeft,
  IconChevronRight,
  IconClock,
  IconDumbbell,
  IconElevator,
  IconHome,
  IconKey,
  IconLock,
  IconLogin,
  IconLogout,
  IconMail,
  IconMenu,
  IconMessage,
  IconNews,
  IconParking,
  IconPhone,
  IconPlay,
  IconPause,
  IconQr,
  IconRadio,
  IconSkipBack,
  IconSkipForward,
  IconSmartHome,
  IconSpark,
  IconSport,
  IconStar,
  IconUser,
  IconUserPlus,
  IconUtensils,
} from "../demo/MobileIcons";
import { AUTH_SCREENS, TAB_ROOTS, getTransitionType } from "../demo/mobileNav";
import {
  MOBILE_ACCESS,
  MOBILE_EVENTS,
  MOBILE_FEATURED,
  MOBILE_HOME,
  MOBILE_MESSAGES,
  MOBILE_NEWS,
  MOBILE_RADIO_BANNERS,
  MOBILE_VEHICLES,
  PARTNERS,
  RADIO_CONFIG,
  SPORT_VENUES,
} from "../demo/mockData";

const MORE_SCREENS = new Set(["profile", "events", "access", "vehicles", "messages"]);
const HIDE_TAB_SCREENS = new Set([
  "news-detail",
  "loyalty-qr",
  "notifications",
  ...MORE_SCREENS,
  ...AUTH_SCREENS,
]);

const PARTNER_ICONS = {
  restaurant: IconUtensils,
  gym: IconDumbbell,
  auto: IconCar,
};

const MESSAGE_ICONS = {
  elevator: IconElevator,
  parking: IconParking,
  bell: IconBell,
  calendar: IconCalendar,
};

const STAT_ICONS = {
  message: IconMessage,
  calendar: IconCalendar,
  key: IconKey,
};

function formatPhoneTime(date = new Date()) {
  return date.toLocaleTimeString("bg-BG", { hour: "numeric", minute: "2-digit" });
}

function usePhoneTime() {
  const [time, setTime] = useState(formatPhoneTime);

  useEffect(() => {
    const tick = () => setTime(formatPhoneTime());
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);

  return time;
}

function PhoneStatusTime() {
  const time = usePhoneTime();
  return <span>{time}</span>;
}

function MobileStatusBar() {
  return (
    <div className="m-status">
      <PhoneStatusTime />
      <span className="m-status__icons">●●● ▮▮▮</span>
    </div>
  );
}

function BackBtn({ onClick, label = "Назад" }) {
  return (
    <button type="button" className="m-back" onClick={onClick}>
      <IconChevronLeft size={18} stroke={2.5} />
      <span>{label}</span>
    </button>
  );
}

function ScreenHeader({ title, icon: Icon, action }) {
  return (
    <div className="m-header">
      <div className="m-header__title">
        {Icon && (
          <span className="m-header__icon">
            <Icon size={22} />
          </span>
        )}
        <h1>{title}</h1>
      </div>
      {action}
    </div>
  );
}

function MenuRow({ icon: Icon, label, onClick, tone }) {
  return (
    <button type="button" className={`m-menu-row ${tone ? `m-menu-row--${tone}` : ""}`} onClick={onClick}>
      <span className="m-menu-row__icon">
        <Icon size={18} />
      </span>
      <span className="m-menu-row__label">{label}</span>
      <IconChevronRight size={16} className="m-menu-row__chev" />
    </button>
  );
}

function MobileTabBar({ active, onChange }) {
  const tabs = [
    { id: "home", label: "Начало", Icon: IconHome },
    { id: "sport", label: "Спорт", Icon: IconSport },
    { id: "loyalty", label: "Лоялност", Icon: IconStar },
    { id: "radio", label: "Радио", Icon: IconRadio },
    { id: "more", label: "Още", Icon: IconMenu },
  ];
  return (
    <nav className="m-tabs">
      {tabs.map(({ id, label, Icon }) => (
        <button key={id} type="button" className={active === id ? "active" : ""} onClick={() => onChange(id)}>
          <Icon size={22} stroke={active === id ? 2.4 : 1.8} />
          <span>{label}</span>
        </button>
      ))}
    </nav>
  );
}

function RadioScreen() {
  const [playing, setPlaying] = useState(true);
  const [activeShowId, setActiveShowId] = useState(MOBILE_RADIO_BANNERS[0].id);
  const activeShow = MOBILE_RADIO_BANNERS.find((b) => b.id === activeShowId) ?? MOBILE_RADIO_BANNERS[0];

  return (
    <div className="m-screen m-screen--radio">
      <div className="m-radio-glow" aria-hidden="true" />
      <div className="m-radio-player">
        <div className="m-radio-art">
          <img src={activeShow.image} alt="" className="m-radio-art__img" />
          <span className="m-radio-art__overlay" aria-hidden="true">
            <IconRadio size={32} stroke={1.8} />
          </span>
        </div>
        <div className="m-radio-live">
          <span className="m-radio-live__dot" aria-hidden="true" />
          {RADIO_CONFIG.status}
        </div>
        <h2 className="m-radio-title">{activeShow.title}</h2>
        <p className="m-radio-meta">{activeShow.subtitle}</p>
        <div className={`m-radio-wave ${playing ? "m-radio-wave--active" : ""}`} aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className="m-radio-wave__bar" style={{ animationDelay: `${i * 0.12}s` }} />
          ))}
        </div>
        <div className="m-radio-controls">
          <button type="button" className="m-radio-btn" aria-label="Previous">
            <IconSkipBack size={20} stroke={2} />
          </button>
          <button
            type="button"
            className="m-radio-btn m-radio-btn--play"
            aria-label={playing ? "Pause" : "Play"}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? <IconPause size={24} /> : <IconPlay size={24} className="m-radio-play-icon" />}
          </button>
          <button type="button" className="m-radio-btn" aria-label="Next">
            <IconSkipForward size={20} stroke={2} />
          </button>
        </div>
      </div>

      <div className="m-section-label m-section-label--inset m-radio-banners-label">
        <IconRadio size={14} /> Още от {RADIO_CONFIG.name}
      </div>
      <div className="m-scroll-strip m-scroll-strip--radio">
        {MOBILE_RADIO_BANNERS.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`m-featured-tile m-featured-tile--${b.tone}${b.id === activeShowId ? " m-featured-tile--active" : ""}`}
            onClick={() => {
              setActiveShowId(b.id);
              setPlaying(true);
            }}
          >
            <div className="m-featured-tile__img">
              <img src={b.image} alt="" loading="lazy" />
            </div>
            <div className="m-featured-tile__body">
              <span className="m-featured-tile__tag">{b.tag}</span>
              <strong>{b.title}</strong>
              <span>{b.subtitle}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function MobileScreen({ screen, onNavigate, selectedNewsId }) {
  const nav = (to, dir, newsId) => onNavigate(to, dir, newsId);
  const activeNews = MOBILE_NEWS.find((n) => n.id === selectedNewsId) ?? MOBILE_NEWS[0];
  const featuredNews = MOBILE_NEWS[0];

  switch (screen) {
    case "welcome":
      return (
        <div className="m-screen m-screen--welcome">
          <div className="m-welcome__orbs" aria-hidden="true">
            <span className="m-welcome__orb m-welcome__orb--1" />
            <span className="m-welcome__orb m-welcome__orb--2" />
            <span className="m-welcome__orb m-welcome__orb--3" />
          </div>
          <div className="m-welcome__status">
            <PhoneStatusTime />
            <span>●●● ▮▮▮</span>
          </div>
          <div className="m-welcome__content">
            <div className="m-welcome__logo-wrap">
              <div className="m-welcome__logo-ring" />
              <div className="m-welcome__logo">
                <span className="m-welcome__logo-mark">E</span>
              </div>
            </div>
            <h1 className="m-welcome__title">Emblema</h1>
            <p className="m-welcome__sub">Вашият дом · един app</p>
            <div className="m-welcome__actions">
              <button type="button" className="m-welcome-btn m-welcome-btn--primary" onClick={() => nav("login")}>
                <span className="m-welcome-btn__label">Вход</span>
                <IconChevronRight size={20} stroke={2.5} className="m-welcome-btn__arrow" />
              </button>
              <button type="button" className="m-welcome-btn m-welcome-btn--glass" onClick={() => nav("register")}>
                <span className="m-welcome-btn__label">Регистрация</span>
                <IconChevronRight size={20} stroke={2.5} className="m-welcome-btn__arrow" />
              </button>
              <button type="button" className="m-welcome-btn m-welcome-btn--ghost" onClick={() => nav("home")}>
                Продължи без вход
              </button>
            </div>
          </div>
        </div>
      );
    case "login":
      return (
        <div className="m-screen m-screen--auth">
          <BackBtn onClick={() => nav("welcome", "back")} />
          <div className="m-auth-hero">
            <span className="m-auth-hero__icon"><IconLogin size={28} /></span>
            <h2 className="m-auth-title">Вход</h2>
            <p className="m-auth-sub">Добре дошли отново</p>
          </div>
          <form className="m-auth-form" onSubmit={(e) => { e.preventDefault(); nav("home"); }}>
            <label><span className="m-field-label"><IconMail size={14} /> Email</span><input type="email" defaultValue="ivan@email.com" /></label>
            <label><span className="m-field-label"><IconLock size={14} /> Парола</span><input type="password" defaultValue="••••••••" /></label>
            <button type="button" className="m-auth-link" onClick={() => nav("forgot-password")}>Забравена парола?</button>
            <button type="submit" className="m-auth-btn m-auth-btn--primary">Влез</button>
          </form>
          <p className="m-auth-footer">
            Нямаш акаунт? <button type="button" className="m-auth-link" onClick={() => nav("register")}>Регистрирай се</button>
          </p>
        </div>
      );
    case "register":
      return (
        <div className="m-screen m-screen--auth">
          <BackBtn onClick={() => nav("welcome", "back")} />
          <div className="m-auth-hero">
            <span className="m-auth-hero__icon"><IconUserPlus size={28} /></span>
            <h2 className="m-auth-title">Регистрация</h2>
            <p className="m-auth-sub">Заяви достъп като жител</p>
          </div>
          <form className="m-auth-form" onSubmit={(e) => { e.preventDefault(); nav("pending-approval"); }}>
            <label><span className="m-field-label"><IconUser size={14} /> Име</span><input defaultValue="Георги Димитров" /></label>
            <label><span className="m-field-label"><IconMail size={14} /> Email</span><input type="email" defaultValue="georgi@email.com" /></label>
            <label><span className="m-field-label"><IconLock size={14} /> Парола</span><input type="password" defaultValue="••••••••" /></label>
            <label><span className="m-field-label"><IconBuilding size={14} /> Сграда</span><select defaultValue="residence"><option value="residence">Emblema Residence</option><option value="garden">Emblema Garden</option></select></label>
            <label><span className="m-field-label"><IconKey size={14} /> Апартамент</span><input defaultValue="8C" /></label>
            <button type="submit" className="m-auth-btn m-auth-btn--primary">Изпрати за одобрение</button>
          </form>
        </div>
      );
    case "forgot-password":
      return (
        <div className="m-screen m-screen--auth">
          <BackBtn onClick={() => nav("login", "back")} />
          <div className="m-auth-hero">
            <span className="m-auth-hero__icon"><IconLock size={28} /></span>
            <h2 className="m-auth-title">Забравена парола</h2>
            <p className="m-auth-sub">Link за reset на email</p>
          </div>
          <form className="m-auth-form" onSubmit={(e) => { e.preventDefault(); nav("forgot-sent"); }}>
            <label><span className="m-field-label"><IconMail size={14} /> Email</span><input type="email" defaultValue="ivan@email.com" /></label>
            <button type="submit" className="m-auth-btn m-auth-btn--primary">Изпрати link</button>
          </form>
        </div>
      );
    case "forgot-sent":
      return (
        <div className="m-screen m-screen--auth m-screen--center">
          <div className="m-auth-icon"><IconMail size={28} /></div>
          <h2 className="m-auth-title">Провери email</h2>
          <p className="m-detail-text">Изпратихме link на ivan@email.com</p>
          <button type="button" className="m-auth-btn m-auth-btn--primary" onClick={() => nav("reset-password")}>Нова парола</button>
          <button type="button" className="m-auth-link m-auth-link--block" onClick={() => nav("login", "back")}>Към вход</button>
        </div>
      );
    case "reset-password":
      return (
        <div className="m-screen m-screen--auth">
          <BackBtn onClick={() => nav("login", "back")} />
          <div className="m-auth-hero">
            <span className="m-auth-hero__icon"><IconLock size={28} /></span>
            <h2 className="m-auth-title">Нова парола</h2>
          </div>
          <form className="m-auth-form" onSubmit={(e) => { e.preventDefault(); nav("login", "back"); }}>
            <label><span className="m-field-label"><IconLock size={14} /> Нова парола</span><input type="password" /></label>
            <label><span className="m-field-label"><IconLock size={14} /> Потвърди</span><input type="password" /></label>
            <button type="submit" className="m-auth-btn m-auth-btn--primary">Запази и влез</button>
          </form>
        </div>
      );
    case "pending-approval":
      return (
        <div className="m-screen m-screen--auth m-screen--center">
          <div className="m-auth-icon m-auth-icon--pending"><IconClock size={28} /></div>
          <h2 className="m-auth-title">Чака одобрение</h2>
          <p className="m-detail-text">Домоуправителят ще одобри регистрацията ти.</p>
          <button type="button" className="m-auth-btn m-auth-btn--primary" onClick={() => nav("home")}>Продължи</button>
          <button type="button" className="m-auth-link m-auth-link--block" onClick={() => nav("welcome", "back")}>Към начало</button>
        </div>
      );
    case "home":
      return (
        <div className="m-screen m-screen--home">
          <div className="m-dash-header">
            <div>
              <p className="m-dash-header__greet">Здравей, {MOBILE_HOME.userName}</p>
              <h1 className="m-dash-header__title">{MOBILE_HOME.building}</h1>
            </div>
            <button type="button" className="m-icon-btn" onClick={() => nav("notifications")} aria-label="Известия">
              <IconBell size={18} />
              <span className="m-icon-btn__dot" />
            </button>
          </div>

          <div className="m-dash-stats">
            {MOBILE_HOME.stats.map((s) => {
              const StatIcon = STAT_ICONS[s.icon];
              return (
                <button
                  key={s.id}
                  type="button"
                  className="m-dash-stat"
                  onClick={() => nav(s.screen)}
                >
                  <span className={`m-dash-stat__icon m-quick-tile__icon m-quick-tile__icon--${s.tone}`}>
                    {StatIcon && <StatIcon size={18} stroke={2} />}
                    {s.highlight && <span className="m-dash-stat__dot" aria-hidden="true" />}
                  </span>
                  <span className="m-dash-stat__value">{s.value}</span>
                  <span className="m-dash-stat__label">{s.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            className="m-featured-hero"
            onClick={() => nav("news-detail", "forward", featuredNews.id)}
          >
            <img src={featuredNews.heroImage ?? featuredNews.image} alt="" loading="lazy" />
            <div className="m-featured-hero__overlay">
              <span className="m-featured-hero__tag">Акцент · {featuredNews.category}</span>
              <strong>{featuredNews.title}</strong>
              <p>{featuredNews.excerpt}</p>
            </div>
          </button>

          <div className="m-section-label m-section-label--inset"><IconSpark size={14} /> Препоръчано</div>
          <div className="m-scroll-strip">
            {MOBILE_FEATURED.map((f) => (
              <button
                key={f.id}
                type="button"
                className={`m-featured-tile m-featured-tile--${f.tone}`}
                onClick={() => nav(f.screen)}
              >
                <div className="m-featured-tile__img">
                  <img src={f.image} alt="" loading="lazy" />
                </div>
                <div className="m-featured-tile__body">
                  <span className="m-featured-tile__tag">{f.tag}</span>
                  <strong>{f.title}</strong>
                  <span>{f.subtitle}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="m-quick-grid">
            <button type="button" className="m-quick-tile" onClick={() => nav("events")}>
              <span className="m-quick-tile__icon m-quick-tile__icon--indigo"><IconCalendar size={18} /></span>
              <span>Събития</span>
            </button>
            <button type="button" className="m-quick-tile" onClick={() => nav("messages")}>
              <span className="m-quick-tile__icon m-quick-tile__icon--blue"><IconMessage size={18} /></span>
              <span>Съобщения</span>
            </button>
            <button type="button" className="m-quick-tile" onClick={() => nav("access")}>
              <span className="m-quick-tile__icon m-quick-tile__icon--green"><IconKey size={18} /></span>
              <span>Достъп</span>
            </button>
            <button type="button" className="m-quick-tile" onClick={() => nav("loyalty")}>
              <span className="m-quick-tile__icon m-quick-tile__icon--amber"><IconStar size={18} /></span>
              <span>Лоялност</span>
            </button>
          </div>

          <div className="m-section-label"><IconNews size={14} /> Новини</div>
          {MOBILE_NEWS.slice(1).map((n) => (
            <button
              key={n.id}
              type="button"
              className="m-card"
              onClick={() => nav("news-detail", "forward", n.id)}
            >
              <div className="m-card__img">
                <img src={n.image} alt="" loading="lazy" />
              </div>
              <div className="m-card__body">
                <span className="m-card__date">{n.date}</span>
                <strong>{n.title}</strong>
                <p>{n.excerpt}</p>
              </div>
              <IconChevronRight size={16} className="m-card__chev" />
            </button>
          ))}
        </div>
      );
    case "news-detail":
      return (
        <div className="m-screen">
          <BackBtn onClick={() => nav("home", "back")} />
          <div className="m-hero-img">
            <img src={activeNews.heroImage ?? activeNews.image} alt="" />
          </div>
          <h2 className="m-detail-title">{activeNews.title}</h2>
          <p className="m-detail-meta"><IconCalendar size={13} /> {activeNews.date}.2026 · {activeNews.category}</p>
          <p className="m-detail-text">{activeNews.excerpt} В двора на Emblema Residence - вход свободен за жители.</p>
        </div>
      );
    case "events":
      return (
        <div className="m-screen">
          <BackBtn onClick={() => nav("more", "back")} />
          <ScreenHeader title="Събития" icon={IconCalendar} />
          {MOBILE_EVENTS.map((e) => (
            <div key={e.id} className="m-list-item m-list-item--row m-list-item--event">
              <div className="m-event-thumb">
                <img src={e.image} alt="" loading="lazy" />
              </div>
              <div className="m-list-item__body">
                <strong>{e.title}</strong>
                <span>{e.date} · {e.time}</span>
                <span className="m-event-location">{e.location}</span>
              </div>
            </div>
          ))}
        </div>
      );
    case "sport":
      return (
        <div className="m-screen">
          <ScreenHeader title="Emblema Sport" icon={IconSport} />
          {SPORT_VENUES.map((v) => (
            <div key={v.id} className="m-card m-card--static">
              <div className="m-card__img">
                <img src={v.image} alt="" loading="lazy" />
              </div>
              <div className="m-card__body">
                <span className="m-card__date">{v.sport}</span>
                <strong>{v.name}</strong>
                <a href={`tel:${v.phone.replace(/\s/g, "")}`} className="m-link m-link--inline">
                  <IconPhone size={13} /> {v.phone}
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    case "loyalty":
      return (
        <div className="m-screen">
          <ScreenHeader title="Лоялност" icon={IconStar} />
          {PARTNERS.map((p) => {
            const PartnerIcon = PARTNER_ICONS[p.icon];
            return (
              <button key={p.id} type="button" className="m-card m-card--loyalty" onClick={() => nav("loyalty-qr")}>
                <div className="m-card__img">
                  <img src={p.image} alt="" loading="lazy" />
                </div>
                <div className="m-card__body">
                  <span className="m-card__date">{p.category}</span>
                  <strong>{p.name}</strong>
                  <span className="m-card__meta">Отстъпка {p.discount}</span>
                </div>
                <div className={`m-card__badge m-card__badge--${p.iconTone}`}>
                  {PartnerIcon && <PartnerIcon size={22} stroke={2} />}
                </div>
              </button>
            );
          })}
        </div>
      );
    case "loyalty-qr":
      return (
        <div className="m-screen m-screen--center">
          <BackBtn onClick={() => nav("loyalty", "back")} />
          <div className="m-qr">
            <div className="m-qr__code" />
            <p><IconStar size={14} /> Green Bistro · 15%</p>
          </div>
          <p className="m-detail-text">Покажи QR на партньора</p>
        </div>
      );
    case "radio":
      return <RadioScreen />;
    case "profile":
      return (
        <div className="m-screen">
          <BackBtn onClick={() => nav("more", "back")} />
          <div className="m-profile">
            <div className="m-avatar"><IconUser size={32} /></div>
            <h2>Иван Петров</h2>
            <p>ivan@email.com · Ап. 12A</p>
          </div>
          <div className="m-menu">
            <MenuRow icon={IconUser} label="Редактирай профил" onClick={() => {}} />
            <MenuRow icon={IconLock} label="Смени парола" onClick={() => {}} />
            <MenuRow icon={IconBuilding} label="Emblema Residence" onClick={() => {}} />
            <MenuRow icon={IconLogout} label="Изход" onClick={() => nav("welcome", "back")} tone="danger" />
          </div>
        </div>
      );
    case "access":
      return (
        <div className="m-screen">
          <BackBtn onClick={() => nav("more", "back")} />
          <ScreenHeader title="Моят достъп" icon={IconKey} />
          {MOBILE_ACCESS.map((a) => (
            <div key={a.id} className="m-access-card">
              <span className="m-access-card__icon"><IconBuilding size={20} /></span>
              <div>
                <strong>{a.building}</strong>
                <span>{a.entrance}</span>
              </div>
              {a.smartHome && (
                <button type="button" className="m-smart-btn"><IconSmartHome size={14} /> Smart Home</button>
              )}
            </div>
          ))}
        </div>
      );
    case "vehicles":
      return (
        <div className="m-screen">
          <BackBtn onClick={() => nav("more", "back")} />
          <ScreenHeader title="Автомобили" icon={IconCar} />
          {MOBILE_VEHICLES.map((v) => (
            <div key={v.id} className="m-list-item m-list-item--row">
              <span className="m-list-item__icon m-list-item__icon--blue"><IconCar size={18} /></span>
              <div className="m-list-item__body">
                <strong>{v.plate}</strong>
                <span>{v.status}</span>
              </div>
            </div>
          ))}
          <button type="button" className="m-fab"><IconCar size={16} /> Заяви нов номер</button>
        </div>
      );
    case "messages":
      return (
        <div className="m-screen">
          <BackBtn onClick={() => nav("more", "back")} />
          <ScreenHeader title="Съобщения" icon={IconMessage} />
          {MOBILE_MESSAGES.map((m) => {
            const MsgIcon = MESSAGE_ICONS[m.icon] ?? IconMessage;
            return (
              <button key={m.id} type="button" className={`m-msg ${m.unread ? "m-msg--unread" : ""}`}>
                <span className={`m-msg__badge m-msg__badge--${m.tone}`}>
                  <MsgIcon size={20} stroke={2} />
                </span>
                <span className="m-msg__body">
                  <strong>{m.title}</strong>
                  <p>{m.preview}</p>
                  <span className="m-msg__date">{m.date}</span>
                </span>
                {m.unread && <span className="m-msg__dot" aria-hidden="true" />}
                <IconChevronRight size={16} className="m-msg__chev" />
              </button>
            );
          })}
        </div>
      );
    case "notifications":
      return (
        <div className="m-screen">
          <BackBtn onClick={() => nav("home", "back")} />
          <ScreenHeader title="Известия" icon={IconBell} />
          <button type="button" className="m-msg m-msg--unread">
            <span className="m-msg__badge m-msg__badge--amber">
              <IconElevator size={20} stroke={2} />
            </span>
            <span className="m-msg__body">
              <strong>Ремонт на асансьор</strong>
              <p>22.06 · 09:00-12:00</p>
            </span>
            <span className="m-msg__dot" aria-hidden="true" />
            <IconChevronRight size={16} className="m-msg__chev" />
          </button>
          <button type="button" className="m-msg">
            <span className="m-msg__badge m-msg__badge--indigo">
              <IconCalendar size={20} stroke={2} />
            </span>
            <span className="m-msg__body">
              <strong>Ново събитие</strong>
              <p>Йога на покрива · 25 юни</p>
            </span>
            <IconChevronRight size={16} className="m-msg__chev" />
          </button>
        </div>
      );
    case "more":
      return (
        <div className="m-screen">
          <ScreenHeader title="Още" icon={IconMenu} />
          <div className="m-menu m-menu--card">
            <MenuRow icon={IconUser} label="Профил" onClick={() => nav("profile")} />
            <MenuRow icon={IconCalendar} label="Събития" onClick={() => nav("events")} />
            <MenuRow icon={IconKey} label="Моят достъп" onClick={() => nav("access")} />
            <MenuRow icon={IconCar} label="Автомобили" onClick={() => nav("vehicles")} />
            <MenuRow icon={IconMessage} label="Съобщения" onClick={() => nav("messages")} />
            <MenuRow icon={IconBell} label="Известия" onClick={() => nav("notifications")} />
          </div>
        </div>
      );
    default:
      return null;
  }
}

export default function MobileDemoPage() {
  const [screen, setScreen] = useState("welcome");
  const [transition, setTransition] = useState("none");
  const [selectedNewsId, setSelectedNewsId] = useState(MOBILE_NEWS[0].id);
  const prevScreen = useRef("welcome");

  const navigate = useCallback((to, dir, newsId) => {
    const type = getTransitionType(prevScreen.current, to, dir);
    if (newsId != null) setSelectedNewsId(newsId);
    setTransition(type);
    prevScreen.current = to;
    setScreen(to);
  }, []);

  const tab = useMemo(() => {
    if (["home", "news-detail", "notifications"].includes(screen)) return "home";
    if (screen === "sport") return "sport";
    if (["loyalty", "loyalty-qr"].includes(screen)) return "loyalty";
    if (screen === "radio") return "radio";
    return "more";
  }, [screen]);

  const onTab = (tabId) => {
    navigate(tabId, TAB_ROOTS.has(screen) ? undefined : "back");
  };

  const showTabs = !HIDE_TAB_SCREENS.has(screen);
  const isWelcome = screen === "welcome";

  return (
    <div className="demo-page demo-page--mobile demo-page--immersive">
      <a href="#/" className="demo-floating-back">← Оферта</a>
      <div className="demo-mobile-stage">
        <IphoneFrame>
          <div className={`m-app ${isWelcome ? "m-app--welcome" : ""}`}>
            {!isWelcome && <MobileStatusBar />}
            <div className={`m-app__body ${isWelcome ? "m-app__body--welcome" : ""} m-stack`}>
              <div className={`m-stack__layer m-stack__layer--${transition}`} key={screen}>
                <MobileScreen screen={screen} onNavigate={navigate} selectedNewsId={selectedNewsId} />
              </div>
            </div>
            {showTabs && <MobileTabBar active={tab} onChange={onTab} />}
          </div>
        </IphoneFrame>
      </div>
    </div>
  );
}
