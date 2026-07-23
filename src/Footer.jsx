import { useRef } from "react";
import FallingBears from "./FallingBears.jsx";

export default function Footer() {
  const footerRef = useRef(null);

  return (
    <footer className="footer-section" ref={footerRef}>
      <FallingBears containerRef={footerRef} />

      <img className="footer-logo" src="images/공식 이미지/haribo-logo.png" alt="HARIBO logo" />

      <div className="footer-social">
        <a className="footer-social-icon footer-social-icon--facebook" href="#" aria-label="Facebook">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15.5 8.5H13.75V7C13.75 6.31 13.94 5.85 14.91 5.85H15.5V3.34C15.16 3.3 14.5 3.24 13.73 3.24C12.11 3.24 11 4.23 11 6.05V8.5H9.25V11.15H11V20.5H13.75V11.15H15.28L15.5 8.5Z"
              fill="currentColor"
            />
          </svg>
        </a>
        <a className="footer-social-icon footer-social-icon--instagram" href="#" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
            <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
          </svg>
        </a>
      </div>

      <ul className="footer-col footer-col--faq">
        <li className="footer-link footer-link--bold">자주 묻는 질문 (FAQ)</li>
        <li className="footer-link">고객지원</li>
        <li className="footer-link">기업책임</li>
      </ul>

      <ul className="footer-col footer-col--legal">
        <li className="footer-link">법적 고지</li>
        <li className="footer-link">접근성 선언</li>
        <li className="footer-link">개인정보처리방침</li>
        <li className="footer-link">이용약관</li>
      </ul>

      <div className="footer-col footer-col--contact">
        <p className="footer-link">소비자 서비스 팀</p>
        <a className="footer-phone" href="tel:+82225788385">
          +82 2-578-8385
        </a>
      </div>
    </footer>
  );
}
