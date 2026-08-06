import { createRoot } from "react-dom/client";
import EventSection from "./EventSection.jsx";
import Footer from "./Footer.jsx";

const footerContainer = document.getElementById("footer-root");
if (footerContainer) {
  createRoot(footerContainer).render(<Footer />);
}

const eventContainer = document.getElementById("event-root");
if (eventContainer) {
  createRoot(eventContainer).render(<EventSection />);
}
