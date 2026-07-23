import { useEffect, useMemo, useRef } from "react";
import { useMotionValueEvent, useScroll } from "framer-motion";

const BEAR_IMAGES = [
  "images/데코요소/하리보 풋터1.png",
  "images/데코요소/하리보 풋터2.png",
  "images/데코요소/하리보 풋터3.png",
  "images/데코요소/하리보 풋터4.png",
];
const TRIGGER_PROGRESS = 0.6;
const GRAVITY = 0.9;
const BOUNCE_DAMPING = 0.55;
const REST_VELOCITY = 0.6;

function randomBetween(min, max) {
  return min + Math.random() * (max - min);
}

function createBears() {
  const count = Math.floor(randomBetween(7, 10)); // 7~9
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    image: BEAR_IMAGES[Math.floor(Math.random() * BEAR_IMAGES.length)],
    left: randomBetween(2, 90), // %
    size: randomBetween(67, 134), // px (base 48~96 + 40%)
    rotation: randomBetween(-35, 35), // deg
    startDelay: randomBetween(0, 400), // ms, staggered fall
    startY: randomBetween(-260, -80), // px, resting spot above footer while idle
  }));
}

export default function FallingBears({ containerRef }) {
  const bears = useMemo(createBears, []);
  const bearElsRef = useRef([]);
  const physicsRef = useRef(
    bears.map((bear) => ({
      y: bear.startY,
      vy: 0,
      rotation: bear.rotation,
      vr: randomBetween(-2, 2),
      started: false,
      settled: false,
    })),
  );
  const triggeredRef = useRef(false);
  const rafRef = useRef(null);

  // Footer is the last section on the page, so its bottom can never scroll
  // past the viewport top ("end start" is unreachable for a trailing,
  // viewport-sized section). Track how far the footer has scrolled up into
  // the viewport instead: 0 = just entering from the bottom, 1 = its own
  // bottom edge reaches the viewport bottom (== end of page scroll).
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function startFalling() {
    if (triggeredRef.current) return;
    triggeredRef.current = true;

    bears.forEach((bear, i) => {
      const el = bearElsRef.current[i];
      if (el) el.style.opacity = "1";
      window.setTimeout(() => {
        physicsRef.current[i].started = true;
      }, bear.startDelay);
    });

    const tick = () => {
      const floorHeight = containerRef.current ? containerRef.current.clientHeight : 0;
      let stillMoving = false;

      bears.forEach((bear, i) => {
        const p = physicsRef.current[i];
        const el = bearElsRef.current[i];
        if (!p.started || p.settled || !el) {
          if (!p.settled) stillMoving = true;
          return;
        }

        p.vy += GRAVITY;
        p.y += p.vy;

        const restY = floorHeight - bear.size / 2;
        if (p.y >= restY) {
          p.y = restY;
          p.vy = -p.vy * BOUNCE_DAMPING;
          p.vr *= BOUNCE_DAMPING;
          if (Math.abs(p.vy) < REST_VELOCITY) {
            p.vy = 0;
            p.vr = 0;
            p.settled = true;
          }
        }

        p.rotation += p.vr;
        el.style.transform = `translate3d(0, ${p.y}px, 0) rotate(${p.rotation}deg)`;

        if (!p.settled) stillMoving = true;
      });

      if (stillMoving) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!triggeredRef.current && latest >= TRIGGER_PROGRESS) {
      startFalling();
    }
  });

  return (
    <div className="footer-jelly-row" aria-hidden="true">
      {bears.map((bear, i) => (
        <img
          key={bear.id}
          ref={(el) => (bearElsRef.current[i] = el)}
          src={bear.image}
          alt=""
          className="footer-jelly"
          style={{
            left: `${bear.left}%`,
            width: `${bear.size}px`,
            height: `${bear.size}px`,
            opacity: 0,
            transform: `translate3d(0, ${bear.startY}px, 0) rotate(${bear.rotation}deg)`,
          }}
        />
      ))}
    </div>
  );
}
