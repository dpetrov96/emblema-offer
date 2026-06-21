function Icon({ children, size = 24, className = "" }) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

export function MockBrowserIcon(props) {
  return (
    <Icon {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3 8h18" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="6" cy="6" r="0.75" fill="currentColor" />
      <circle cx="8.5" cy="6" r="0.75" fill="currentColor" />
      <circle cx="11" cy="6" r="0.75" fill="currentColor" />
      <rect x="6" y="11" width="8" height="1.5" rx="0.75" fill="currentColor" opacity="0.55" />
      <rect x="6" y="14.5" width="12" height="1.5" rx="0.75" fill="currentColor" opacity="0.35" />
      <rect x="6" y="18" width="10" height="1.5" rx="0.75" fill="currentColor" opacity="0.35" />
    </Icon>
  );
}

export function MockPhoneIcon(props) {
  return (
    <Icon {...props}>
      <rect x="7" y="2" width="10" height="20" rx="2.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="9.5" y="4" width="5" height="1.5" rx="0.75" fill="currentColor" opacity="0.45" />
      <rect x="8.5" y="7" width="7" height="11" rx="1" fill="currentColor" opacity="0.2" />
      <circle cx="12" cy="20" r="0.9" fill="currentColor" opacity="0.55" />
    </Icon>
  );
}
