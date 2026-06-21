import "./Demo.css";

/** iPhone 15 Pro logical viewport: 393 × 852 pt */
export const IPHONE_WIDTH = 393;
export const IPHONE_HEIGHT = 852;

export function IphoneFrame({ children }) {
  return (
    <div className="iphone-stage">
      <div className="iphone-device">
        <div className="iphone-device__bezel">
          <div className="iphone-device__chrome iphone-device__island" aria-hidden="true" />
          <div className="iphone-device__screen">{children}</div>
          <div className="iphone-device__chrome iphone-device__home-indicator" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
