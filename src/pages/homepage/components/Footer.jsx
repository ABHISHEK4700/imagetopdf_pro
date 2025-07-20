import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Conversion Studio", path: "/conversion-studio" },
        { name: "Templates", path: "/templates" },
        { name: "API Documentation", path: "/api" },
        { name: "Pricing", path: "/pricing" },
        { name: "Enterprise", path: "/enterprise" }
      ]
    },
    {
      title: "Resources",
      links: [
        { name: "Help Center", path: "/help" },
        { name: "Tutorials", path: "/tutorials" },
        { name: "Blog", path: "/blog" },
        { name: "Community", path: "/community" },
        { name: "Status Page", path: "/status" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Press Kit", path: "/press" },
        { name: "Contact", path: "/contact" },
        { name: "Partners", path: "/partners" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Cookie Policy", path: "/cookies" },
        { name: "Security", path: "/security" },
        { name: "Compliance", path: "/compliance" }
      ]
    }
  ];

  const socialLinks = [
    { name: "Twitter", icon: "Twitter", url: "https://twitter.com/imagetopdfpro" },
    { name: "LinkedIn", icon: "Linkedin", url: "https://linkedin.com/company/imagetopdfpro" },
    { name: "GitHub", icon: "Github", url: "https://github.com/imagetopdfpro" },
    { name: "YouTube", icon: "Youtube", url: "https://youtube.com/imagetopdfpro" }
  ];

  const trustBadges = [
    {
      name: "SOC 2 Certified",
      icon: "Shield",
      description: "Security & Availability"
    },
    {
      name: "GDPR Compliant",
      icon: "Lock",
      description: "Data Protection"
    },
    {
      name: "SSL Secured",
      icon: "Key",
      description: "Encrypted Transfer"
    }
  ];

  return (
    <footer className="bg-trust text-trust-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h3 className="text-brand-value text-2xl font-semibold">
                Stay Updated with ImageToPDF Pro
              </h3>
              <p className="text-white/80 text-lg">
                Get the latest features, security updates, and conversion tips delivered to your inbox.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                  />
                </div>
                <Button
                  variant="default"
                  size="lg"
                  iconName="ArrowRight"
                  iconPosition="right"
                  className="bg-white text-trust hover:bg-white/90 px-6"
                >
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-white/60">
                No spam, unsubscribe at any time. Read our{' '}
                <Link to="/privacy" className="underline hover:text-white">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/homepage" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <Icon name="FileImage" size={28} color="var(--color-trust)" strokeWidth={2.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={12} color="white" strokeWidth={3} />
                </div>
              </div>
              <div>
                <h2 className="text-xl font-bold">ImageToPDF Pro</h2>
                <p className="text-sm text-white/80">Digital Craftsmanship</p>
              </div>
            </Link>
            
            <p className="text-white/80 leading-relaxed">
              Transform images to professional PDFs with enterprise-grade security. 
              Trusted by 2.5M+ users worldwide for reliable, high-quality conversions.
            </p>

            {/* Trust Badges */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-white/90">Security & Compliance:</p>
              <div className="flex flex-wrap gap-3">
                {trustBadges.map((badge) => (
                  <div
                    key={badge.name}
                    className="flex items-center space-x-2 bg-white/10 px-3 py-2 rounded-lg"
                  >
                    <Icon name={badge.icon} size={16} color="var(--color-success)" />
                    <div>
                      <p className="text-xs font-medium">{badge.name}</p>
                      <p className="text-xs text-white/60">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-white">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-white/80 hover:text-white transition-brand text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-white/80">
              <p>© {currentYear} ImageToPDF Pro. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <Link to="/privacy" className="hover:text-white transition-brand">
                  Privacy
                </Link>
                <Link to="/terms" className="hover:text-white transition-brand">
                  Terms
                </Link>
                <Link to="/cookies" className="hover:text-white transition-brand">
                  Cookies
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-white/80">Follow us:</span>
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-brand"
                  aria-label={social.name}
                >
                  <Icon name={social.icon} size={20} color="white" />
                </a>
              ))}
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-white/10">
            <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Icon name="Globe" size={16} color="var(--color-success)" />
                  <span className="text-sm font-medium text-white/90">Global Service</span>
                </div>
                <p className="text-xs text-white/60">
                  Available in 25+ languages with 99.9% uptime worldwide
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Icon name="Clock" size={16} color="var(--color-success)" />
                  <span className="text-sm font-medium text-white/90">24/7 Support</span>
                </div>
                <p className="text-xs text-white/60">
                  Round-the-clock assistance for all your conversion needs
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start space-x-2">
                  <Icon name="Zap" size={16} color="var(--color-success)" />
                  <span className="text-sm font-medium text-white/90">Lightning Fast</span>
                </div>
                <p className="text-xs text-white/60">
                  Average conversion time under 3 seconds per file
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;