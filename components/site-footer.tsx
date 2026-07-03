const LINKEDIN_URL = "https://www.linkedin.com/company/getstoqr";

export default function SiteFooter() {
  return (
    <footer className="foot">
      <div className="sq-wrap foot-inner">
        <div className="foot-left">
          <span className="foot-brand">STOQR</span>
          <span className="foot-copy">© 2026 Stoqr Singapore Pte. Ltd. All rights reserved.</span>
        </div>
        <div className="foot-right">
          <a href={LINKEDIN_URL}>LinkedIn ↗</a>
        </div>
      </div>
    </footer>
  );
}
