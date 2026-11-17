class HomeCarousel extends HTMLElement {
  private events?: AbortController;
  private resize?: ResizeObserver;
  private timer?: ReturnType<typeof setTimeout>;

  connectedCallback() {
    this.events?.abort();
    this.events = new AbortController();
    const { signal } = this.events;
    const track = this.querySelector<HTMLElement>("[data-track]");
    const slides = Array.from(
      this.querySelectorAll<HTMLElement>("[data-slide]"),
    );
    const status = this.querySelector<HTMLElement>("[data-status]");
    if (!track || !slides.length) return;
    const centered = this.dataset.align === "center";
    let pending: number | undefined;
    let settledIndex = Number(this.dataset.start || 0);
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

    const position = (slide: HTMLElement) => {
      const bounds = slide.getBoundingClientRect();
      const viewport = track.getBoundingClientRect();
      const offset = bounds.left - viewport.left + track.scrollLeft;
      return Math.max(
        0,
        Math.min(
          track.scrollWidth - track.clientWidth,
          centered ? offset - (track.clientWidth - bounds.width) / 2 : offset,
        ),
      );
    };
    const nearest = () =>
      slides.reduce(
        (best, slide, index) =>
          Math.abs(position(slide) - track.scrollLeft) <
          Math.abs(position(slides[best]) - track.scrollLeft)
            ? index
            : best,
        0,
      );
    const go = (index: number, instant = false) => {
      pending = index;
      track.scrollTo({
        left: position(slides[index]),
        behavior: instant || reducedMotion.matches ? "instant" : "smooth",
      });
    };
    const settle = () => {
      const index = nearest();
      if (
        pending !== undefined &&
        Math.abs(track.scrollLeft - position(slides[pending])) > 2
      )
        return;
      pending = undefined;
      if (index !== settledIndex && status)
        status.textContent = `Slide ${index + 1} of ${slides.length}`;
      settledIndex = index;
    };

    this.querySelectorAll<HTMLButtonElement>("[data-direction]").forEach(
      (button) => {
        button.addEventListener(
          "click",
          () => {
            const direction = button.dataset.direction === "next" ? 1 : -1;
            const index = pending ?? nearest();
            const currentPosition = position(slides[index]);
            const candidates = slides.map((slide, slideIndex) => ({
              slideIndex,
              offset: position(slide),
            }));
            const target =
              direction > 0
                ? candidates.find(
                    (candidate) => candidate.offset > currentPosition + 2,
                  )
                : candidates.findLast(
                    (candidate) => candidate.offset < currentPosition - 2,
                  );
            go(target?.slideIndex ?? (direction > 0 ? 0 : slides.length - 1));
          },
          { signal },
        );
      },
    );
    const supportsScrollEnd = "onscrollend" in document.createElement("div");
    if (supportsScrollEnd)
      track.addEventListener("scrollend", settle, { signal });
    else
      track.addEventListener(
        "scroll",
        () => {
          clearTimeout(this.timer);
          this.timer = setTimeout(settle, 150);
        },
        { passive: true, signal },
      );
    // A manual swipe takes over from an in-flight button navigation.
    track.addEventListener(
      "wheel",
      () => {
        pending = undefined;
      },
      { passive: true, signal },
    );
    track.addEventListener(
      "pointerdown",
      () => {
        pending = undefined;
      },
      { signal },
    );
    track.addEventListener(
      "keydown",
      () => {
        pending = undefined;
      },
      { signal },
    );
    this.resize = new ResizeObserver(() => go(settledIndex, true));
    this.resize.observe(track);
    requestAnimationFrame(() =>
      go(Math.min(settledIndex, slides.length - 1), true),
    );
  }

  disconnectedCallback() {
    this.events?.abort();
    this.resize?.disconnect();
    clearTimeout(this.timer);
  }
}

if (!customElements.get("home-carousel"))
  customElements.define("home-carousel", HomeCarousel);
