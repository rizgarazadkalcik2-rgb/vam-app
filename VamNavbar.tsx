export default function VamNavbar() {
  return (
    <nav className="vc-navbar">
      <a className="vc-logo" href="/platform">
        VAM<small>Visit Anatolia &amp; Mesopotamia</small>
      </a>
      <div className="vc-nav-links">
        <a href="/platform">Ana Sayfa</a>
        <a href="/destinations">Destinasyonlar</a>
        <a href="/bundles">Paketler</a>
        <a href="/experiences">Deneyimler</a>
        <a href="/match-weekends">Match Weekends</a>
        <a href="/about">Hakkımızda</a>
      </div>
      <a className="vc-btn-cta" href="/bundles">
        Rezervasyon
      </a>
    </nav>
  );
}
