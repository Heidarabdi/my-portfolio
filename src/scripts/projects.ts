import type { ProjectData } from "../types/project";
class ProjectArchive extends HTMLElement {
  private events?: AbortController;
  connectedCallback() {
    this.events?.abort();
    this.events = new AbortController();
    const { signal } = this.events;
    const modal = this.querySelector<HTMLDialogElement>("#project-modal");
    if (!modal) return;
    const projects: ProjectData[] = JSON.parse(this.dataset.projects || "[]");
    let project: ProjectData | undefined;
    let galleryIndex = 0;
    let opener: HTMLButtonElement | undefined;
    const image = modal.querySelector<HTMLImageElement>("#modal-img")!;
    const previous = modal.querySelector<HTMLButtonElement>("#prev-image")!;
    const next = modal.querySelector<HTMLButtonElement>("#next-image")!;
    const gallery = () =>
      project?.gallery.length
        ? project.gallery
        : [project?.imageUrl || "/images/portfolio/project-placeholder.svg"];
    const updateImage = () => {
      image.src = gallery()[galleryIndex];
      image.alt = `${project?.title}, ${project?.imageNote?.toLowerCase() || "project preview"}`;
      modal.querySelector("#modal-img-counter")!.textContent =
        `${galleryIndex + 1} / ${gallery().length}`;
      previous.hidden = next.hidden = gallery().length < 2;
    };
    const moveImage = (offset: number) => {
      galleryIndex =
        (galleryIndex + offset + gallery().length) % gallery().length;
      updateImage();
    };
    const openProject = (id: string, trigger?: HTMLButtonElement) => {
      project = projects.find((item) => item.id === id);
      if (!project) return;
      opener = trigger;
      galleryIndex = 0;
      modal.querySelector("#modal-title")!.textContent = project.title;
      modal.querySelector("#modal-desc")!.textContent =
        project.longDescription || project.description;
      modal.querySelector("#modal-category")!.textContent = project.category;
      modal.querySelector("#modal-meta")!.textContent = [
        project.client,
        project.year,
      ]
        .filter(Boolean)
        .join(" / ");
      modal.querySelector("#modal-image-note")!.textContent =
        project.imageNote || "Project illustration";
      modal.querySelector("#modal-tech")!.replaceChildren(
        ...project.technologies.map((text) => {
          const el = document.createElement("span");
          el.textContent = text;
          return el;
        }),
      );
      modal.querySelector("#modal-features-list")!.replaceChildren(
        ...project.features.map((text) => {
          const el = document.createElement("li");
          el.textContent = text;
          return el;
        }),
      );
      for (const [selector, url] of [
        ["#modal-live-link", project.liveUrl],
        ["#modal-github-link", project.githubUrl],
      ]) {
        const link = modal.querySelector<HTMLAnchorElement>(selector!)!;
        const valid = Boolean(url && /^https?:\/\//i.test(url));
        link.hidden = !valid;
        if (valid) link.href = url!;
        else link.removeAttribute("href");
      }
      updateImage();
      if (!modal.open) modal.showModal();
    };
    this.querySelectorAll<HTMLButtonElement>("[data-project-id]").forEach(
      (button) =>
        button.addEventListener(
          "click",
          () => openProject(button.dataset.projectId!, button),
          { signal },
        ),
    );
    modal
      .querySelector("#close-modal")!
      .addEventListener("click", () => modal.close(), { signal });
    previous.addEventListener("click", () => moveImage(-1), { signal });
    next.addEventListener("click", () => moveImage(1), { signal });
    modal.addEventListener(
      "close",
      () => {
        project = undefined;
        opener?.focus();
      },
      { signal },
    );
    modal.addEventListener(
      "keydown",
      (event) => {
        if (
          event.target instanceof Element &&
          event.target.closest("input,textarea,select,[contenteditable]")
        )
          return;
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          moveImage(event.key === "ArrowLeft" ? -1 : 1);
        }
      },
      { signal },
    );
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      const outside = (event: PointerEvent) => {
        const r = modal.getBoundingClientRect();
        return (
          event.clientX < r.left ||
          event.clientX > r.right ||
          event.clientY < r.top ||
          event.clientY > r.bottom
        );
      };
      let pressed = false;
      modal.addEventListener(
        "pointerdown",
        (event) => {
          pressed = outside(event);
        },
        { signal },
      );
      modal.addEventListener(
        "pointerup",
        (event) => {
          if (pressed && outside(event)) modal.close();
          pressed = false;
        },
        { signal },
      );
    }
    const filters = this.querySelectorAll<HTMLButtonElement>("[data-filter]");
    filters.forEach((button) =>
      button.addEventListener(
        "click",
        () => {
          this.dataset.filtered = String(button.dataset.filter !== "All");
          filters.forEach((filter) =>
            filter.setAttribute("aria-pressed", String(filter === button)),
          );
          let count = 0;
          this.querySelectorAll<HTMLElement>(".project-card").forEach(
            (card) => {
              card.hidden =
                button.dataset.filter !== "All" &&
                card.dataset.category !== button.dataset.filter;
              if (!card.hidden) count++;
            },
          );
          const status = this.querySelector("[data-result-count]");
          if (status)
            status.textContent =
              button.dataset.filter === "All"
                ? `Showing all ${count} projects`
                : `${count} ${count === 1 ? "project" : "projects"} in ${button.dataset.filter}`;
        },
        { signal },
      ),
    );
    const openHash = () => {
      try {
        const id = decodeURIComponent(location.hash.slice(1));
        if (id) openProject(id);
      } catch {
        return;
      }
    };
    window.addEventListener("hashchange", openHash, { signal });
    openHash();
  }
  disconnectedCallback() {
    this.events?.abort();
  }
}
if (!customElements.get("project-archive"))
  customElements.define("project-archive", ProjectArchive);
