import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import HeroSection from './components/HeroSection';
import FeatureShowcase from './components/FeatureShowcase';
import TemplateGallery from './components/TemplateGallery';
import PricingTeaser from './components/PricingTeaser';
import TrustIndicators from './components/TrustIndicators';
import Footer from './components/Footer';

const Homepage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>ImageToPDF Pro - Transform Images to Professional PDFs in Seconds</title>
        <meta 
          name="description" 
          content="Convert images to high-quality PDFs with enterprise-grade security. 50M+ files converted, SOC 2 certified, GDPR compliant. Start free today!" 
        />
        <meta name="keywords" content="image to pdf, convert images, pdf converter, professional pdf, secure conversion, batch processing" />
        <meta property="og:title" content="ImageToPDF Pro - Professional Image to PDF Conversion" />
        <meta property="og:description" content="Transform images to professional PDFs with military-grade security. Trusted by 2.5M+ users worldwide." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://imagetopdfpro.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="ImageToPDF Pro - Professional PDF Conversion" />
        <meta name="twitter:description" content="Convert images to professional PDFs in seconds. Enterprise security, premium templates, batch processing." />
        <link rel="canonical" href="https://imagetopdfpro.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section with Conversion Widget */}
          <HeroSection />

          {/* Feature Showcase */}
          <FeatureShowcase />

          {/* Template Gallery Preview */}
          <TemplateGallery />

          {/* Trust Indicators & Security */}
          <TrustIndicators />

          {/* Pricing Teaser */}
          <PricingTeaser />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Homepage;