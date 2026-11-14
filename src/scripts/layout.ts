let cleanup: AbortController | undefined;

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
  document
    .querySelector("[data-theme-icon='sun']")
    ?.classList.toggle("hidden", !dark);
  document
    .querySelector("[data-theme-icon='moon']")
    ?.classList.toggle("hidden", dark);
  const toggle = document.getElementById("theme-toggle");
  toggle?.setAttribute("aria-pressed", String(dark));
  toggle?.setAttribute(
    "aria-label",
    dark ? "Switch to light theme" : "Switch to dark theme",
  );
}

function initializeLayout() {
  cleanup?.abort();
  cleanup = new AbortController();
  const { signal } = cleanup;
  let theme: string | null = null;
  try {
    theme = localStorage.getItem("theme");
  } catch {
    /* Storage may be disabled. */
  }
  applyTheme(
    theme
      ? theme === "dark"
      : matchMedia("(prefers-color-scheme: dark)").matches,
  );

  document.getElementById("theme-toggle")?.addEventListener(
    "click",
    () => {
      const dark = !document.documentElement.classList.contains("dark");
      applyTheme(dark);
      try {
        localStorage.setItem("theme", dark ? "dark" : "light");
      } catch {
        /* The toggle still works without persistence. */
      }
    },
    { signal },
  );

  const backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    const updateScroll = () => {
      const hidden = window.scrollY <= 300;
      for (const name of [
        "opacity-0",
        "pointer-events-none",
        "translate-y-4",
      ]) {
        backToTop.classList.toggle(name, hidden);
      }
      backToTop.tabIndex = hidden ? -1 : 0;
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true, signal });
    backToTop.addEventListener(
      "click",
      () => {
        window.scrollTo({
          top: 0,
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "instant"
            : "smooth",
        });
      },
      { signal },
    );
  }
}

document.addEventListener("astro:page-load", initializeLayout);
document.addEventListener("astro:before-swap", () => cleanup?.abort());
