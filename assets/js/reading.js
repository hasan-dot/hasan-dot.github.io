(() => {
  const body = document.querySelector(".article-body");
  if (!body) return;

  const contents = document.querySelector(".article-toc");
  const headings = body.querySelectorAll("h2[id], h3[id]");
  if (contents && headings.length) {
    const list = contents.querySelector("ol");
    headings.forEach((heading) => {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = `#${encodeURIComponent(heading.id)}`;
      link.textContent = heading.querySelector("span")?.textContent || heading.textContent;
      if (heading.tagName === "H3") item.className = "toc-subheading";
      item.append(link);
      list.append(item);
    });
    contents.hidden = false;
  }

  body.querySelectorAll(".anchor").forEach((anchor) => {
    const title = anchor.parentElement.querySelector("span")?.textContent || "section";
    anchor.setAttribute("aria-label", `Link to ${title}`);
  });

  body.querySelectorAll("img[data-src]").forEach((image) => {
    image.loading = "lazy";
    image.src = image.dataset.src;
  });

  body.querySelectorAll("video").forEach((video) => {
    video.controls = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.autoplay = false;
      video.pause();
    }
  });

  if (window.GLightbox) {
    window.GLightbox({
      selector: ".article-body .popup, .article-cover .popup",
      openEffect: "none",
      closeEffect: "none",
      slideEffect: "none"
    });
  }

  function enableCopy(button, text, label) {
    if (!button) return;
    if (!navigator.clipboard?.writeText) {
      button.hidden = true;
      return;
    }
    button.type = "button";
    button.textContent = label;
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-live", "polite");
    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(text());
        button.textContent = button.dataset.titleSucceed || "Copied!";
      } catch {
        button.textContent = "Unable to copy";
      }
      window.setTimeout(() => { button.textContent = label; }, 2500);
    });
  }

  body.querySelectorAll(".code-header").forEach((header) => {
    const code = header.nextElementSibling;
    enableCopy(
      header.querySelector("button"),
      () => (code.querySelector(".rouge-code") || code.querySelector("code") || code).textContent,
      "Copy code"
    );
  });

  enableCopy(
    document.querySelector("#copy-link"),
    () => document.querySelector('link[rel="canonical"]').href,
    "Copy link"
  );
})();
