import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureShowcase = () => {
  const features = [
    {
      id: 1,
      icon: "Shield",
      title: "Enterprise-Grade Security",
      description: "Military-level encryption with SOC 2 compliance. Your files are processed with bank-grade security protocols and automatically deleted after 24 hours.",
      highlights: ["256-bit SSL encryption", "SOC 2 Type II certified", "GDPR compliant", "Zero data retention"],
      color: "success"
    },
    {
      id: 2,
      icon: "Layout",
      title: "Professional Templates",
      description: "Transform simple conversions into polished documents with our curated template library. Perfect for presentations, portfolios, and business documents.",
      highlights: ["50+ premium templates", "Custom branding options", "Responsive layouts", "Print-ready quality"],
      color: "primary"
    },
    {
      id: 3,
      icon: "Layers",
      title: "Batch Processing",
      description: "Convert hundreds of images simultaneously with intelligent optimization. Advanced compression algorithms ensure perfect quality-to-size ratio.",
      highlights: ["Unlimited batch size", "Smart compression", "Format optimization", "Progress tracking"],
      color: "warning"
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      success: {
        bg: "bg-success/10",
        border: "border-success/20",
        icon: "var(--color-success)",
        accent: "text-success"
      },
      primary: {
        bg: "bg-primary/10",
        border: "border-primary/20",
        icon: "var(--color-primary)",
        accent: "text-primary"
      },
      warning: {
        bg: "bg-warning/10",
        border: "border-warning/20",
        icon: "var(--color-warning)",
        accent: "text-warning"
      }
    };
    return colorMap[color];
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="Star" size={16} />
            <span>Trusted by 2.5M+ Users Worldwide</span>
          </div>
          
          <h2 className="text-brand-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Why Choose ImageToPDF Pro?
          </h2>
          
          <p className="text-brand-body text-xl text-muted-foreground max-w-3xl mx-auto">
            We've reimagined file conversion from the ground up. Every feature is designed 
            to save you time while delivering professional results you can trust.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const colors = getColorClasses(feature.color);
            
            return (
              <div
                key={feature.id}
                className="group bg-card border border-border rounded-2xl p-8 shadow-brand hover-float transition-brand"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="space-y-6">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${colors.bg} ${colors.border} border rounded-xl flex items-center justify-center group-hover:scale-110 transition-brand`}>
                    <Icon name={feature.icon} size={32} color={colors.icon} strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-brand-value text-xl font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    
                    <p className="text-brand-body text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {feature.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <div className={`w-5 h-5 ${colors.bg} rounded-full flex items-center justify-center`}>
                            <Icon name="Check" size={12} color={colors.icon} strokeWidth={3} />
                          </div>
                          <span className="text-sm text-muted-foreground">{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learn More Link */}
                  <div className="pt-4 border-t border-border">
                    <button className={`flex items-center space-x-2 ${colors.accent} font-medium text-sm hover:underline transition-brand`}>
                      <span>Learn more</span>
                      <Icon name="ArrowRight" size={16} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-2xl p-8 border border-primary/20">
            <div className="space-y-4">
              <h3 className="text-brand-value text-2xl font-semibold text-foreground">
                Ready to experience the difference?
              </h3>
              <p className="text-muted-foreground">
                Join millions of users who trust ImageToPDF Pro for their conversion needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={16} color="var(--color-success)" />
                    <span>2.5M+ users</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} color="var(--color-warning)" />
                    <span>4.9/5 rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Shield" size={16} color="var(--color-success)" />
                    <span>SOC 2 certified</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;