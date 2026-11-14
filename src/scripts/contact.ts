interface Turnstile {
  render(
    container: HTMLElement,
    options: {
      sitekey: string;
      action: string;
      theme: string;
      size: string;
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    },
  ): string;
  reset(id: string): void;
  remove(id: string): void;
}

const browser = window as Window & { turnstile?: Turnstile };
let loading: Promise<Turnstile> | undefined;
function loadTurnstile(): Promise<Turnstile> {
  if (browser.turnstile) return Promise.resolve(browser.turnstile);
  loading ??= new Promise<Turnstile>((resolve, reject) => {
    const script = document.createElement("script");
    const timer = window.setTimeout(() => {
      script.remove();
      reject(new Error("verification_unavailable"));
    }, 15_000);
    script.src =
      "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => {
      clearTimeout(timer);
      if (browser.turnstile) resolve(browser.turnstile);
      else reject(new Error("verification_unavailable"));
    };
    script.onerror = () => {
      clearTimeout(timer);
      script.remove();
      reject(new Error("verification_unavailable"));
    };
    document.head.appendChild(script);
  }).catch((error) => {
    loading = undefined;
    throw error;
  });
  return loading;
}

class PortfolioContact extends HTMLElement {
  private events?: AbortController;
  private widget?: string;

  connectedCallback() {
    this.events?.abort();
    const events = new AbortController();
    this.events = events;
    const { signal } = events;
    const form = this.querySelector<HTMLFormElement>("#contact-form")!;
    const submit = form.querySelector<HTMLButtonElement>(
      "button[type='submit']",
    )!;
    const status = this.querySelector<HTMLElement>("#contact-status")!;
    const verification = this.querySelector<HTMLElement>(
      "#contact-verification",
    )!;
    const success = this.querySelector<HTMLElement>("#success-message")!;
    let token = "";
    let busy = false;

    const refresh = () => {
      submit.disabled = busy || !token;
      submit.querySelector("span")!.textContent = busy
        ? "Sending…"
        : "Send message";
      form.setAttribute("aria-busy", String(busy));
      form
        .querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
          "input, textarea",
        )
        .forEach((field) => {
          field.disabled = busy;
        });
    };
    const showStatus = (message: string) => {
      status.textContent = message;
    };
    const resetToken = () => {
      token = "";
      if (this.widget !== undefined) browser.turnstile?.reset(this.widget);
      refresh();
    };

    form.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();
        if (busy || !token || !form.reportValidity()) return;
        const data = new FormData(form);
        const field = (name: string) => String(data.get(name) || "").trim();
        if (!field("name") || field("message").length < 20) {
          showStatus(
            "Enter your name and at least 20 characters about your project.",
          );
          return;
        }
        const payload = {
          name: field("name"),
          email: field("email"),
          subject: field("subject"),
          message: field("message"),
          website: field("website"),
          token,
        };
        busy = true;
        refresh();
        showStatus("");
        try {
          const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.any([signal, AbortSignal.timeout(45_000)]),
          });
          const result = await response.json();
          if (!response.ok || result.sent !== true) {
            showStatus(
              result.error === "verification_failed"
                ? "Complete the security check again, then retry. Your message is still here."
                : "Your message could not be sent. Try again or email me directly; your text is still here.",
            );
            return;
          }
          form.reset();
          form.classList.add("hidden");
          success.classList.remove("hidden");
          success.classList.add("flex");
          success.focus();
        } catch {
          if (!signal.aborted)
            showStatus(
              "I could not confirm delivery. Your text is still here. Check your connection or email me directly.",
            );
        } finally {
          busy = false;
          if (!signal.aborted) resetToken();
        }
      },
      { signal },
    );

    this.querySelector("#send-another")!.addEventListener(
      "click",
      () => {
        success.classList.add("hidden");
        success.classList.remove("flex");
        form.classList.remove("hidden");
        form.querySelector<HTMLInputElement>("#name")!.focus();
      },
      { signal },
    );

    this.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach(
      (button) => {
        button.addEventListener(
          "click",
          async () => {
            try {
              await navigator.clipboard.writeText(button.dataset.copy!);
              showStatus("Copied to clipboard.");
            } catch {
              showStatus(
                "Copy was unavailable. Select the email address or phone number to copy it.",
              );
            }
          },
          { signal },
        );
      },
    );

    const initialize = async () => {
      try {
        const response = await fetch("/api/contact/config", {
          signal: AbortSignal.any([signal, AbortSignal.timeout(10_000)]),
        });
        const config = await response.json();
        if (
          !response.ok ||
          typeof config.sitekey !== "string" ||
          !config.sitekey
        )
          throw new Error("unavailable");
        const turnstile = await loadTurnstile();
        if (signal.aborted) return;
        this.widget = turnstile.render(verification, {
          sitekey: config.sitekey,
          action: "contact",
          theme: "auto",
          size: "flexible",
          callback: (value) => {
            token = value;
            refresh();
            if (status.textContent?.includes("security check")) showStatus("");
          },
          "expired-callback": () => {
            token = "";
            refresh();
            showStatus("Complete the security check again before sending.");
          },
          "error-callback": () => {
            token = "";
            refresh();
            showStatus(
              "The security check failed. Retry it or email me directly.",
            );
          },
        });
      } catch {
        if (!signal.aborted)
          showStatus(
            "The contact form is temporarily unavailable. Please use the email link below.",
          );
      }
    };
    refresh();
    void initialize();
  }

  disconnectedCallback() {
    this.events?.abort();
    if (this.widget !== undefined) browser.turnstile?.remove(this.widget);
    this.widget = undefined;
  }
}

if (!customElements.get("portfolio-contact"))
  customElements.define("portfolio-contact", PortfolioContact);
