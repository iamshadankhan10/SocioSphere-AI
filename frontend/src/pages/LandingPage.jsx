import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext.jsx';
import { features, pricingPlans } from '../data/dummyData.js';
import { Building2, Menu, X, Sun, Moon, ArrowRight, Play, Check,
  Users, UserCheck, MessageSquareWarning, Wrench, CreditCard, Megaphone, Mail, Phone, MapPin } from 'lucide-react';

const iconMap = { Users, UserCheck, MessageSquareWarning, Wrench, CreditCard, Megaphone };

export default function LandingPage() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="landing">
      {/* Navbar */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <Link to="/" className="landing-logo">
            <div className="landing-logo-icon"><Building2 size={20} /></div>
            <span className="landing-logo-text">SocioSphere <span>AI</span></span>
          </Link>

          <div className="landing-nav-links">
            <a href="#features" className="landing-nav-link">Features</a>
            <a href="#pricing" className="landing-nav-link">Pricing</a>
            <a href="#contact" className="landing-nav-link">Contact</a>
          </div>

          <div className="landing-nav-actions">
            <button className="btn btn-ghost btn-icon" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <Link to="/login" className="btn btn-outline btn-sm">Log In</Link>
            <Link to="/signup" className="btn btn-primary btn-sm">Get Started</Link>
            <button className="btn btn-ghost btn-icon" style={{ display: 'none' }} onClick={() => setMobileOpen(p => !p)}>
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-glow">
          <div className="hero-glow-1" />
          <div className="hero-glow-2" />
          <div className="hero-glow-3" />
        </div>
        <div className="hero-inner">
          <div className="hero-badge">
            <div className="hero-badge-dot" />
            Now with AI-Powered Insights
          </div>
          <h1 className="hero-title">
            Smart Society Management{' '}
            <span className="hero-title-grad">Made Simple</span>
          </h1>
          <p className="hero-sub">
            Manage your residential society effortlessly. From visitor tracking to maintenance payments —
            everything in one intelligent platform.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn btn-primary btn-lg">
              Get Started Free <ArrowRight size={18} />
            </Link>
            <button className="btn btn-outline btn-lg">
              <Play size={18} /> Watch Demo
            </button>
          </div>
          <p className="hero-trust">
            Trusted by <strong>500+</strong> societies across India
          </p>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ background: 'var(--bg-muted)' }}>
        <div className="section">
          <div className="section-header center">
            <p className="section-label">Features</p>
            <h2 className="section-title">Everything You Need to Manage Your Society</h2>
            <p className="section-sub">Comprehensive tools designed to make society management effortless and efficient.</p>
          </div>
          <div className="features-grid">
            {features.map(f => {
              const Icon = iconMap[f.icon];
              return (
                <div key={f.title} className="feature-card">
                  <div className="feature-icon">{Icon && <Icon size={24} />}</div>
                  <h3 className="feature-title">{f.title}</h3>
                  <p className="feature-desc">{f.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="pricing-section">
        <div className="section">
          <div className="section-header center">
            <p className="section-label">Pricing</p>
            <h2 className="section-title">Simple, Transparent Pricing</h2>
            <p className="section-sub">Choose the plan that fits your society. No hidden charges.</p>
          </div>
          <div className="pricing-grid">
            {pricingPlans.map(plan => (
              <div key={plan.name} className={`pricing-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="pricing-popular-badge">Most Popular</div>}
                <div className="pricing-name">{plan.name}</div>
                <div className="pricing-price">
                  {plan.price}
                  {plan.period && <span className="pricing-period">{plan.period}</span>}
                </div>
                <p className="pricing-desc">{plan.description}</p>
                <ul className="pricing-features">
                  {plan.features.map(f => (
                    <li key={f} className="pricing-feature">
                      <Check size={16} className="pricing-check" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/signup" className={`btn ${plan.popular ? 'btn-primary' : 'btn-outline'} btn-lg w-full`} style={{ textAlign: 'center', display: 'flex' }}>
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <Link to="/" className="landing-logo" style={{ marginBottom: 12 }}>
                <div className="landing-logo-icon"><Building2 size={18} /></div>
                <span className="landing-logo-text">SocioSphere <span>AI</span></span>
              </Link>
              <p>Making society management smarter, simpler, and more efficient with the power of AI.</p>
            </div>
            <div>
              <div className="footer-col-title">Product</div>
              <ul className="footer-links">
                {['Features', 'Pricing', 'Integrations', 'Changelog'].map(i => (
                  <li key={i}><a href="#" className="footer-link">{i}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Company</div>
              <ul className="footer-links">
                {['About Us', 'Blog', 'Careers', 'Contact'].map(i => (
                  <li key={i}><a href="#" className="footer-link">{i}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <div className="footer-col-title">Contact</div>
              <ul className="footer-links">
                <li style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14, color: 'var(--fg-muted)' }}><Mail size={14} /> hello@sociosphere.ai</li>
                <li style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14, color: 'var(--fg-muted)' }}><Phone size={14} /> +91 98765 43210</li>
                <li style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 14, color: 'var(--fg-muted)' }}><MapPin size={14} /> Mumbai, India</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            © {new Date().getFullYear()} SocioSphere AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
