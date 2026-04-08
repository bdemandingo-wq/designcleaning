import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Ensures hash links like /#booking reliably scroll to the target element.
 * React Router doesn't automatically handle hash scrolling.
 */
const ScrollToHash = () => {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace(/^#/, "");
    if (!id) return;

    // Try a couple of times in case the element is rendered lazily.
    let tries = 0;
    const maxTries = 20; // ~2s

    const attempt = () => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      tries += 1;
      if (tries < maxTries) {
        window.setTimeout(attempt, 100);
      }
    };

    attempt();
  }, [location.pathname, location.hash]);

  return null;
};

export default ScrollToHash;
