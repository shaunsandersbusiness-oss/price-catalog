import { useEffect } from 'react';

export default function Navbar() {
  useEffect(() => {
    const hamburger = document.getElementById('navHamburger');
    const navLinks = document.getElementById('navLinks');
    const overlay = document.getElementById('navOverlay');
    
    if (!hamburger || !navLinks || !overlay) return;

    function openMenu() { 
      hamburger!.classList.add('open'); 
      navLinks!.classList.add('open'); 
      overlay!.classList.add('open'); 
      document.body.style.overflow = 'hidden'; 
    }
    
    function closeMenu() { 
      hamburger!.classList.remove('open'); 
      navLinks!.classList.remove('open'); 
      overlay!.classList.remove('open'); 
      document.body.style.overflow = ''; 
    }
    
    const handleHamburgerClick = () => navLinks!.classList.contains('open') ? closeMenu() : openMenu();
    hamburger.addEventListener('click', handleHamburgerClick);
    overlay.addEventListener('click', closeMenu);
    
    const links = navLinks.querySelectorAll('.nav-link');
    links.forEach(link => link.addEventListener('click', closeMenu));

    return () => {
      hamburger.removeEventListener('click', handleHamburgerClick);
      overlay.removeEventListener('click', closeMenu);
      links.forEach(link => link.removeEventListener('click', closeMenu));
    };
  }, []);

  return (
    <>
      <nav className="regalis-nav" id="regalisNav">
        <div className="nav-inner">
          <a href="https://www.regalisrealtymedia.com" className="nav-logo">
            <img src="https://cdn.prod.website-files.com/6695980889d8d99cedb29bc7/677588ce72f981235e0deeb9_Regalis%20Realty%20Logo%20Symbol.png" alt="Regalis Realty Media" className="nav-logo-img" />
          </a>
          <div className="nav-links" id="navLinks">
            <a href="https://www.regalisrealtymedia.com" className="nav-link">Home</a>
            <a href="https://regalisrealtymedia25.pixieset.com/regalisrealtymediaportfolio/compassphotos/" className="nav-link" target="_blank" rel="noopener noreferrer">Portfolio</a>
            <a href="https://pricing.regalisrealtymedia.com" className="nav-link">Pricing</a>
            <a href="https://calculator.regalisrealtymedia.com" className="nav-link">Calculator</a>
            <a href="https://catalog.regalisrealtymedia.com" className="nav-link active">Catalog</a>
            <a href="https://branding.regalisrealtymedia.com" className="nav-link">Branding</a>
            <a href="https://portal.regalisrealtymedia.com" className="nav-link">Portal</a>
            <a href="https://contactus.regalisrealtymedia.com" className="nav-link">Contact</a>
            <a href="https://prep.regalisrealtymedia.com" className="nav-link">Listing Checklist</a>
          </div>
          <button className="nav-hamburger" id="navHamburger" aria-label="Toggle menu">
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </nav>
      <div className="nav-overlay" id="navOverlay"></div>
    </>
  );
}
