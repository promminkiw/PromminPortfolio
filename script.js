(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  // ใส่รูปลงใน wrapper ถ้าไม่มีรูปใช้ภาพจำลองแทน
  function fillImage(wrapper, src, alt) {
    if (src) {
      var img = el("img");
      img.src = src;
      img.alt = alt;
      img.loading = "lazy";
      wrapper.appendChild(img);
    } else {
      wrapper.appendChild(el("span", "ph"));
    }
    return wrapper;
  }

  // ---------- ปุ่ม "ดูผลงาน" ----------
  var projectsSection = document.getElementById("projects");

  document.getElementById("hero-projects-cta").addEventListener("click", function (e) {
    e.preventDefault();
    if (location.hash !== "#projects") history.pushState(null, "", "#projects");
    projectsSection.scrollIntoView({ block: "center" });
  });

  // ---------- ผลงาน ----------
  var grid = document.getElementById("project-grid");
  var filterBar = document.getElementById("project-filters");
  var dialog = document.getElementById("project-dialog");
  var gridPrev = document.getElementById("grid-prev");
  var gridNext = document.getElementById("grid-next");
  var lastTrigger = null;

  function buildCover(project) {
    var images = project.images || [];
    var src = project.cover || (images[0] && images[0].src);
    return fillImage(el("span", "cover"), src, "ภาพตัวอย่างของ " + project.title);
  }

  function buildCard(project) {
    var card = el("button", "project-card");
    card.type = "button";
    card.id = "project-" + project.id;
    card.dataset.tags = (project.tags || []).join("|").toLowerCase();

    var body = el("span", "card-body");
    body.appendChild(el("span", "card-year", project.year));
    body.appendChild(el("span", "card-title", project.title));
    body.appendChild(el("span", "card-summary", project.summary));

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

  function renderProjects() {
    projects.forEach(function (p) { grid.appendChild(buildCard(p)); });

    var empty = el("div", "grid-empty");
    var text = el("p");
    text.appendChild(el("strong", "", "พื้นที่สำหรับผลงานชิ้นต่อไป"));
    empty.appendChild(text);
    grid.appendChild(empty);
  }

  // ---------- ตัวกรองแท็ก ----------
  function addFilterButton(label, value, isActive) {
    var btn = el("button", isActive ? "filter-btn is-active" : "filter-btn", label);
    btn.type = "button";
    btn.dataset.filter = value;
    filterBar.appendChild(btn);
  }

  function renderFilters() {
    var allTags = [];
    projects.forEach(function (p) {
      (p.tags || []).forEach(function (t) {
        if (allTags.indexOf(t) === -1) allTags.push(t);
      });
    });

    addFilterButton("ทั้งหมด", "all", true);
    allTags.forEach(function (t) { addFilterButton(t, t.toLowerCase(), false); });

    filterBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      filterBar.querySelectorAll(".filter-btn").forEach(function (b) {
        b.classList.toggle("is-active", b === btn);
      });
      applyFilter(btn.dataset.filter);
    });
  }

  function applyFilter(filter) {
    grid.querySelectorAll(".project-card").forEach(function (card) {
      var tags = card.dataset.tags.split("|");
      card.hidden = filter !== "all" && tags.indexOf(filter) === -1;
    });
    grid.scrollLeft = 0;
    updateGridNav();
  }

  // ---------- ปุ่มเลื่อนผลงานซ้าย-ขวา ----------
  function scrollGrid(direction) {
    var card = grid.querySelector(".project-card:not([hidden])");
    var cardWidth = card ? card.offsetWidth + 24 : 300;
    grid.scrollBy({ left: direction * cardWidth, behavior: reduceMotion ? "auto" : "smooth" });
  }

  function updateGridNav() {
    var maxScroll = grid.scrollWidth - grid.clientWidth - 1;
    gridPrev.disabled = grid.scrollLeft <= 0;
    gridNext.disabled = grid.scrollLeft >= maxScroll;
  }

  gridPrev.addEventListener("click", function () { scrollGrid(-1); });
  gridNext.addEventListener("click", function () { scrollGrid(1); });
  grid.addEventListener("scroll", updateGridNav, { passive: true });
  window.addEventListener("resize", updateGridNav);

  // ---------- แกลเลอรีรูปในหน้าต่างรายละเอียด ----------
  var gallery = document.getElementById("dialog-gallery");
  var galleryImages = [];
  var galleryIndex = 0;

  function renderGallery(p) {
    gallery.textContent = "";
    galleryImages = (p.images || []).map(function (im) {
      return { src: im.src, alt: im.alt || p.title };
    });
    galleryIndex = 0;

    if (!galleryImages.length) {
      gallery.appendChild(buildCover(p));
      return;
    }

    var main = el("button", "gallery-main");
    main.type = "button";
    main.setAttribute("aria-label", "ขยายรูปเต็มจอ");
    main.appendChild(el("img"));
    main.addEventListener("click", function () { openLightbox(galleryIndex); });
    gallery.appendChild(main);

    // รูปเดียวไม่ต้องมีแถบ thumbnail
    if (galleryImages.length > 1) {
      var thumbs = el("div", "gallery-thumbs");
      galleryImages.forEach(function (im, i) {
        var thumb = el("button", "gallery-thumb");
        thumb.type = "button";
        thumb.setAttribute("aria-label", "ดูรูปที่ " + (i + 1) + ": " + im.alt);
        fillImage(thumb, im.src, "");
        thumb.addEventListener("click", function () { showImage(i); });
        thumbs.appendChild(thumb);
      });
      gallery.appendChild(thumbs);
    }

    showImage(0);
  }

  function showImage(i) {
    galleryIndex = i;
    var img = gallery.querySelector(".gallery-main img");
    img.src = galleryImages[i].src;
    img.alt = galleryImages[i].alt;
    gallery.querySelectorAll(".gallery-thumb").forEach(function (thumb, n) {
      thumb.classList.toggle("is-active", n === i);
      thumb.setAttribute("aria-current", String(n === i));
    });
  }

  // ---------- ดูรูปเต็มจอ ----------
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCount = document.getElementById("lightbox-count");
  var lightboxPrev = document.getElementById("lightbox-prev");
  var lightboxNext = document.getElementById("lightbox-next");

  function showLightboxImage(i) {
    var total = galleryImages.length;
    var index = (i + total) % total;
    lightboxImg.src = galleryImages[index].src;
    lightboxImg.alt = galleryImages[index].alt;
    lightboxCount.textContent = total > 1 ? (index + 1) + " / " + total : "";
    lightboxPrev.hidden = lightboxNext.hidden = total < 2;
    // ให้รูปหลักใน modal ตรงกับรูปที่ดูอยู่ตอนปิด lightbox
    showImage(index);
  }

  function openLightbox(i) {
    showLightboxImage(i);
    lightbox.showModal();
  }

  lightboxPrev.addEventListener("click", function () { showLightboxImage(galleryIndex - 1); });
  lightboxNext.addEventListener("click", function () { showLightboxImage(galleryIndex + 1); });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target.hasAttribute("data-close")) lightbox.close();
  });

  lightbox.addEventListener("keydown", function (e) {
    if (galleryImages.length < 2) return;
    if (e.key === "ArrowLeft") showLightboxImage(galleryIndex - 1);
    if (e.key === "ArrowRight") showLightboxImage(galleryIndex + 1);
  });

  // ---------- หน้าต่างรายละเอียดผลงาน ----------
  function openProject(p, trigger) {
    lastTrigger = trigger;

    renderGallery(p);

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
    (p.links || []).forEach(function (link, i) {
      var a = el("a", i === 0 ? "btn" : "btn ghost", link.label);
      a.href = link.url;
      a.target = "_blank";
      a.rel = "noopener";
      links.appendChild(a);
    });

    document.body.classList.add("modal-open");
    dialog.showModal();
    dialog.querySelector(".dialog-inner").scrollTop = 0;
    history.replaceState(null, "", "#project-" + p.id);
  }

  dialog.addEventListener("click", function (e) {
    if (e.target === dialog || e.target.hasAttribute("data-close")) dialog.close();
  });

  // event close เกิดทุกทางที่ปิด รวมถึงกด Esc
  dialog.addEventListener("close", function () {
    document.body.classList.remove("modal-open");
    history.replaceState(null, "", "#projects");
    if (lastTrigger) lastTrigger.focus();
    lastTrigger = null;
  });

  // เปิดผลงานจากลิงก์ตรง เช่น index.html#project-it-repair
  function openFromHash() {
    var prefix = "#project-";
    if (location.hash.indexOf(prefix) !== 0) return;
    var id = decodeURIComponent(location.hash.slice(prefix.length));
    var project = projects.find(function (p) { return p.id === id; });
    if (project) openProject(project, null);
  }

  renderProjects();
  renderFilters();
  applyFilter("all");
  openFromHash();
  window.addEventListener("hashchange", openFromHash);

  // ---------- แถบรูปเลื่อนอัตโนมัติ ----------
  function renderHeroMarquee() {
    var track = document.getElementById("hero-marquee-track");

    // โปรเจกต์ละ 1 รูป ลำดับเดียวกับ buildCover ให้ตรงกับรูปบนการ์ด
    var shots = [];
    projects.forEach(function (p) {
      var images = p.images || [];
      var src = p.cover || (images[0] && images[0].src);
      if (src) shots.push({ src: src, project: p });
    });
    if (!shots.length) shots = [{ src: "", project: null }];

    // ต้องมีอย่างน้อย 8 รูปให้ยาวเกินจอกว้าง ไม่งั้นจะเห็นช่องว่างทางขวา
    var items = shots;
    while (items.length < 8) items = items.concat(shots);

    // ใส่ 2 ชุดเหมือนกัน เพื่อให้ translateX(-50%) วนกลับได้ไม่มีรอยต่อ
    items.concat(items).forEach(function (shot, i) {
      if (!shot.project) {
        track.appendChild(fillImage(el("span", "hero-marquee-item"), shot.src, ""));
        return;
      }
      var item = el("button", "hero-marquee-item");
      item.type = "button";
      item.setAttribute("aria-label", "ดูรายละเอียดผลงาน " + shot.project.title);
      // ให้ Tab และ screen reader เจอแค่ชุดแรก ชุดที่ซ้ำมีไว้แค่ทำให้วนต่อเนื่อง
      if (i >= shots.length) {
        item.tabIndex = -1;
        item.setAttribute("aria-hidden", "true");
      }
      item.addEventListener("click", function () { openProject(shot.project, item); });
      track.appendChild(fillImage(item, shot.src, ""));
    });

    // 8 วินาทีต่อรูป ความเร็วจะคงที่ไม่ว่ามีกี่รูป
    track.style.animationDuration = items.length * 8 + "s";
  }

  renderHeroMarquee();

  // ---------- เมนูมือถือ ----------
  var navToggle = document.querySelector(".nav-toggle");
  var siteNav = document.getElementById("site-nav");

  function closeMobileNav() {
    navToggle.setAttribute("aria-expanded", "false");
    siteNav.classList.remove("is-open");
  }

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

  // ---------- สลับธีม (ค่าเริ่มต้นสว่าง จำค่าที่เลือกไว้ใน localStorage) ----------
  var root = document.documentElement;
  var themeToggle = document.querySelector(".theme-toggle");

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
  }

  setTheme(root.getAttribute("data-theme") || "light");

  themeToggle.addEventListener("click", function () {
    var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    setTheme(next);
    try { localStorage.setItem("theme", next); } catch (e) { }
  });

  // ---------- ไฮไลต์เมนูตาม section ที่กำลังดู ----------
  var navLinks = siteNav.querySelectorAll("a");

  var spy = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      navLinks.forEach(function (a) {
        var isCurrent = a.getAttribute("href") === "#" + entry.target.id;
        a.classList.toggle("is-active", isCurrent);
        if (isCurrent) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });

  navLinks.forEach(function (a) {
    spy.observe(document.querySelector(a.getAttribute("href")));
  });

  // ---------- ค่อยๆ แสดง section ตอนเลื่อนมาถึง ----------
  var revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion) {
    revealEls.forEach(function (elm) { elm.classList.add("is-visible"); });
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (elm) { revealObserver.observe(elm); });
  }

  // ---------- ปุ่มกลับขึ้นบน ----------
  var backToTop = document.getElementById("back-to-top");

  window.addEventListener("scroll", function () {
    backToTop.classList.toggle("is-visible", window.scrollY > 480);
  }, { passive: true });

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });
})();
