(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // สร้าง element แบบสั้นๆ
  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  // ---------- ผลงาน ----------
  var grid = document.getElementById("project-grid");
  var filterBar = document.getElementById("project-filters");
  var dialog = document.getElementById("project-dialog");
  var lastTrigger = null;
  var activeFilter = "all";

  // ปกผลงาน: ใช้รูปถ้ามี ไม่มีก็ใช้ภาพจำลอง
  function buildCover(project) {
    var cover = el("span", "cover");
    var images = project.images || [];
    var src = project.cover || (images[0] && images[0].src);
    if (src) {
      var img = el("img");
      img.src = src;
      img.alt = "ภาพตัวอย่างของ " + project.title;
      img.loading = "lazy";
      cover.appendChild(img);
    } else {
      cover.appendChild(el("span", "ph"));
    }
    return cover;
  }

  function buildCard(project) {
    var card = el("button", "project-card");
    card.type = "button";
    card.id = "project-" + project.id;
    card.dataset.tags = (project.tags || []).join("|").toLowerCase();

    var body = el("span", "card-body");
    body.appendChild(el("span", "card-year", project.year || ""));
    body.appendChild(el("span", "card-title", project.title));
    body.appendChild(el("span", "card-summary", project.summary || ""));

    var tags = el("span", "card-tags");
    (project.tags || []).slice(0, 4).forEach(function (t) {
      tags.appendChild(el("span", "tag", t));
    });
    body.appendChild(tags);
    body.appendChild(el("span", "card-more", "ดูรายละเอียด"));

    card.appendChild(buildCover(project));
    card.appendChild(body);

    card.addEventListener("click", function () { openProject(project, card); });
    return card;
  }

  // ---------- ตัวกรองแท็ก ----------
  function buildFilters() {
    if (!filterBar || typeof projects === "undefined") return;

    var tagSet = [];
    projects.forEach(function (p) {
      (p.tags || []).forEach(function (t) {
        if (tagSet.indexOf(t) === -1) tagSet.push(t);
      });
    });
    if (!tagSet.length) return;

    var all = el("button", "filter-btn is-active", "ทั้งหมด");
    all.type = "button";
    all.dataset.filter = "all";
    filterBar.appendChild(all);

    tagSet.forEach(function (t) {
      var btn = el("button", "filter-btn", t);
      btn.type = "button";
      btn.dataset.filter = t.toLowerCase();
      filterBar.appendChild(btn);
    });

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      activeFilter = btn.dataset.filter;
      filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      applyFilter();
    });
  }

  function applyFilter() {
    if (!grid) return;
    grid.querySelectorAll(".project-card").forEach(function (card) {
      var tags = (card.dataset.tags || "").split("|");
      var show = activeFilter === "all" || tags.indexOf(activeFilter) !== -1;
      card.hidden = !show;
    });
    grid.scrollLeft = 0;
    updateGridNav();
  }

  // ---------- ปุ่มเลื่อนผลงานซ้าย-ขวา ----------
  var gridPrev = document.getElementById("grid-prev");
  var gridNext = document.getElementById("grid-next");

  function scrollGrid(dir) {
    if (!grid) return;
    var card = grid.querySelector(".project-card:not([hidden])");
    var amount = card ? card.getBoundingClientRect().width + 24 : 300;
    grid.scrollBy({ left: dir * amount, behavior: reduceMotion ? "auto" : "smooth" });
  }

  function updateGridNav() {
    if (!gridPrev || !gridNext || !grid) return;
    var maxScroll = grid.scrollWidth - grid.clientWidth - 1;
    gridPrev.disabled = grid.scrollLeft <= 0;
    gridNext.disabled = grid.scrollLeft >= maxScroll;
  }

  if (gridPrev && gridNext && grid) {
    gridPrev.addEventListener("click", function () { scrollGrid(-1); });
    gridNext.addEventListener("click", function () { scrollGrid(1); });
    grid.addEventListener("scroll", updateGridNav, { passive: true });
    window.addEventListener("resize", updateGridNav);
  }

  function renderProjects() {
    if (!grid || typeof projects === "undefined") return;
    projects.forEach(function (p) { grid.appendChild(buildCard(p)); });

    var empty = el("div", "grid-empty");
    var inner = el("p");
    inner.appendChild(el("strong", "", "พื้นที่สำหรับผลงานชิ้นต่อไป"));
    inner.appendChild(document.createTextNode("เพิ่มได้ในไฟล์ projects.js"));
    empty.appendChild(inner);
    grid.appendChild(empty);

    buildFilters();
  }

  function findProject(id) {
    if (typeof projects === "undefined") return null;
    for (var i = 0; i < projects.length; i++) {
      if (projects[i].id === id) return projects[i];
    }
    return null;
  }

  function openProject(p, trigger) {
    lastTrigger = trigger || null;

    var gallery = document.getElementById("dialog-gallery");
    gallery.textContent = "";
    var images = p.images || [];
    if (images.length) {
      images.forEach(function (im) {
        var img = el("img");
        img.src = im.src;
        img.alt = im.alt || p.title;
        gallery.appendChild(img);
      });
    } else {
      gallery.appendChild(buildCover(p));
    }

    document.getElementById("dialog-year").textContent = p.year || "";
    document.getElementById("dialog-title").textContent = p.title;
    document.getElementById("dialog-role").textContent = p.role ? "บทบาท: " + p.role : "";

    var desc = document.getElementById("dialog-desc");
    desc.textContent = "";
    (p.description || []).forEach(function (para) {
      desc.appendChild(el("p", "", para));
    });

    var tags = document.getElementById("dialog-tags");
    tags.textContent = "";
    (p.tags || []).forEach(function (t) { tags.appendChild(el("li", "", t)); });

    var links = document.getElementById("dialog-links");
    links.textContent = "";
    (p.links || []).forEach(function (l, i) {
      var a = el("a", i === 0 ? "btn" : "btn ghost", l.label);
      a.href = l.url;
      a.target = "_blank";
      a.rel = "noopener";
      links.appendChild(a);
    });

    document.body.classList.add("modal-open");
    dialog.showModal();
    dialog.querySelector(".dialog-inner").scrollTop = 0;

    if (history.replaceState) {
      history.replaceState(null, "", "#project-" + p.id);
    }
  }

  if (dialog) {
    // คลิกพื้นหลังหรือปุ่มปิด เพื่อปิดหน้าต่าง
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog || e.target.hasAttribute("data-close")) dialog.close();
    });
    // close ครอบคลุมทุกทาง (ปุ่มปิด, พื้นหลัง, กด Esc)
    dialog.addEventListener("close", function () {
      document.body.classList.remove("modal-open");
      if (history.replaceState) history.replaceState(null, "", "#projects");
      if (lastTrigger) {
        lastTrigger.focus();
        lastTrigger = null;
      }
    });
  }

  // เปิดผลงานตรงจากลิงก์ เช่น index.html#project-sample-project
  function openFromHash() {
    var match = /^#project-(.+)$/.exec(window.location.hash);
    if (!match) return;
    var project = findProject(decodeURIComponent(match[1]));
    if (project) openProject(project, null);
  }

  renderProjects();
  applyFilter();
  openFromHash();
  window.addEventListener("hashchange", openFromHash);

  // ---------- แถบรูปผลงานเลื่อนอัตโนมัติ (บน Hero) ----------
  function buildMarqueeItem(src) {
    var item = el("span", "hero-marquee-item");
    if (src) {
      var img = el("img");
      img.src = src;
      img.alt = "";
      img.loading = "lazy";
      item.appendChild(img);
    } else {
      item.appendChild(el("span", "ph"));
    }
    return item;
  }

  function renderHeroMarquee() {
    var wrap = document.querySelector(".hero-marquee");
    var track = document.getElementById("hero-marquee-track");
    if (!wrap || !track || typeof projects === "undefined") return;

    // ดึงรูปผลงานทั้งหมดจาก projects.js (ใช้ images ถ้ามี ไม่มีก็ใช้ cover)
    var shots = [];
    projects.forEach(function (p) {
      var images = p.images || [];
      if (images.length) {
        images.forEach(function (im) { shots.push(im.src); });
      } else if (p.cover) {
        shots.push(p.cover);
      }
    });

    // ยังไม่มีรูปจริง ใช้ภาพจำลองแทนไปก่อน
    if (!shots.length) {
      for (var i = 0; i < 6; i++) shots.push("");
    }

    // ต่อรายการซ้ำ 1 รอบ เพื่อให้เลื่อนวนซ้ายไปขวาได้ไม่มีรอยต่อ
    shots.concat(shots).forEach(function (src) {
      track.appendChild(buildMarqueeItem(src));
    });

    if (!reduceMotion) {
      // ปรับความเร็วให้คงที่เสมอ ไม่ว่าจะมีผลงานกี่ชิ้น (ราว 40px ต่อวินาที)
      requestAnimationFrame(function () {
        var uniqueWidth = track.scrollWidth / 2;
        var duration = Math.max(18, uniqueWidth / 40);
        track.style.animationDuration = duration.toFixed(1) + "s";
      });
    }
  }

  renderHeroMarquee();

  // ---------- ปีใน footer ----------
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---------- เมนูมือถือ ----------
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.getElementById("site-nav");

  function closeMobileNav() {
    if (!navToggle || !siteNav) return;
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    siteNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") closeMobileNav();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMobileNav();
    });
  }

  // ---------- สลับธีม ----------
  var themeToggle = document.querySelector(".theme-toggle");

  // ธีมเริ่มต้นคือสว่างเสมอ ไม่อิง OS สลับมืดได้เมื่อกดเอง (จำไว้ใน localStorage)
  function currentTheme() {
    return document.documentElement.getAttribute("data-theme") || "light";
  }

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", currentTheme() === "dark" ? "true" : "false");

    themeToggle.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      themeToggle.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
      try { localStorage.setItem("theme", next); } catch (e) { }
    });
  }

  // ---------- Scrollspy: ไฮไลต์เมนูตาม section ที่เห็น ----------
  var navLinks = document.querySelectorAll('#site-nav a[href^="#"]');
  var sections = [];
  navLinks.forEach(function (a) {
    var target = document.getElementById(a.getAttribute("href").slice(1));
    if (target) sections.push({ link: a, target: target });
  });

  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var match = sections.filter(function (s) { return s.target === entry.target; })[0];
        if (!match) return;
        navLinks.forEach(function (a) {
          a.classList.remove("is-active");
          a.removeAttribute("aria-current");
        });
        match.link.classList.add("is-active");
        match.link.setAttribute("aria-current", "true");
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (s) { spy.observe(s.target); });
  }

  // ---------- Reveal ตอนเลื่อนหน้าจอมาถึง ----------
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (elm) { elm.classList.add("is-visible"); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15 });
      revealEls.forEach(function (elm) { revealObserver.observe(elm); });
    }
  }

  // ---------- ปุ่มกลับขึ้นบน ----------
  var backToTop = document.getElementById("back-to-top");
  if (backToTop) {
    window.addEventListener("scroll", function () {
      backToTop.classList.toggle("is-visible", window.scrollY > 480);
    }, { passive: true });

    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  // กันหน้าเปล่าตอนพิมพ์ ถ้ายังไม่เคยเลื่อนผ่าน section นั้น (ยังไม่มี is-visible)
  var forcedReveal = [];

  function forceRevealAll() {
    document.querySelectorAll(".reveal:not(.is-visible)").forEach(function (elm) {
      elm.classList.add("is-visible");
      forcedReveal.push(elm);
    });
  }

  function undoForcedReveal() {
    forcedReveal.forEach(function (elm) { elm.classList.remove("is-visible"); });
    forcedReveal = [];
  }

  window.addEventListener("beforeprint", forceRevealAll);
  window.addEventListener("afterprint", undoForcedReveal);

  // ---------- ดาวน์โหลด CV เป็น PDF ----------
  var printBtn = document.getElementById("print-cv");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      forceRevealAll();
      window.print();
    });
  }
})();
