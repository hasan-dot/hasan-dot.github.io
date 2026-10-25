(() => {
  const archive = document.querySelector(".archive-page");
  if (!archive) return;

  const input = archive.querySelector("#archive-query");
  const status = archive.querySelector("#archive-status");
  const empty = archive.querySelector(".archive-empty");
  const years = [...archive.querySelectorAll(".archive-year")];
  const posts = [...archive.querySelectorAll(".writing-entry")].map((element) => ({
    element,
    text: element.dataset.search.toLocaleLowerCase()
  }));

  function filterPosts() {
    const query = input.value.trim().toLocaleLowerCase();
    const words = query.split(/\s+/).filter(Boolean);
    let matches = 0;

    posts.forEach(({ element, text }) => {
      element.hidden = !words.every((word) => text.includes(word));
      if (!element.hidden) matches += 1;
    });
    years.forEach((year) => {
      year.hidden = !year.querySelector(".writing-entry:not([hidden])");
    });

    const noun = query ? "result" : "post";
    status.textContent = `${matches} ${noun}${matches === 1 ? "" : "s"}`;
    empty.hidden = matches !== 0;
  }

  if (posts.length) archive.querySelector(".archive-search").hidden = false;
  input.addEventListener("input", filterPosts);
  input.addEventListener("search", filterPosts);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      input.value = "";
      filterPosts();
    }
  });
})();
