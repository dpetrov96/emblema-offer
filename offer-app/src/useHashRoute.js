import { useEffect, useState } from "react";

function readHashRoute() {
  const hash = window.location.hash.replace(/^#/, "");
  return hash || "/";
}

export function useHashRoute() {
  const [route, setRoute] = useState(readHashRoute);

  useEffect(() => {
    const onChange = () => setRoute(readHashRoute());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return route;
}

export function demoHref(path) {
  return `#${path}`;
}
