document.addEventListener("DOMContentLoaded", () => {
  const viewport = document.querySelector(".flavor-carousel-viewport");
  const track = document.querySelector(".flavor-carousel");
  const prevBtn = document.querySelector(".carousel-arrow--prev");
  const nextBtn = document.querySelector(".carousel-arrow--next");

  if (!viewport || !track || !prevBtn || !nextBtn) return;

  const originalCards = Array.from(track.children);
  const count = originalCards.length;
  if (count === 0) return;

  function makeClones() {
    return originalCards.map((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      clone.inert = true;
      return clone;
    });
  }

  // 앞뒤로 카드 세트를 복제해서 [마지막 세트][실제 카드][첫 세트] 순으로 배치
  const headClones = makeClones();
  const tailClones = makeClones();

  const headFragment = document.createDocumentFragment();
  headClones.forEach((clone) => headFragment.appendChild(clone));
  track.insertBefore(headFragment, track.firstChild);
  tailClones.forEach((clone) => track.appendChild(clone));

  const allCards = Array.from(track.children);

  let currentIndex = count; // 실제 첫 번째 카드 위치에서 시작
  let isAnimating = false;

  function scrollToIndex(index, instant) {
    viewport.scrollTo({
      left: allCards[index].offsetLeft,
      behavior: instant ? "instant" : "smooth",
    });
  }

  // 최초 진입 시 애니메이션 없이 실제 카드 세트 위치로 이동
  scrollToIndex(currentIndex, true);

  function normalize() {
    if (currentIndex < count) {
      currentIndex += count;
      scrollToIndex(currentIndex, true);
    } else if (currentIndex >= count * 2) {
      currentIndex -= count;
      scrollToIndex(currentIndex, true);
    }
    isAnimating = false;
  }

  if ("onscrollend" in window) {
    viewport.addEventListener("scrollend", normalize);
  } else {
    let scrollTimer;
    viewport.addEventListener("scroll", () => {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(normalize, 150);
    });
  }

  function go(delta) {
    if (isAnimating) return;
    isAnimating = true;
    currentIndex += delta;
    scrollToIndex(currentIndex, false);
  }

  prevBtn.addEventListener("click", () => go(-1));
  nextBtn.addEventListener("click", () => go(1));
});

document.addEventListener("DOMContentLoaded", () => {
  const eventCards = document.querySelectorAll(".event-card");
  if (eventCards.length === 0) return;

  if (!("IntersectionObserver" in window)) {
    eventCards.forEach((card) => card.classList.add("is-visible"));
    return;
  }

  // the reveal only reacts to downward scrolling; scrolling back up leaves
  // every card exactly as it is, no re-trigger and no hiding
  let lastScrollY = window.scrollY;
  let scrollDir = "down";
  window.addEventListener(
    "scroll",
    () => {
      const y = window.scrollY;
      if (y > lastScrollY) scrollDir = "down";
      else if (y < lastScrollY) scrollDir = "up";
      lastScrollY = y;
    },
    { passive: true }
  );

  const observer = new IntersectionObserver(
    (entries, obs) => {
      // scrolling up: don't touch the class at all, whatever state each card
      // is in stays exactly as it is
      if (scrollDir !== "down") return;

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // shown for good, never removed again
        }
      });
    },
    { threshold: 0.2 }
  );

  eventCards.forEach((card) => observer.observe(card));
});
