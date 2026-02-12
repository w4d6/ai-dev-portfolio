/**
 * Portfolio Site - Main JavaScript
 * Handles scroll animations, navigation, and interactions
 */

(function () {
  "use strict";

  // --- Scroll Animations with Intersection Observer ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, parseInt(delay, 10));
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in").forEach((el) => {
    fadeObserver.observe(el);
  });

  // --- Skill Bar Animation ---
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".skill-card__fill").forEach((bar) => {
            bar.classList.add("animate");
          });
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const skillsGrid = document.querySelector(".skills__grid");
  if (skillsGrid) {
    skillObserver.observe(skillsGrid);
  }

  // --- Navigation Scroll Effect ---
  const nav = document.getElementById("nav");
  let lastScrollY = 0;
  let scrollTicking = false;

  function handleNavScroll() {
    if (!nav) return;
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      nav.classList.add("nav--scrolled");
    } else {
      nav.classList.remove("nav--scrolled");
    }
    if (scrollY > 300 && scrollY > lastScrollY) {
      nav.classList.add("nav--hidden");
    } else {
      nav.classList.remove("nav--hidden");
    }
    lastScrollY = scrollY;
  }

  window.addEventListener("scroll", () => {
    if (!scrollTicking) {
      requestAnimationFrame(() => {
        handleNavScroll();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }, { passive: true });

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector(".nav__hamburger");
  const navLinks = document.querySelector(".nav__links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.getAttribute("aria-expanded") === "true";
      hamburger.setAttribute("aria-expanded", !isOpen);
      navLinks.classList.toggle("open");
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.setAttribute("aria-expanded", "false");
        navLinks.classList.remove("open");
      });
    });
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = anchor.getAttribute("href");
      if (targetId === "#") return;
      try {
        const target = document.querySelector(targetId);
        if (target) {
          const navHeight = nav ? nav.offsetHeight : 0;
          const targetPosition =
            target.getBoundingClientRect().top + window.scrollY - navHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      } catch (_) {
        // Invalid selector - silently ignore
      }
    });
  });

  // --- Image Modal ---
  const cards = document.querySelectorAll(".card__image");
  let modal = null;
  let previouslyFocusedElement = null;

  function createModal() {
    modal = document.createElement("div");
    modal.className = "modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "画像プレビュー");

    const closeBtn = document.createElement("button");
    closeBtn.className = "modal__close";
    closeBtn.setAttribute("aria-label", "閉じる");
    closeBtn.textContent = "\u00D7";

    const content = document.createElement("div");
    content.className = "modal__content";

    const img = document.createElement("img");
    img.src = "";
    img.alt = "Preview";
    content.appendChild(img);

    modal.appendChild(closeBtn);
    modal.appendChild(content);
    document.body.appendChild(modal);

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    // Focus trap
    modal.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        const focusable = modal.querySelectorAll('button, [tabindex="0"]');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });
  }

  function openModal(imgSrc, imgAlt) {
    previouslyFocusedElement = document.activeElement;
    if (!modal) createModal();
    const img = modal.querySelector("img");
    img.src = imgSrc;
    img.alt = imgAlt;
    modal.classList.add("active");
    document.body.classList.add("modal-open");
    modal.querySelector(".modal__close").focus();
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("active");
      document.body.classList.remove("modal-open");
      if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
      }
    }
  }

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const img = card.querySelector("img");
      if (img) {
        openModal(img.src, img.alt);
      }
    });

    // Keyboard support
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const img = card.querySelector("img");
        if (img) {
          openModal(img.src, img.alt);
        }
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // --- Active Nav Link Highlight ---
  const sections = document.querySelectorAll("section[id]");
  const navAnchors = document.querySelectorAll(".nav__links a");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navAnchors.forEach((a) => {
            a.classList.toggle(
              "is-active",
              a.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    { threshold: 0.3, rootMargin: "-72px 0px -50% 0px" }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
})();
