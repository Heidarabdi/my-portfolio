import type { ProjectData } from "../types/project";

class ProjectArchive extends HTMLElement {
  private events?: AbortController;

  connectedCallback() {
    this.events?.abort();
    const events = new AbortController();
    this.events = events;
    const { signal } = events;
    const modal = this.querySelector<HTMLDialogElement>("#project-modal");
    if (!modal) return;

    const projects: ProjectData[] = JSON.parse(this.dataset.projects || "[]");
    let currentProject: ProjectData | undefined;
    let galleryIndex = 0;
    const image = modal.querySelector<HTMLImageElement>("#modal-img")!;
    const previous = modal.querySelector<HTMLButtonElement>("#prev-image")!;
    const next = modal.querySelector<HTMLButtonElement>("#next-image")!;

    const gallery = () =>
      currentProject?.gallery.length
        ? currentProject.gallery
        : [
            currentProject?.imageUrl ||
              "/images/portfolio/project-placeholder.svg",
          ];

    const updateImage = () => {
      const images = gallery();
      image.src = images[galleryIndex];
      image.alt = `${currentProject?.title}, image ${galleryIndex + 1} of ${images.length}`;
      modal.querySelector("#modal-img-counter")!.textContent =
        `IMG_${String(galleryIndex + 1).padStart(2, "0")} / ${String(images.length).padStart(2, "0")}`;
      previous.hidden = next.hidden = images.length < 2;
    };

    const moveImage = (offset: number) => {
      galleryIndex =
        (galleryIndex + offset + gallery().length) % gallery().length;
      updateImage();
    };

    const openProject = (id: string) => {
      currentProject = projects.find((project) => project.id === id);
      if (!currentProject) return;
      galleryIndex = 0;
      modal.querySelector("#modal-title")!.textContent = currentProject.title;
      modal.querySelector("#modal-desc")!.textContent =
        currentProject.longDescription || currentProject.description;
      const technologies = currentProject.technologies.map((technology) => {
        const badge = document.createElement("span");
        badge.className =
          "border-line-medium text-ink-muted border px-2 py-1 text-xs font-bold uppercase";
        badge.textContent = technology;
        return badge;
      });
      modal.querySelector("#modal-tech")!.replaceChildren(...technologies);
      const features = currentProject.features.map((feature) => {
        const item = document.createElement("li");
        item.className = "text-ink-muted list-disc ml-4 text-sm";
        item.textContent = feature;
        return item;
      });
      modal.querySelector("#modal-features-list")!.replaceChildren(...features);
      for (const [selector, url] of [
        ["#modal-live-link", currentProject.liveUrl],
        ["#modal-github-link", currentProject.githubUrl],
      ]) {
        const link = modal.querySelector<HTMLAnchorElement>(selector!)!;
        const available = Boolean(url && /^https?:\/\//i.test(url));
        link.classList.toggle("hidden", !available);
        link.classList.toggle("flex", available);
        if (available) link.href = url!;
        else link.removeAttribute("href");
      }
      updateImage();
      if (!modal.open) modal.showModal();
    };

    this.querySelectorAll<HTMLButtonElement>("[data-project-id]").forEach(
      (button) => {
        button.addEventListener(
          "click",
          () => openProject(button.dataset.projectId!),
          { signal },
        );
      },
    );
    modal
      .querySelector("#close-modal")!
      .addEventListener("click", () => modal.close(), { signal });
    previous.addEventListener("click", () => moveImage(-1), { signal });
    next.addEventListener("click", () => moveImage(1), { signal });
    modal.addEventListener(
      "close",
      () => {
        currentProject = undefined;
      },
      { signal },
    );
    modal.addEventListener(
      "keydown",
      (event) => {
        if (
          event.target instanceof Element &&
          event.target.closest("input, textarea, select, [contenteditable]")
        )
          return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          moveImage(event.key === "ArrowLeft" ? -1 : 1);
        }
      },
      { signal },
    );

    // Native light-dismiss is progressive enhancement; keep older browsers usable.
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      // Require both ends of a pointer gesture outside; a selection drag stays open.
      const outside = (event: PointerEvent) => {
        const bounds = modal.getBoundingClientRect();
        return (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        );
      };
      let pressedOutside = false;
      modal.addEventListener(
        "pointerdown",
        (event) => {
          pressedOutside = outside(event);
        },
        { signal },
      );
      modal.addEventListener(
        "pointerup",
        (event) => {
          if (pressedOutside && outside(event)) modal.close();
          pressedOutside = false;
        },
        { signal },
      );
    }

    const filters = this.querySelectorAll<HTMLButtonElement>(".filter-btn");
    filters.forEach((button, index) => {
      button.setAttribute("aria-pressed", String(index === 0));
      button.addEventListener(
        "click",
        () => {
          filters.forEach((filter) => {
            const active = filter === button;
            filter.setAttribute("aria-pressed", String(active));
            for (const name of [
              "active",
              "bg-ink",
              "text-paper",
              "border-ink",
              "hard-shadow-sm",
            ])
              filter.classList.toggle(name, active);
            for (const name of [
              "bg-paper-light",
              "text-stone-500",
              "border-line-medium",
            ])
              filter.classList.toggle(name, !active);
          });
          this.querySelectorAll<HTMLElement>(".project-card").forEach(
            (card) => {
              card.classList.toggle(
                "hidden",
                button.dataset.filter !== "All" &&
                  card.dataset.category !== button.dataset.filter,
              );
            },
          );
        },
        { signal },
      );
    });

    const openHash = () => {
      let id: string;
      try {
        id = decodeURIComponent(location.hash.slice(1));
      } catch {
        return;
      }
      if (id) openProject(id);
    };
    window.addEventListener("hashchange", openHash, { signal });
    openHash();
  }

  disconnectedCallback() {
    this.events?.abort();
  }
}

if (!customElements.get("project-archive")) {
  customElements.define("project-archive", ProjectArchive);
}
