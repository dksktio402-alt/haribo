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
