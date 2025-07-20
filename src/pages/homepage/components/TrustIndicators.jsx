import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrustIndicators = () => {
  const securityFeatures = [
    {
      id: 1,
      icon: "Shield",
      title: "SOC 2 Type II Certified",
      description: "Independently audited security controls and processes",
      badge: "Certified"
    },
    {
      id: 2,
      icon: "Lock",
      title: "GDPR Compliant",
      description: "Full compliance with European data protection regulations",
      badge: "Compliant"
    },
    {
      id: 3,
      icon: "Key",
      title: "256-bit SSL Encryption",
      description: "Bank-grade encryption for all file transfers and storage",
      badge: "Encrypted"
    },
    {
      id: 4,
      icon: "Clock",
      title: "24-Hour Auto-Delete",
      description: "Your files are automatically deleted after 24 hours",
      badge: "Automatic"
    }
  ];

  const stats = [
    {
      id: 1,
      value: "50M+",
      label: "Files Converted",
      description: "This month alone",
      icon: "FileImage"
    },
    {
      id: 2,
      value: "2.5M+",
      label: "Active Users",
      description: "Worldwide",
      icon: "Users"
    },
    {
      id: 3,
      value: "99.9%",
      label: "Uptime",
      description: "Last 12 months",
      icon: "Activity"
    },
    {
      id: 4,
      value: "4.9★",
      label: "User Rating",
      description: "Based on 50K+ reviews",
      icon: "Star"
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "SOC 2 Type II",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=120&h=80&fit=crop",
      description: "Security & Availability"
    },
    {
      id: 2,
      name: "GDPR",
      image: "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?w=120&h=80&fit=crop",
      description: "Data Protection"
    },
    {
      id: 3,
      name: "ISO 27001",
      image: "https://images.pixabay.com/photo/2017/07/10/23/49/club-2492011_1280.jpg?w=120&h=80&fit=crop",
      description: "Information Security"
    },
    {
      id: 4,
      name: "SSL Certificate",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=120&h=80&fit=crop",
      description: "Secure Transmission"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Sarah Chen",
      role: "Marketing Director",
      company: "TechCorp",
      content: "ImageToPDF Pro has transformed our document workflow. The security features give us complete peace of mind when handling client materials.",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Freelance Designer",
      company: "Independent",
      content: "The template library is incredible. I can create professional presentations in minutes instead of hours. Game changer for my business.",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Emily Watson",
      role: "Project Manager",
      company: "Global Solutions Inc",
      content: "Batch processing saves us hours every week. The API integration was seamless and their support team is outstanding.",
      avatar: "https://randomuser.me/api/portraits/women/28.jpg",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Security Features */}
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="ShieldCheck" size={16} />
            <span>Enterprise-Grade Security</span>
          </div>
          
          <h2 className="text-brand-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Your Files Are{' '}
            <span className="bg-gradient-to-r from-success to-green-600 bg-clip-text text-transparent">
              100% Secure
            </span>
          </h2>
          
          <p className="text-brand-body text-xl text-muted-foreground max-w-3xl mx-auto">
            We take security seriously. Every file is encrypted, processed securely, 
            and automatically deleted. Your privacy is our priority.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {securityFeatures.map((feature, index) => (
            <div
              key={feature.id}
              className="trust-badge"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                    <Icon name={feature.icon} size={24} color="var(--color-success)" strokeWidth={2} />
                  </div>
                  <span className="bg-success/10 text-success px-2 py-1 rounded-full text-xs font-medium">
                    {feature.badge}
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-brand-value font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-20 shadow-brand">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={stat.id}
                className="text-center space-y-3"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={stat.icon} size={24} color="var(--color-primary)" strokeWidth={2} />
                </div>
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm font-medium text-foreground">{stat.label}</p>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="space-y-12 mb-20">
          <div className="text-center space-y-4">
            <h3 className="text-brand-value text-2xl font-semibold text-foreground">
              Certified & Compliant
            </h3>
            <p className="text-muted-foreground">
              Independently verified security and compliance standards
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.id}
                className="bg-card border border-border rounded-xl p-6 text-center space-y-4 hover-float transition-brand"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-12 mx-auto rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={cert.image}
                    alt={cert.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <p className="font-medium text-foreground text-sm">{cert.name}</p>
                  <p className="text-xs text-muted-foreground">{cert.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-brand-value text-2xl font-semibold text-foreground">
              Trusted by Professionals
            </h3>
            <p className="text-muted-foreground">
              See what our users say about security and reliability
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-card border border-border rounded-xl p-6 space-y-4 hover-float transition-brand"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Rating */}
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icon key={i} name="Star" size={16} color="var(--color-warning)" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3 pt-4 border-t border-border">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustIndicators;