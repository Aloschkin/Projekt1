/* ===== Helpers ===== */
function $(s, r) {
  return (r || document).querySelector(s);
}
function $all(s, r) {
  return (r || document).querySelectorAll(s);
}
function fmtDE(n) {
  return new Intl.NumberFormat("de-DE").format(Number(n));
}

/* ===== Theme (Dark/Light) ===== */
(function () {
  var prefersDark = false;
  try {
    prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  } catch (e) {}
  var saved = localStorage.getItem("theme");
  var initial = saved || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", initial);

  var btn = $("#theme-toggle");
  if (btn) {
    btn.setAttribute("aria-pressed", initial === "dark" ? "true" : "false");
    btn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme") || "light";
      var next = cur === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      btn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
    });
  }
})();

/* ===== Header Shade on Scroll ===== */
(function () {
  var header = $(".site-header");
  if (!header) return;
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (y > 10) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

/* ===== Reveal ===== */
(function () {
  if (!("IntersectionObserver" in window)) {
    $all("[data-reveal]").forEach(function (el) {
      el.classList.add("revealed");
    });
    return;
  }
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  $all("[data-reveal]").forEach(function (el) {
    io.observe(el);
  });
})();

/* ===== Parallax (Hero) ===== */
(function () {
  var img = $("[data-parallax] img");
  if (!img) return;
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    var move = Math.min(30, y * 0.06);
    img.style.transform = "translateY(" + move + "px) scale(1.02)";
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

/* ===== Tilt 3D ===== */
function bindTilt(nodes) {
  nodes.forEach(function (card) {
    function rect() {
      return card.getBoundingClientRect();
    }
    var max = 8;
    function onMove(e) {
      var r = rect(),
        cx = r.left + r.width / 2,
        cy = r.top + r.height / 2;
      var dx = (e.clientX - cx) / (r.width / 2),
        dy = (e.clientY - cy) / (r.height / 2);
      card.style.transform =
        "perspective(800px) rotateX(" +
        (-dy * max).toFixed(2) +
        "deg) rotateY(" +
        (dx * max).toFixed(2) +
        "deg)";
    }
    function reset() {
      card.style.transform = "perspective(800px) rotateX(0) rotateY(0)";
    }
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", reset);
    card.addEventListener("blur", reset);
  });
}

/* ===== Projekte ===== */
var PROJECTS = [
  {
    slug: "kinsvater-bau",
    client: "Kinsvater Bau",
    summary: "Bauleistungen klar, Anfrage leicht – umgesetzt in Worldsoft.",
    tags: ["Webdesign", "SEO", "Google Business", "Worldsoft"],
    images: {
      desktop: "assets/kinsvaterbau.webp",
      logo: "assets/kinsvaterbau-logo.webp",
      alt: "Website-Kachel für Kinsvater Bau – Baustellenmotiv",
    },
    url: "https://kinsvater-bau.de/",
    type: ["Worldsoft"],
  },
  {
    slug: "trans-sib",
    client: "Trans Sib",
    summary: "Infos sortiert, Anfrageprozess vereinfacht – Worldsoft.",
    tags: ["Webdesign", "Google Business", "UX", "Worldsoft"],
    images: {
      desktop: "assets/transsib.webp",
      logo: "assets/transsib-logo.png",
      alt: "Website-Kachel für Trans Sib – Logistik & Transport",
    },
    url: "https://transsibts.eu/",
    type: ["Worldsoft"],
  },
  {
    slug: "mileo24",
    client: "Mileo24",
    summary: "Mehr Anrufe, schnelle Ladezeit, lokale Sichtbarkeit.",
    tags: ["SEO", "Performance", "Ads", "Google Business", "Shopware"],
    images: {
      desktop: "assets/mileo24.webp",
      logo: "assets/mileo24-logo.png",
      alt: "Website-Kachel für Mileo24 – Fliesen & Showroom",
    },
    url: "https://www.mileo24.de/",
    type: ["Shopware"],
  },
  {
    slug: "beauty-point",
    client: "Beauty Point Moselle",
    summary: "Buchung & Auffindbarkeit verbessert.",
    tags: ["SEO", "Webdesign", "Ads", "Google Business", "Worldsoft"],
    images: {
      desktop: "assets/beautypoint.webp",
      logo: "assets/beautypoint-logo.webp",
      alt: "Website-Kachel für Beauty Point Moselle – Beauty & Kosmetik",
    },
    url: "https://beautypoint-moselle.de/",
    type: ["Worldsoft"],
  },
  {
    slug: "websolution24",
    client: "WebSolution24",
    summary: "Eigene Seite – modern & performant.",
    tags: ["Frontend", "SEO", "Ads", "Google Business", "Worldsoft"],
    images: {
      desktop: "assets/websolution.webp",
      logo: "assets/websolution24-logo.webp",
      alt: "Website-Kachel für WebSolution24 – Minimaler Workspace",
    },
    url: "https://websolution24.de/",
    type: ["Worldsoft"],
  },
  {
    slug: "weinerleben-beth",
    client: "WeinErleben Beth",
    summary: "Deutlich mehr Anfragen durch SEO & Ads.",
    tags: ["SEO", "Webdesign", "Ads", "Google Business", "Wix"],
    images: {
      desktop: "assets/weinerlebenbeth.webp",
      logo: "assets/logo-weinhaus-beth.jpg",
      alt: "Website-Kachel für WeinErleben Beth – Wein & Erlebnis",
    },
    url: "https://www.weinerleben-beth.de/",
    type: ["Wix"],
  },
];

/* ===== Grid + Filter + Lightbox ===== */
(function () {
  var grid = $("#projectsGrid"),
    chips = $all(".chip"),
    lbHost = $("#lightbox");
  if (!grid || !lbHost) return;

  function render(items) {
    grid.innerHTML = items
      .map(function (p) {
        // NEU: Logo im Grid, Fallback auf Screenshot falls kein Logo hinterlegt
        var thumbSrc =
          p.images && p.images.logo ? p.images.logo : p.images.desktop;
        var thumbKind = p.images && p.images.logo ? "logo" : "photo";

        return [
          '<article class="project-card tilt" tabindex="0" data-open="' +
            p.slug +
            '">',
          '<figure class="thumb ' + thumbKind + '">',
          '<img src="' + thumbSrc + '" alt="' + p.client + ' Logo">',
          "</figure>",
          "<h3>" + p.client + "</h3>",
          '<p class="muted">' + p.summary + "</p>",
          '<div class="tags">' +
            (p.tags || [])
              .map(function (t) {
                return "<span>" + t + "</span>";
              })
              .join("") +
            "</div>",
          '<div class="card-actions">',
          '<a class="btn ghost" href="' +
            p.url +
            '" target="_blank" rel="noopener">Live ansehen</a>',
          '<button class="btn primary" data-open="' +
            p.slug +
            '">Details</button>',
          "</div>",
          "</article>",
        ].join("");
      })
      .join("");

    bindTilt(Array.from($all(".tilt", grid)));
    $all("[data-open]", grid).forEach(function (el) {
      function open() {
        openLightbox(el.getAttribute("data-open"));
      }
      el.addEventListener("click", open);
      el.addEventListener("keypress", function (e) {
        if (e.key === "Enter") open();
      });
    });
  }

  function openLightbox(slug) {
    var idx = PROJECTS.findIndex(function (p) {
      return p.slug === slug;
    });
    if (idx === -1) return;
    var p = PROJECTS[idx];
    lbHost.innerHTML = [
      '<div class="lb-panel" role="document">',
      '<button class="lb-close" aria-label="Schließen">✕</button>',
      '<div class="lb-media"><img src="' +
        p.images.desktop +
        '" alt="' +
        p.images.alt +
        '"></div>',
      '<div class="lb-body">',
      "<h3>" + p.client + "</h3>",
      "<p>" + p.summary + "</p>",
      '<div class="lb-tags">' +
        (p.tags || [])
          .map(function (t) {
            return "<span>" + t + "</span>";
          })
          .join("") +
        "</div>",
      "<ul>",
      "<li><strong>Umgesetzt:</strong> " + (p.type || []).join(", ") + "</li>",
      "<li><strong>Schwerpunkte:</strong> " +
        (p.tags || []).slice(0, 3).join(", ") +
        "</li>",
      "</ul>",
      '<div class="lb-actions">',
      '<a class="btn primary" href="' +
        p.url +
        '" target="_blank" rel="noopener">Live ansehen</a>',
      '<button class="btn ghost" data-prev>← Zurück</button>',
      '<button class="btn ghost" data-next>Weiter →</button>',
      "</div>",
      "</div>",
      "</div>",
    ].join("");

    lbHost.classList.add("open");
    lbHost.setAttribute("aria-hidden", "false");
    // Animation starten
    requestAnimationFrame(() => {
      const panel = lbHost.querySelector(".lb-panel");
      if (panel) panel.classList.add("show");
    });
    var closeBtn = $(".lb-close", lbHost);
    if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
    lbHost.addEventListener("click", function (e) {
      if (e.target === lbHost) closeLightbox();
    });
    var prev = $("[data-prev]", lbHost),
      next = $("[data-next]", lbHost);
    if (prev)
      prev.addEventListener("click", function () {
        nav(-1, slug);
      });
    if (next)
      next.addEventListener("click", function () {
        nav(1, slug);
      });
    trapFocus(lbHost);
  }
  function closeLightbox() {
    const panel = lbHost.querySelector(".lb-panel");
    if (panel) {
      panel.classList.remove("show"); // erst ausblenden
      setTimeout(() => {
        lbHost.classList.remove("open");
        lbHost.setAttribute("aria-hidden", "true");
        lbHost.innerHTML = "";
        releaseFocus();
      }, 600); // Wartezeit = CSS transition (0.6s)
    } else {
      lbHost.classList.remove("open");
      lbHost.setAttribute("aria-hidden", "true");
      lbHost.innerHTML = "";
      releaseFocus();
    }
  }
  function nav(d, slug) {
    var i = PROJECTS.findIndex(function (p) {
      return p.slug === slug;
    });
    openLightbox(PROJECTS[(i + d + PROJECTS.length) % PROJECTS.length].slug);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeLightbox();
  });

  // Filter
  chips.forEach(function (ch) {
    ch.addEventListener("click", function () {
      chips.forEach(function (c) {
        c.classList.remove("active");
      });
      ch.classList.add("active");
      var f = ch.getAttribute("data-filter");
      if (f === "all") return render(PROJECTS);
      render(
        PROJECTS.filter(function (p) {
          return (
            (p.tags || []).indexOf(f) > -1 || (p.type || []).indexOf(f) > -1
          );
        })
      );
    });
  });

  render(PROJECTS);
})();

/* ===== Focus Trap ===== */
var lastFocus = null;
function trapFocus(container) {
  lastFocus = document.activeElement;
  var focusables = container.querySelectorAll(
    'a,button,input,select,textarea,[tabindex]:not([tabindex="-1"])'
  );
  container.addEventListener("keydown", function (e) {
    if (e.key !== "Tab") return;
    var list = Array.prototype.slice.call(focusables);
    var i = list.indexOf(document.activeElement);
    if (e.shiftKey && i === 0) {
      e.preventDefault();
      list[list.length - 1].focus();
    } else if (!e.shiftKey && i === list.length - 1) {
      e.preventDefault();
      list[0].focus();
    }
  });
}
function releaseFocus() {
  if (lastFocus && document.body.contains(lastFocus)) lastFocus.focus();
}

/* ===== Back-to-top ===== */
(function () {
  var btn = $("#toTop");
  if (!btn) return;
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    btn.classList.toggle("show", y > 600);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  btn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();

/* ===== Scroll-Spy ===== */
(function () {
  var links = $all(".nav-link");
  var sections = Array.from(links)
    .map(function (a) {
      var h = a.getAttribute("href") || "";
      return h.charAt(0) === "#" ? $(h) : null;
    })
    .filter(Boolean);

  function spy() {
    var headerH = $(".site-header") ? $(".site-header").offsetHeight : 0;
    var fromTop =
      (window.scrollY || document.documentElement.scrollTop) + headerH + 10;
    var current = sections[0] ? sections[0].id : "home";
    sections.forEach(function (sec) {
      if (sec.offsetTop <= fromTop) current = sec.id;
    });
    links.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + current);
    });
  }

  window.addEventListener("scroll", spy, { passive: true });
  window.addEventListener("resize", spy);
  window.addEventListener("load", spy);
  document.addEventListener("DOMContentLoaded", spy);
  links.forEach(function (a) {
    a.addEventListener("click", function () {
      links.forEach(function (x) {
        x.classList.remove("active");
      });
      a.classList.add("active");
    });
  });
})();

/* ===== Mobile Menü (<=622px) ===== */
(function () {
  var btn = document.getElementById("nav-toggle");
  var panel = document.getElementById("mobileNav");
  var backdrop = document.getElementById("navBackdrop");
  if (!btn || !panel || !backdrop) return;

  function open() {
    panel.hidden = false;
    backdrop.hidden = false;
    requestAnimationFrame(function () {
      panel.classList.add("open");
      document.body.style.overflow = "hidden";
      btn.setAttribute("aria-expanded", "true");
    });
  }
  function close() {
    panel.classList.remove("open");
    document.body.style.overflow = "";
    btn.setAttribute("aria-expanded", "false");
    setTimeout(function () {
      panel.hidden = true;
      backdrop.hidden = true;
    }, 200);
  }
  function toggle() {
    btn.getAttribute("aria-expanded") === "true" ? close() : open();
  }

  btn.addEventListener("click", toggle);
  backdrop.addEventListener("click", close);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") close();
  });

  panel.querySelectorAll("a.nav-link").forEach(function (a) {
    a.addEventListener("click", close);
  });

  window.addEventListener("resize", function () {
    if (
      window.innerWidth >= 623 &&
      btn.getAttribute("aria-expanded") === "true"
    )
      close();
  });
})();

/* ===== Kontaktformular (Web3Forms, Live-Checks) ===== */
(function () {
  var form = $("#contactForm");
  if (!form) return;
  // Autofill Fix: Trigger Events für Autofill-Felder
  window.addEventListener("load", function () {
    const autofillFields = form.querySelectorAll("input, textarea, select");
    autofillFields.forEach((field) => {
      setTimeout(() => {
        if (field.value) {
          field.dispatchEvent(new Event("input", { bubbles: true }));
          field.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }, 300);
    });
  });

  var fields = ["name", "email", "phone", "type", "budget", "message"];

  // Budget-Anzeige
  var budget = form.elements["budget"],
    budgetVal = $("#budgetValue");
  function syncBudget() {
    if (budget && budgetVal) budgetVal.textContent = fmtDE(budget.value) + " €";
  }
  if (budget) {
    syncBudget();
    budget.addEventListener("input", syncBudget);
  }

  // Zeichenanzahl
  var msg = form.elements["message"],
    cc = $("#charCount");
  function syncCC() {
    if (cc && msg) cc.textContent = String(msg.value.length);
  }
  if (msg) {
    syncCC();
    msg.addEventListener("input", syncCC);
  }

  // Telefon säubern
  var phone = form.elements["phone"];
  if (phone)
    phone.addEventListener("input", function () {
      phone.value = phone.value.replace(/[^\d+\s]/g, "");
    });

  // Captcha
  var a = Math.floor(Math.random() * 9) + 1,
    b = Math.floor(Math.random() * 6) + 1;
  var label = $("#captchaLabel"),
    cap = $("#captcha"),
    answer = a + b;
  if (label)
    label.textContent = "Sicherheitsfrage*: Wieviel ist " + a + " + " + b + "?";

  // Fehler-Helfer
  function mark(el, ok, msg) {
    var field = el.closest(".field");
    if (!field) return;
    var h = field.querySelector(".hint");
    if (ok) {
      field.classList.remove("invalid");
      if (h) {
        h.textContent = "";
        h.classList.remove("error");
      }
    } else {
      field.classList.add("invalid");
      if (h) {
        h.textContent = msg || "";
        h.classList.add("error");
      }
    }
  }

  // Live-Checks
  form.elements["name"].addEventListener("blur", function (e) {
    mark(
      e.target,
      e.target.value.trim().length >= 2,
      "Bitte mindestens 2 Zeichen."
    );
  });
  form.elements["email"].addEventListener("blur", function (e) {
    var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value.trim());
    mark(e.target, ok, "Bitte gültige E-Mail angeben.");
  });
  form.elements["message"].addEventListener("blur", function (e) {
    mark(
      e.target,
      e.target.value.trim().length >= 20,
      "Bitte mindestens 20 Zeichen."
    );
  });

  // Reset
  var fb = $("#formFeedback"),
    hp = form.querySelector('input[name="company"]');
  $("#resetForm")?.addEventListener("click", function () {
    form.reset();
    if (fb) fb.textContent = "";
    if (cap) cap.value = "";
    fields.forEach(function (f) {
      if (form.elements[f]) form.elements[f].blur();
    });
    $all(".field.invalid", form).forEach(function (f) {
      f.classList.remove("invalid");
    });
    $all(".hint.error", form).forEach(function (h) {
      h.classList.remove("error");
    });
    syncBudget();
    syncCC();
  });

  // Submit (Web3Forms)
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (hp && hp.value) return; // Bot

    mark(
      form.elements["name"],
      form.elements["name"].value.trim().length >= 2,
      "Bitte mindestens 2 Zeichen."
    );
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      form.elements["email"].value.trim()
    );
    mark(form.elements["email"], emailOk, "Bitte gültige E-Mail angeben.");
    mark(
      form.elements["message"],
      form.elements["message"].value.trim().length >= 20,
      "Bitte mindestens 20 Zeichen."
    );
    if (cap && Number(cap.value) !== answer) {
      var h = cap.parentElement.querySelector(".hint");
      if (h) {
        h.textContent = "Bitte korrekt lösen.";
        h.classList.add("error");
      }
      cap.focus();
      return;
    }
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (fb) fb.textContent = "Sende …";
    fetch(form.action, { method: "POST", body: new FormData(form) })
      .then(function (r) {
        return r.json();
      })
      .then(function (data) {
        if (data && data.success) {
          if (fb) fb.textContent = "Danke! Deine Nachricht wurde gesendet.";
          form.reset();
          if (cap) cap.value = "";
          $all(".field.invalid", form).forEach(function (f) {
            f.classList.remove("invalid");
          });
          $all(".hint.error", form).forEach(function (h) {
            h.classList.remove("error");
          });
          syncBudget();
          syncCC();
        } else {
          if (fb)
            fb.textContent =
              data && data.message
                ? data.message
                : "Senden fehlgeschlagen (Web3Forms).";
        }
      })
      .catch(function () {
        if (fb)
          fb.textContent = "Netzwerkfehler. Bitte später erneut versuchen.";
      });
  });
})();

/* ===== Back-to-top Sichtbarkeit ===== */
(function () {
  var btn = $("#toTop");
  if (!btn) return;
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    btn.classList.toggle("show", y > 600);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();
// ===== Body Fade-in nach Laden =====
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});