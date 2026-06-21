function Icon({ children, size = 20, stroke = 2, className = "" }) {
  return (
    <svg
      className={`m-icon ${className}`.trim()}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function IconHome(props) {
  return (
    <Icon {...props}>
      <path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-9.5z" />
    </Icon>
  );
}

export function IconSport(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18M3 12h18" />
    </Icon>
  );
}

export function IconStar(props) {
  return (
    <Icon {...props}>
      <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21.1 7 14.2 2 9.3l6.9-1L12 2z" />
    </Icon>
  );
}

export function IconRadio(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="2" />
      <path d="M4.9 4.9a10 10 0 0 0 0 14.2M19.1 4.9a10 10 0 0 1 0 14.2M7.8 7.8a6 6 0 0 0 0 8.4M16.2 7.8a6 6 0 0 1 0 8.4" />
    </Icon>
  );
}

export function IconMenu(props) {
  return (
    <Icon {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Icon>
  );
}

export function IconBell(props) {
  return (
    <Icon {...props}>
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 8-3 8h18s-3-1-3-8" />
      <path d="M9.5 19a2.5 2.5 0 0 0 5 0" />
    </Icon>
  );
}

export function IconChevronLeft(props) {
  return (
    <Icon {...props}>
      <path d="m15 6-6 6 6 6" />
    </Icon>
  );
}

export function IconChevronRight(props) {
  return (
    <Icon {...props}>
      <path d="m9 6 6 6-6 6" />
    </Icon>
  );
}

export function IconUser(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 6.5-4 8-4s6.5 0 8 4" />
    </Icon>
  );
}

export function IconCalendar(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 11h18" />
    </Icon>
  );
}

export function IconKey(props) {
  return (
    <Icon {...props}>
      <circle cx="8" cy="15" r="4" />
      <path d="m11 12 9-9M16 5l3 3" />
    </Icon>
  );
}

export function IconCar(props) {
  return (
    <Icon {...props}>
      <path d="M5 17h2M17 17h2M3 12h18l-2-6H5L3 12z" />
      <path d="M5 12v5h14v-5" />
    </Icon>
  );
}

export function IconUtensils(props) {
  return (
    <Icon {...props}>
      <path d="M5 2v20M5 2c0 4 1.5 6 3 7" />
      <path d="M12 2v20" />
      <path d="M16 2v8a2 2 0 0 1-4 0V2" />
    </Icon>
  );
}

export function IconDumbbell(props) {
  return (
    <Icon {...props}>
      <path d="M6 5v14M18 5v14" />
      <path d="M3 8v8M21 8v8" />
      <path d="M6 12h12" />
    </Icon>
  );
}

export function IconParking(props) {
  return (
    <Icon {...props}>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M10 8h2.5a2 2 0 0 1 0 4H10V8z" />
      <path d="M10 8v8" />
    </Icon>
  );
}

export function IconElevator(props) {
  return (
    <Icon {...props}>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M12 7v10" />
      <path d="M9 10l3-3 3 3" />
      <path d="M9 14l3 3 3-3" />
    </Icon>
  );
}

export function IconMail(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </Icon>
  );
}

export function IconMessage(props) {
  return (
    <Icon {...props}>
      <path d="M21 12a8 8 0 0 1-8 8H7l-4 3V12a8 8 0 0 1 16 0z" />
    </Icon>
  );
}

export function IconBuilding(props) {
  return (
    <Icon {...props}>
      <path d="M4 21V5a1 1 0 0 1 1-1h5v16M15 21V9h4a1 1 0 0 1 1 1v11M9 7h1M9 11h1M9 15h1" />
    </Icon>
  );
}

export function IconPhone(props) {
  return (
    <Icon {...props}>
      <path d="M6.5 4h2l1.5 4-2 1.5a11 11 0 0 0 5 5L14.5 13 18 14.5V17a2 2 0 0 1-2 2A14 14 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </Icon>
  );
}

export function IconQr(props) {
  return (
    <Icon {...props}>
      <rect x="4" y="4" width="6" height="6" rx="1" />
      <rect x="14" y="4" width="6" height="6" rx="1" />
      <rect x="4" y="14" width="6" height="6" rx="1" />
      <path d="M14 14h2v2h-2zM18 18h2v2h-2zM14 18h2v2h-2zM18 14h2v2h-2z" />
    </Icon>
  );
}

export function IconPlay(props) {
  return (
    <Icon {...props}>
      <polygon points="8,5 19,12 8,19" fill="currentColor" stroke="none" />
    </Icon>
  );
}

export function IconNews(props) {
  return (
    <Icon {...props}>
      <path d="M4 5h16v14H4z" />
      <path d="M8 9h8M8 13h5" />
    </Icon>
  );
}

export function IconLock(props) {
  return (
    <Icon {...props}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </Icon>
  );
}

export function IconLogout(props) {
  return (
    <Icon {...props}>
      <path d="M10 17l-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h4l1 1M15 12H8M18 9l3 3-3 3" />
    </Icon>
  );
}

export function IconSmartHome(props) {
  return (
    <Icon {...props}>
      <path d="M4 11 12 4l8 7" />
      <path d="M6 10v9h12v-9" />
      <path d="M10 19v-4h4v4" />
    </Icon>
  );
}

export function IconSpark(props) {
  return (
    <Icon {...props}>
      <path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8" />
    </Icon>
  );
}

export function IconClock(props) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </Icon>
  );
}

export function IconLogin(props) {
  return (
    <Icon {...props}>
      <path d="M15 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4M10 12H3M7 8l-4 4 4 4" />
    </Icon>
  );
}

export function IconUserPlus(props) {
  return (
    <Icon {...props}>
      <circle cx="9" cy="8" r="4" />
      <path d="M2 20c1.5-4 5-4 7-4M19 8v6M16 11h6" />
    </Icon>
  );
}
