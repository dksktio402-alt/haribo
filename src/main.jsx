import { createRoot } from "react-dom/client";
import Footer from "./Footer.jsx";

const container = document.getElementById("footer-root");
if (container) {
  createRoot(container).render(<Footer />);
}
