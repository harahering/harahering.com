// Shows /dayline/news.json on the news page. The app reads the same file, so a notice
// is written once (see README.md for the format).
(function () {
  const list = document.getElementById("news-list");

  function escapeHTML(text) {
    return text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
  }

  // The body is plain text: a blank line starts a paragraph, and [text](https://...) is a link.
  function renderBody(body) {
    return body
      .split(/\n{2,}/)
      .map((paragraph) => {
        const html = escapeHTML(paragraph)
          .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2">$1</a>')
          .replace(/\n/g, "<br>");
        return "<p>" + html + "</p>";
      })
      .join("");
  }

  function formatDate(date) {
    return date.replace(/-/g, ".");
  }

  fetch("/dayline/news.json", { cache: "no-cache" })
    .then((response) => {
      if (!response.ok) throw new Error(response.status);
      return response.json();
    })
    .then((data) => {
      const items = (data.items || []).slice().sort((a, b) => b.date.localeCompare(a.date));
      if (items.length === 0) {
        list.innerHTML = '<p class="news-empty">お知らせはまだありません。</p>';
        return;
      }
      list.innerHTML = items
        .map((item) => {
          const badge = item.important ? '<span class="badge">重要</span>' : "";
          return (
            '<article class="news-item" id="' + escapeHTML(item.id) + '">' +
            '<time datetime="' + escapeHTML(item.date) + '">' + escapeHTML(formatDate(item.date)) + "</time>" + badge +
            "<h2>" + escapeHTML(item.title) + "</h2>" +
            renderBody(item.body) +
            "</article>"
          );
        })
        .join("");
      // Ids start with a date, which a CSS selector cannot, so look them up by id.
      if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
    })
    .catch(() => {
      list.innerHTML = '<p class="news-empty">お知らせを読み込めませんでした。時間をおいて、もう一度開いてください。</p>';
    });
})();
