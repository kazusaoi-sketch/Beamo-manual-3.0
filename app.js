/* ---------- constants ---------- */
const AXIS_VALUES = {
  version: ["3.0", "2.0"],
  platform: ["aos", "ios", "web"],
  feature: ["getting-started", "survey", "3d-workspace", "admin", "whats-new", "appendix"],
  user: ["all", "super-admin", "site-manager", "team-admin", "surveyor", "collaborator"],
  step: ["1", "2", "3", "4"]
};
const AXIS_ORDER = ["feature", "step", "version", "platform", "user"];
/* simple single-color line icons (currentColor) replacing the old emoji set */
const AXIS_ICON_SVG = {
  version: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M10 3h5.5a1.5 1.5 0 0 1 1.5 1.5V10L9.5 17.5a1.5 1.5 0 0 1-2.12 0L3 13.12a1.5 1.5 0 0 1 0-2.12L10 3Z" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="13" cy="7" r="1.1" fill="currentColor" stroke="none"/></svg>',
  platform: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><rect x="2.5" y="4" width="15" height="10" rx="1.5" stroke-width="1.6"/><path d="M7 17.5h6M10 14v3.5" stroke-width="1.6" stroke-linecap="round"/></svg>',
  feature: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><rect x="2.5" y="2.5" width="6" height="6" rx="1.2" stroke-width="1.6"/><rect x="11.5" y="2.5" width="6" height="6" rx="1.2" stroke-width="1.6"/><rect x="2.5" y="11.5" width="6" height="6" rx="1.2" stroke-width="1.6"/><rect x="11.5" y="11.5" width="6" height="6" rx="1.2" stroke-width="1.6"/></svg>',
  user: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><circle cx="10" cy="6.5" r="3.3" stroke-width="1.6"/><path d="M3.5 17c0-3.4 3-5.5 6.5-5.5s6.5 2.1 6.5 5.5" stroke-width="1.6" stroke-linecap="round"/></svg>',
  step: '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><path d="M3 17v-3.5h3.5V17M8.5 17V9.5H12V17M13.5 17V5h3.5v12" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
};
const MANUAL_VIDEO_KEY = "qm-manual-video";
const MANUAL_VIDEO_ICON_SVG = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><circle cx="10" cy="10" r="7.5" stroke-width="1.6"/><path d="M8.2 7.2 13 10l-4.8 2.8V7.2Z" fill="currentColor" stroke="none"/></svg>';
const SOCIAL_ICON_SVG = {
  LinkedIn: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.5h4V23h-4V8.5zM8.5 8.5h3.83v2h.05c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.79 2.66 4.79 6.11V23h-4v-6.9c0-1.64-.03-3.76-2.29-3.76-2.29 0-2.64 1.79-2.64 3.64V23h-4V8.5z"/></svg>',
  YouTube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.5v-7l6.4 3.5-6.4 3.5z"/></svg>',
  Instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2.5" y="2.5" width="19" height="19" rx="5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.6" cy="6.4" r="1" fill="currentColor" stroke="none"/></svg>',
  Facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M15.12 8.5H17V5.14C16.67 5.1 15.55 5 14.24 5c-2.73 0-4.6 1.66-4.6 4.7V12H6.6v3.5h3.04V23h3.62v-7.5h3.04L17 12h-3.74v-1.94c0-1 .27-1.56 1.86-1.56z"/></svg>',
  X: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.9 10.5 21.3 2h-1.8l-6.4 7.4L8 2H2l7.8 11.3L2 22h1.8l6.8-7.9L16 22h6L13.9 10.5zm-2.4 2.8-.8-1.1L4.4 3.3h2.7l5 7.2.8 1.1 6.6 9.4h-2.7l-5.3-7.7z"/></svg>'
};
const SHARE_ICON_SVG = '<svg viewBox="0 0 20 20" fill="none" stroke="currentColor"><circle cx="15" cy="4.5" r="2.2" stroke-width="1.6"/><circle cx="5" cy="10" r="2.2" stroke-width="1.6"/><circle cx="15" cy="15.5" r="2.2" stroke-width="1.6"/><path d="M6.9 8.8l6.2-3.2M6.9 11.2l6.2 3.2" stroke-width="1.6" stroke-linecap="round"/></svg>';

const state = {
  lang: "ko",
  axis: "version",
  value: null,
  articleKey: null,
  searchMode: false,
  searchQuery: "",
  browsing: false,
  quickManualKey: null
};

/* ---------- helpers ---------- */
function t() { return UI[state.lang]; }

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function stripHtml(html) {
  return String(html || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

/* ---------- search: fuzzy/typo-tolerant, relevance-ranked, with highlighted snippets ---------- */
const TOKEN_SPLIT_RE = /[\s,.!?()·""''`:;/\\|[\]{}<>]+/;

function tokenize(text) {
  return text.split(TOKEN_SPLIT_RE).filter(Boolean);
}

function levenshtein(a, b) {
  if (a === b) return 0;
  const al = a.length, bl = b.length;
  if (al === 0) return bl;
  if (bl === 0) return al;
  let prev = new Array(bl + 1);
  let curr = new Array(bl + 1);
  for (let j = 0; j <= bl; j++) prev[j] = j;
  for (let i = 1; i <= al; i++) {
    curr[0] = i;
    for (let j = 1; j <= bl; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      curr[j] = Math.min(curr[j - 1] + 1, prev[j] + 1, prev[j - 1] + cost);
    }
    [prev, curr] = [curr, prev];
  }
  return prev[bl];
}

// how many edits count as "close enough" for a typo, scaled by word length
// (mirrors common search-engine "auto fuzziness" scaling: very short tokens are
// too ambiguous for edit-distance matching, so require an exact hit instead)
function fuzzyTolerance(len) {
  if (len <= 2) return 0;
  if (len <= 5) return 1;
  if (len <= 9) return 2;
  return 3;
}

function countOccurrences(hay, needle) {
  if (!needle) return 0;
  let count = 0, pos = 0;
  while (true) {
    const idx = hay.indexOf(needle, pos);
    if (idx === -1) break;
    count++;
    pos = idx + needle.length;
  }
  return count;
}

// exact substring match first; falls back to nearest-word edit-distance match
// so near-miss/typo'd search terms still surface relevant docs
function bestTokenMatch(token, textLower, wordsLower) {
  const occurrences = countOccurrences(textLower, token);
  if (occurrences > 0) return { type: "exact", occurrences };
  const tol = fuzzyTolerance(token.length);
  if (tol === 0) return { type: "none" };
  let bestWord = null, bestDist = Infinity;
  for (const w of wordsLower) {
    if (Math.abs(w.length - token.length) > tol) continue;
    const d = levenshtein(token, w);
    if (d < bestDist) { bestDist = d; bestWord = w; }
    if (bestDist === 0) break;
  }
  if (bestWord !== null && bestDist <= tol) {
    return { type: "fuzzy", occurrences: 1, matchedWord: bestWord };
  }
  return { type: "none" };
}

function highlightTerms(text, tokens) {
  const escaped = [...new Set(tokens)]
    .filter(t => t.length >= 2)
    .sort((a, b) => b.length - a.length)
    .map(t => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  if (!escaped.length) return escapeHtml(text);
  const re = new RegExp("(" + escaped.join("|") + ")", "gi");
  return text.split(re).map((part, i) => (i % 2 === 1 ? `<mark>${escapeHtml(part)}</mark>` : escapeHtml(part))).join("");
}

function buildSnippet(bodyPlain, pos, tokens, radius = 60) {
  let snippet, prefixEllipsis = false, suffixEllipsis = false;
  if (pos === -1) {
    snippet = bodyPlain.length > 120 ? bodyPlain.slice(0, 120) : bodyPlain;
    suffixEllipsis = bodyPlain.length > 120;
  } else {
    const start = Math.max(0, pos - radius);
    const end = Math.min(bodyPlain.length, pos + radius);
    snippet = bodyPlain.slice(start, end);
    prefixEllipsis = start > 0;
    suffixEllipsis = end < bodyPlain.length;
  }
  const highlighted = highlightTerms(snippet, tokens);
  return (prefixEllipsis ? "…" : "") + highlighted + (suffixEllipsis ? "…" : "");
}

function searchArticles(query) {
  const tokens = tokenize(query.toLowerCase());
  if (!tokens.length) return [];

  const results = [];
  for (const a of ARTICLES) {
    const c = a.i18n[state.lang] || a.i18n.en;
    const titleLower = c.title.toLowerCase();
    const bodyPlain = stripHtml(c.html);
    const bodyLower = bodyPlain.toLowerCase();
    const titleWords = tokenize(titleLower);
    const bodyWords = tokenize(bodyLower);

    let rawScore = 0;
    let matchedCount = 0;
    let snippetPos = -1;

    const highlightWords = new Set(tokens);

    for (const token of tokens) {
      const titleMatch = bestTokenMatch(token, titleLower, titleWords);
      const bodyMatch = bestTokenMatch(token, bodyLower, bodyWords);

      let tokenScore = 0;
      if (titleMatch.type === "exact") tokenScore += 12;
      else if (titleMatch.type === "fuzzy") { tokenScore += 6; highlightWords.add(titleMatch.matchedWord); }

      if (bodyMatch.type === "exact") tokenScore += 3 + Math.min(bodyMatch.occurrences, 5);
      else if (bodyMatch.type === "fuzzy") { tokenScore += 2; highlightWords.add(bodyMatch.matchedWord); }

      if (tokenScore > 0) {
        matchedCount++;
        if (snippetPos === -1) {
          const term = bodyMatch.type === "exact" ? token : bodyMatch.matchedWord;
          const idx = term ? bodyLower.indexOf(term) : -1;
          if (idx !== -1) snippetPos = idx;
        }
      }
      rawScore += tokenScore;
    }

    if (rawScore === 0) continue;
    // full-coverage matches (all query words found) rank well above partial ones
    const coverage = matchedCount / tokens.length;
    const score = rawScore * (0.4 + 0.6 * coverage);

    results.push({ article: a, score, matchedTokens: [...highlightWords], snippetPos, bodyPlain });
  }

  results.sort((x, y) => y.score - x.score);
  return results;
}

function matchesAxisValue(article, axis, value) {
  switch (axis) {
    case "version":
      return article.version === value;
    case "platform":
      return article.platform.includes(value);
    case "feature":
      return article.feature === value;
    case "user":
      if (article.feature === "appendix") return false;
      return article.user.includes(value) || (value !== "all" && article.user.includes("all"));
    case "step":
      return String(article.step) === value;
    default:
      return false;
  }
}

function getArticlesFor(axis, value) {
  return ARTICLES
    .filter(a => matchesAxisValue(a, axis, value))
    .sort((a, b) => {
      if (a.version !== b.version) return a.version === "3.0" ? -1 : 1;
      return (a.order || 0) - (b.order || 0);
    });
}

function valueLabel(axis, value) {
  return (t().values[axis] && t().values[axis][value]) || value;
}

function articleBadge(article) {
  const v = valueLabel("version", article.version);
  const f = valueLabel("feature", article.feature);
  return `${v} · ${f}`;
}

function getArticleByKey(key) {
  return ARTICLES.find(a => a.key === key);
}

function snippetFor(article) {
  const c = article.i18n[state.lang] || article.i18n.en;
  const plain = stripHtml(c.html);
  return plain.length > 120 ? plain.slice(0, 120) + "…" : plain;
}

/* ---------- render: header / hero / footer ---------- */
function renderHeader() {
  document.getElementById("site-name").innerHTML =
    state.lang === "ko"
      ? `Beamo <span>매뉴얼</span>`
      : state.lang === "ja"
      ? `Beamo <span>マニュアル</span>`
      : `Beamo <span>Manual</span>`;
  document.getElementById("portal-btn-label").textContent = t().portalBtn;
  const plansLabelEl = document.getElementById("plans-btn-label");
  if (plansLabelEl) plansLabelEl.textContent = t().plansBtn;
  const plansBtnEl = document.getElementById("plans-btn");
  if (plansBtnEl) plansBtnEl.href = `plans.html?lang=${state.lang}`;
  document.querySelectorAll(".lang-switch button").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === state.lang);
  });
}

/* types the placeholder out character by character; re-typing is skipped if
   this input is already showing (or mid-typing) the same text, so repeated
   renderAll() calls (e.g. every keystroke commit) don't restart the effect */
function typePlaceholder(el, text, speed) {
  if (el.dataset.typedText === text) return;
  el.dataset.typedText = text;
  clearInterval(el._typeInterval);
  let i = 0;
  el.placeholder = "";
  el._typeInterval = setInterval(() => {
    i++;
    el.placeholder = text.slice(0, i) + (i < text.length ? "▏" : "");
    if (i >= text.length) clearInterval(el._typeInterval);
  }, speed || 65);
}

function renderHero() {
  document.getElementById("hero-label").textContent = t().heroLabel;
  document.getElementById("hero-title").textContent = t().heroTitle;
  document.getElementById("hero-subtitle").textContent = t().heroSubtitle;

  // defensive lookups: a stale cached HTML/JS pair (e.g. right after a deploy,
  // while the CDN still serves mismatched files to different requests) should
  // degrade gracefully instead of throwing and blanking out everything below
  // the hero (tabs/breadcrumb/results), which never gets a chance to render
  // once an uncaught exception stops renderAll() partway through.
  const heroSubmitBtn = document.getElementById("hero-search-submit-btn");
  const floatingSubmitBtn = document.getElementById("floating-search-submit-btn");
  if (heroSubmitBtn) heroSubmitBtn.textContent = t().searchBtn;
  if (floatingSubmitBtn) floatingSubmitBtn.textContent = t().searchBtn;

  const heroInput = document.getElementById("hero-search-input");
  const floatingInput = document.getElementById("floating-search-input");
  if (heroInput) {
    typePlaceholder(heroInput, t().heroSearchPlaceholder);
    if (document.activeElement !== heroInput) heroInput.value = state.searchQuery;
  }
  if (floatingInput) {
    typePlaceholder(floatingInput, t().heroSearchPlaceholder);
    if (document.activeElement !== floatingInput) floatingInput.value = state.searchQuery;
  }
}

/* ---------- compact hero once the user starts browsing ---------- */
function updateBrowsingMode() {
  document.body.classList.toggle("browsing", state.browsing);
}

function renderFooter() {
  const linksEl = document.getElementById("footer-links");
  const BEAMO_HOME_INDEX = 0; // "Beamo 홈페이지" / "Beamo Website" / "Beamo ウェブサイト" — same position in every language array
  const BEAMO_HOME_URL = "https://www.beamo.ai/";
  const ABOUT_US_INDEX = 1; // "회사 소개" / "About Us" / "会社概要" — same position in every language array
  const ABOUT_US_URL = "https://3i.ai/";
  const CONTACT_INDEX = 2; // "문의하기" / "Contact" / "お問い合わせ" — same position in every language array
  linksEl.innerHTML = t().footerLinks.map((l, i) => {
    if (i === BEAMO_HOME_INDEX) {
      return `<a href="${BEAMO_HOME_URL}" target="_blank" rel="noopener">${escapeHtml(l)}</a>`;
    }
    if (i === ABOUT_US_INDEX) {
      return `<a href="${ABOUT_US_URL}" target="_blank" rel="noopener">${escapeHtml(l)}</a>`;
    }
    if (i === CONTACT_INDEX) {
      const url = CONTACT_URL[state.lang] || CONTACT_URL.en;
      return `<a href="${url}" target="_blank" rel="noopener">${escapeHtml(l)}</a>`;
    }
    return `<button type="button">${escapeHtml(l)}</button>`;
  }).join("");

  const socialEl = document.getElementById("footer-social");
  socialEl.innerHTML = SOCIAL_LINKS.map(s =>
    `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${escapeHtml(s.name)}" class="social-link">${SOCIAL_ICON_SVG[s.name]}</a>`
  ).join("");

  document.getElementById("footer-copy").textContent = t().footerCopy;
}

function renderSectionHead() {
  document.getElementById("browse-eng").textContent = t().browseByEng;
  document.getElementById("browse-title").textContent = t().browseByTitle;
  document.getElementById("browse-desc").textContent = t().browseByDesc;
}

/* ---------- render: quick manual CTA row ---------- */
function renderQuickManualRow() {
  const surveyorTitleEl = document.getElementById("qm-surveyor-title");
  const surveyorSubEl = document.getElementById("qm-surveyor-sub");
  const adminTitleEl = document.getElementById("qm-admin-title");
  const adminSubEl = document.getElementById("qm-admin-sub");
  if (surveyorTitleEl) surveyorTitleEl.textContent = t().quickManualTitle;
  if (surveyorSubEl) surveyorSubEl.textContent = t().quickManualSurveyorSub;
  if (adminTitleEl) adminTitleEl.textContent = t().quickManualTitle;
  if (adminSubEl) adminSubEl.textContent = t().quickManualAdminSub;

  document.querySelectorAll(".qm-btn").forEach(btn => {
    btn.classList.toggle("active", state.quickManualKey === btn.dataset.key);
  });
}

/* ---------- render: tabs / breadcrumb ---------- */
function renderTabs() {
  const tabsEl = document.getElementById("tabs");
  if (state.quickManualKey) {
    tabsEl.innerHTML = "";
    tabsEl.style.display = "none";
    return;
  }
  tabsEl.style.display = "";
  const axisTabsHtml = AXIS_ORDER.map(axis => {
    const active = state.browsing && state.axis === axis && !state.searchMode ? "active" : "";
    const ax = t().axes[axis];
    return `<button type="button" class="tab-btn ${active}" data-axis="${axis}">
      <span class="tab-icon">${AXIS_ICON_SVG[axis]}</span>
      <span class="tab-content">
        <span class="tab-title">${escapeHtml(ax.label)}</span>
        <span class="tab-sub">${escapeHtml(ax.sub)}</span>
      </span>
    </button>`;
  }).join("");

  // "매뉴얼 영상" isn't a real browsable axis (no chip-list of values) — it's a
  // single fixed destination, styled like the other 5 cards but wired like the
  // "빠른 매뉴얼" buttons (gotoArticle directly, quickManual:true).
  const videoTileHtml = `<button type="button" class="tab-btn" data-video-card="true">
    <span class="tab-icon">${MANUAL_VIDEO_ICON_SVG}</span>
    <span class="tab-content">
      <span class="tab-title">${escapeHtml(t().manualVideoTitle)}</span>
      <span class="tab-sub">${escapeHtml(t().manualVideoSub)}</span>
    </span>
  </button>`;

  tabsEl.innerHTML = axisTabsHtml + videoTileHtml;

  tabsEl.querySelectorAll(".tab-btn[data-axis]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.axis = btn.dataset.axis;
      state.value = null;
      state.articleKey = null;
      state.searchMode = false;
      state.browsing = true;
      renderAll();
    });
  });

  const videoBtn = tabsEl.querySelector("[data-video-card]");
  if (videoBtn) {
    videoBtn.addEventListener("click", () => {
      state.browsing = true;
      gotoArticle(MANUAL_VIDEO_KEY, { quickManual: true });
    });
  }
}

function renderBreadcrumb() {
  const el = document.getElementById("breadcrumb");
  const parts = [`<b data-goto="home">${escapeHtml(t().home)}</b>`];

  if (state.searchMode) {
    parts.push(`<span class="crumb-current">${escapeHtml(t().searchResultsFor)}: "${escapeHtml(state.searchQuery)}"</span>`);
  } else {
    const ax = t().axes[state.axis];
    if (state.value === null) {
      parts.push(`<span class="crumb-current">${escapeHtml(ax.label)}</span>`);
    } else if (!state.articleKey) {
      parts.push(`<b data-goto="axis">${escapeHtml(ax.label)}</b>`);
      parts.push(`<span class="crumb-current">${escapeHtml(valueLabel(state.axis, state.value))}</span>`);
    } else {
      const article = getArticleByKey(state.articleKey);
      const c = article ? (article.i18n[state.lang] || article.i18n.en) : null;
      parts.push(`<b data-goto="axis">${escapeHtml(ax.label)}</b>`);
      parts.push(`<b data-goto="value">${escapeHtml(valueLabel(state.axis, state.value))}</b>`);
      parts.push(`<span class="crumb-current">${escapeHtml(c ? c.title : "")}</span>`);
    }
  }
  el.innerHTML = parts.join(`<span>›</span>`);

  el.querySelectorAll("[data-goto]").forEach(elm => {
    elm.addEventListener("click", () => {
      const kind = elm.dataset.goto;
      if (kind === "home") resetToHome();
      else if (kind === "axis") { state.value = null; state.articleKey = null; state.quickManualKey = null; renderAll(); }
      else if (kind === "value") { state.articleKey = null; state.quickManualKey = null; renderAll(); }
    });
  });
}

/* ---------- render: chip list ---------- */
function renderChipList() {
  const el = document.getElementById("chip-list");
  if (state.searchMode) { el.innerHTML = ""; return; }

  const values = AXIS_VALUES[state.axis];
  el.innerHTML = values.map(v => {
    const count = getArticlesFor(state.axis, v).length;
    const active = state.value === v ? "active" : "";
    return `<button type="button" class="chip ${active}" data-value="${v}">
      <span>${escapeHtml(valueLabel(state.axis, v))}</span>
      <span class="count">${count}</span>
    </button>`;
  }).join("");

  el.querySelectorAll(".chip").forEach(chip => {
    chip.addEventListener("click", () => {
      state.value = chip.dataset.value;
      state.articleKey = null;
      renderAll();
    });
  });
}

/* ---------- render: result area ---------- */
function renderResultArea() {
  const panelEl = document.getElementById("panel");
  const titleEl = document.getElementById("result-title");
  const areaEl = document.getElementById("result-area");

  panelEl.classList.toggle("reading-mode", !!state.articleKey);

  if (state.articleKey) {
    renderArticleDetail(areaEl);
    titleEl.textContent = "";
    return;
  }

  if (state.searchMode) {
    const results = searchArticles(state.searchQuery);
    titleEl.innerHTML = "";
    if (results.length === 0) {
      areaEl.innerHTML = `<div class="empty-state"><div class="em-icon">🔍</div><div>${escapeHtml(t().noResults)}</div></div>`;
      return;
    }
    areaEl.innerHTML =
      `<div class="search-info">"<b>${escapeHtml(state.searchQuery)}</b>" ${escapeHtml(t().searchResultsCount)}: <b>${results.length}</b></div>` +
      renderSearchResultCards(results);
    bindArticleCards(areaEl);
    return;
  }

  titleEl.textContent = t().resultsTitle;

  if (state.value === null) {
    areaEl.innerHTML = `<div class="empty-state"><div class="em-icon">📄</div><div>${escapeHtml(t().emptyState)}</div></div>`;
    return;
  }

  // Beamo 2.0 external notice — only relevant when browsing by version = 2.0
  let extraBox = "";
  if (state.axis === "version" && state.value === "2.0") {
    const url = V2_SUPPORT_URL[state.lang] || V2_SUPPORT_URL.en;
    extraBox = `<div class="external-link-box">
      <span>${escapeHtml(t().v2ExternalNotice)}</span>
      <a class="ext-btn" href="${url}" target="_blank" rel="noopener">${escapeHtml(t().v2ExternalBtn)}</a>
    </div>`;
  }

  const results = getArticlesFor(state.axis, state.value);
  if (results.length === 0) {
    areaEl.innerHTML = `<div class="empty-state"><div class="em-icon">📄</div><div>${escapeHtml(t().noResults)}</div></div>` + extraBox;
    return;
  }
  areaEl.innerHTML = renderArticleCards(results) + extraBox;
  bindArticleCards(areaEl);
}

function renderArticleCards(list) {
  return list.map(a => {
    const c = a.i18n[state.lang] || a.i18n.en;
    return `<div class="article-card" data-key="${a.key}">
      <span class="badge">${escapeHtml(articleBadge(a))}</span>
      <div>
        <div class="a-title">${escapeHtml(c.title)}</div>
        <div class="a-snippet">${escapeHtml(snippetFor(a))}</div>
      </div>
    </div>`;
  }).join("");
}

function renderSearchResultCards(results) {
  return results.map(r => {
    const a = r.article;
    const c = a.i18n[state.lang] || a.i18n.en;
    return `<div class="article-card" data-key="${a.key}">
      <span class="badge">${escapeHtml(articleBadge(a))}</span>
      <div>
        <div class="a-title">${highlightTerms(c.title, r.matchedTokens)}</div>
        <div class="a-snippet">${buildSnippet(r.bodyPlain, r.snippetPos, r.matchedTokens)}</div>
      </div>
    </div>`;
  }).join("");
}

function bindArticleCards(container) {
  container.querySelectorAll(".article-card").forEach(card => {
    card.addEventListener("click", () => {
      gotoArticle(card.dataset.key);
    });
  });
}

function renderArticleDetail(areaEl) {
  const article = getArticleByKey(state.articleKey);
  if (!article) {
    areaEl.innerHTML = `<div class="empty-state">${escapeHtml(t().noResults)}</div>`;
    return;
  }
  const c = article.i18n[state.lang] || article.i18n.en;
  areaEl.innerHTML = `
    <div class="article-detail">
      <div class="a-top-row">
        <button type="button" class="back-btn" id="detail-back-btn">← ${escapeHtml(t().backToList)}</button>
        <button type="button" class="share-btn" id="detail-share-btn">${SHARE_ICON_SVG}<span>${escapeHtml(t().shareBtn)}</span></button>
      </div>
      <div class="a-badge-row"><span>${escapeHtml(articleBadge(article))}</span></div>
      <h3 class="a-doc-title">${escapeHtml(c.title)}</h3>
      <div class="article-body">${c.html}</div>
    </div>
  `;

  document.getElementById("detail-back-btn").addEventListener("click", () => {
    if (state.quickManualKey) {
      resetToHome();
      return;
    }
    state.articleKey = null;
    renderAll();
    clearArticleUrl();
  });

  document.getElementById("detail-share-btn").addEventListener("click", (e) => {
    const btn = e.currentTarget;
    const url = buildShareUrl(article.key, state.lang);
    const showCopied = () => {
      const original = btn.innerHTML;
      btn.classList.add("copied");
      btn.innerHTML = `${SHARE_ICON_SVG}<span>${escapeHtml(t().shareCopied)}</span>`;
      setTimeout(() => {
        btn.classList.remove("copied");
        btn.innerHTML = original;
      }, 1800);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(showCopied).catch(() => window.prompt(t().shareBtn, url));
    } else {
      window.prompt(t().shareBtn, url);
    }
  });

  // cross-article link navigation
  areaEl.querySelectorAll("a[data-goto-key]").forEach(a => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const key = a.getAttribute("data-goto-key");
      if (key) gotoArticle(key);
    });
  });

  classifyArticleImages(areaEl);

  // scroll reading area to top when opening an article
  const box = areaEl.closest(".result-box");
  if (box && typeof box.scrollIntoView === "function") {
    box.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (typeof window.scrollTo === "function") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function gotoArticle(key, opts) {
  const article = getArticleByKey(key);
  if (!article) return;

  // Keep whatever list the user was already browsing (axis/value) so that
  // "back to list" returns to that same filtered list instead of jumping
  // all the way back to the version list. Only reset the axis/value when
  // the article was reached from search, or from a context (e.g. a
  // cross-article link) whose current axis/value wouldn't even include it.
  const cameFromMatchingList =
    !state.searchMode &&
    state.value !== null &&
    matchesAxisValue(article, state.axis, state.value);

  if (!cameFromMatchingList) {
    state.searchMode = false;
    state.searchQuery = "";
    state.axis = "version";
    state.value = article.version;
  }

  state.articleKey = key;
  state.quickManualKey = (opts && opts.quickManual) ? key : null;
  renderAll();
  pushArticleUrl(key);
}

/* ---------- shareable article URLs ---------- */
function buildShareUrl(key, lang) {
  const url = new URL(window.location.href);
  url.search = "";
  url.searchParams.set("doc", key);
  url.searchParams.set("lang", lang || state.lang);
  return url.toString();
}

function pushArticleUrl(key) {
  const url = buildShareUrl(key, state.lang);
  if (url !== window.location.href) {
    window.history.pushState({ articleKey: key, lang: state.lang }, "", url);
  }
}

function clearArticleUrl() {
  const url = new URL(window.location.href);
  if (url.search) {
    url.search = "";
    window.history.pushState({}, "", url.toString());
  }
}

function applyUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  const doc = params.get("doc");
  if (lang && UI[lang]) state.lang = lang;
  if (doc) {
    const article = getArticleByKey(doc);
    if (article) {
      state.searchMode = false;
      state.searchQuery = "";
      state.axis = "version";
      state.value = article.version;
      state.articleKey = doc;
      state.browsing = true;
      state.quickManualKey = (doc === "qm-admin-web" || doc === "qm-surveyor-app" || doc === MANUAL_VIDEO_KEY) ? doc : null;
    }
  }
}

/* ---------- mobile: distraction-free article reading view ---------- */
function updateMobileArticleView() {
  const isMobile = window.matchMedia && window.matchMedia("(max-width: 760px)").matches;
  document.body.classList.toggle("mobile-article-view", isMobile && !!state.articleKey);
}

/* ---------- top-level render ---------- */
function resetToHome() {
  state.axis = "version";
  state.value = null;
  state.articleKey = null;
  state.searchMode = false;
  state.searchQuery = "";
  state.browsing = false;
  state.quickManualKey = null;
  document.getElementById("hero-search-input").value = "";
  document.getElementById("floating-search-input").value = "";
  renderAll();
  clearArticleUrl();
}

function renderAll() {
  document.documentElement.lang = state.lang;
  renderHeader();
  renderHero();
  renderSectionHead();
  renderQuickManualRow();
  renderTabs();
  renderBreadcrumb();
  renderChipList();
  renderResultArea();
  renderFooter();
  updateMobileArticleView();
  updateBrowsingMode();
}

function commitSearch(value) {
  state.searchQuery = value;
  state.searchMode = value.trim().length > 0;
  if (state.searchMode) {
    state.articleKey = null;
    state.browsing = true;
  }
  renderAll();
}

/* ---------- shrink portrait (tall) images so they don't dominate the screen;
   wide/landscape images are left at full width ---------- */
function classifyArticleImages(container) {
  container.querySelectorAll(".article-body img").forEach(img => {
    const classify = () => {
      if (img.naturalWidth && img.naturalHeight && img.naturalHeight > img.naturalWidth) {
        img.classList.add("img-portrait");
      }
    };
    if (img.complete) classify();
    else img.addEventListener("load", classify, { once: true });
  });
}

/* ---------- image lightbox (click to enlarge) ---------- */
function ensureLightbox() {
  let lb = document.getElementById("img-lightbox");
  if (lb) return lb;
  lb = document.createElement("div");
  lb.id = "img-lightbox";
  lb.className = "lightbox-overlay";
  lb.innerHTML = `
    <button type="button" class="lightbox-close" aria-label="Close">&times;</button>
    <img class="lightbox-img" id="img-lightbox-img" src="" alt="">
  `;
  document.body.appendChild(lb);

  lb.addEventListener("click", (e) => {
    if (e.target === lb || e.target.classList.contains("lightbox-close")) {
      closeLightbox();
    }
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
  return lb;
}

function setViewportZoomable(zoomable) {
  const viewport = document.querySelector('meta[name="viewport"]');
  if (viewport) {
    viewport.setAttribute(
      "content",
      zoomable
        ? "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes"
        : "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
    );
  }
  // iOS Safari ignores user-scalable=no entirely, so the meta tag above only
  // helps on browsers that respect it (e.g. Android Chrome). This class drives
  // the real fix: touch-action in CSS + the touchmove/gesture guards below.
  document.documentElement.classList.toggle("zoom-allowed", zoomable);
}

function openLightbox(src, alt) {
  const lb = ensureLightbox();
  const img = document.getElementById("img-lightbox-img");
  img.src = src;
  img.alt = alt || "";
  lb.classList.add("open");
  setViewportZoomable(true);
}

function closeLightbox() {
  const lb = document.getElementById("img-lightbox");
  if (lb) lb.classList.remove("open");
  setViewportZoomable(false);
}

/* ---------- init ---------- */
document.addEventListener("DOMContentLoaded", () => {
  ensureLightbox();

  // delegated click handler: any image inside a rendered article body
  // opens an enlarged view, regardless of how/when it was rendered
  document.addEventListener("click", (e) => {
    const img = e.target.closest(".article-body img");
    if (img) openLightbox(img.getAttribute("src"), img.getAttribute("alt"));
  });

  document.querySelectorAll(".lang-switch button").forEach(btn => {
    btn.addEventListener("click", () => {
      state.lang = btn.dataset.lang;
      renderAll();
    });
  });

  const heroInput = document.getElementById("hero-search-input");
  const floatingInput = document.getElementById("floating-search-input");
  const floatingBtn = document.getElementById("floating-search-btn");

  // optional-chained: a stale cached HTML/JS pair right after a deploy could
  // momentarily be missing one of these elements — skip that binding instead
  // of throwing and aborting every listener (and the first renderAll()) below it.
  heroInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); commitSearch(heroInput.value); }
  });
  document.getElementById("hero-search-submit-btn")?.addEventListener("click", () => {
    commitSearch(heroInput.value);
  });

  floatingInput?.addEventListener("keydown", (e) => {
    if (e.key === "Enter") { e.preventDefault(); commitSearch(floatingInput.value); }
  });
  document.getElementById("floating-search-submit-btn")?.addEventListener("click", () => {
    commitSearch(floatingInput.value);
  });
  floatingBtn?.addEventListener("click", () => floatingInput?.focus());

  document.getElementById("logo-home").addEventListener("click", resetToHome);

  document.querySelectorAll(".qm-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.browsing = true;
      gotoArticle(btn.dataset.key, { quickManual: true });
    });
  });

  window.addEventListener("popstate", () => {
    state.articleKey = null;
    state.quickManualKey = null;
    applyUrlParams();
    renderAll();
  });

  applyUrlParams();
  renderAll();

  /* ---------- glowing cursor (desktop pointer devices only) ---------- */
  const canHover = window.matchMedia && window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (canHover) {
    const glow = document.getElementById("cursor-glow");
    let shown = false;
    document.addEventListener("mousemove", (e) => {
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      if (!shown) {
        shown = true;
        glow.classList.add("active");
      }
    });
    document.addEventListener("mouseleave", () => {
      shown = false;
      glow.classList.remove("active");
    });
  }

  /* ---------- header: frosted background once scrolled past the hero top ---------- */
  const headerEl = document.querySelector("header");
  const updateHeaderScrolled = () => {
    headerEl.classList.toggle("scrolled", window.scrollY > 8);
  };
  updateHeaderScrolled();
  window.addEventListener("scroll", updateHeaderScrolled, { passive: true });

  window.addEventListener("resize", updateMobileArticleView);

  /* ---------- block pinch-zoom / double-tap-zoom on iOS Safari, which ignores
     the viewport meta tag's user-scalable=no. Suspended while the lightbox is
     open (see setViewportZoomable) so images can still be pinch-zoomed. ---------- */
  const zoomIsAllowed = () => document.documentElement.classList.contains("zoom-allowed");
  document.addEventListener("touchmove", (e) => {
    if (e.touches.length > 1 && !zoomIsAllowed()) e.preventDefault();
  }, { passive: false });
  document.addEventListener("gesturestart", (e) => {
    if (!zoomIsAllowed()) e.preventDefault();
  });
});
