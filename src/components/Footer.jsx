import { MapPin, Clock, Phone, Heart } from 'lucide-react'
import AnimatedBrandLogo from './AnimatedBrandLogo'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__grid">
          {/* Brand & Mission */}
          <div className="footer__brand-col">
            <AnimatedBrandLogo size={28} />
            <p className="footer__mission">
              BeSneaky Cafe is an independent specialty coffee roastery crafting precision extractions, nitro cold brews, and single-origin pour-overs for coffee lovers everywhere.
            </p>
          </div>

          {/* Location & Hours */}
          <div className="footer__col" id="visit">
            <h4 className="footer__title">Gurugram Coffee Bar</h4>
            <div className="footer__info-item">
              <MapPin size={15} className="footer-icon" />
              <span>DLF Phase IV, Gurugram, Haryana 122002</span>
            </div>
            <div className="footer__info-item">
              <Clock size={15} className="footer-icon" />
              <span>Mon-Sun: 7:00 AM – 10:30 PM</span>
            </div>
            <div className="footer__info-item">
              <Phone size={15} className="footer-icon" />
              <span>+91 124 404 0888</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__col">
            <h4 className="footer__title">Explore Vault</h4>
            <ul className="footer__links">
              <li><a href="#shop">Single Origin Espresso</a></li>
              <li><a href="#shop">Nitro Cold Brews</a></li>
              <li><a href="#about">Direct Trade Sourcing</a></li>
              <li><a href="#anatomy">Coffee Vault & Layer Explorer</a></li>
            </ul>
          </div>
        </div>

        {/* Sub-footer copyright */}
        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} BeSneaky Artisan Cafe & Roastery. All Rights Reserved.</p>
          <p className="footer__crafted">
            Crafted with <Heart size={12} className="heart-icon" /> for Coffee Connoisseurs.
          </p>
        </div>
      </div>
    </footer>
  )
}
