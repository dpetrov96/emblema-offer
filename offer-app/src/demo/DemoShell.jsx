import "./Demo.css";

/** iPhone 15 Pro logical viewport: 393 × 852 pt */
export const IPHONE_WIDTH = 393;
export const IPHONE_HEIGHT = 852;

export function IphoneFrame({ children }) {
  return (
    <div className="iphone-stage">
      <div className="iphone-device">
        <div className="iphone-device__bezel">
          <div className="iphone-device__island" />
          <div className="iphone-device__screen">{children}</div>
          <div className="iphone-device__home-indicator" />
        </div>
      </div>
    </div>
  );
}

export function DemoBackLink() {
  return (
    <a href="#/" className="demo-back">
      ← Към офертата
    </a>
  );
}

export function DemoBadge() {
  return <span className="demo-badge">Mock · без backend</span>;
}
