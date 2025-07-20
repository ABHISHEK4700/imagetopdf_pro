import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingTeaser = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for occasional conversions',
      features: [
        'Up to 5 conversions per day',
        'Basic image formats (JPG, PNG)',
        'Standard PDF quality',
        '24-hour file retention',
        'Basic templates',
        'Email support'
      ],
      limitations: [
        'Watermark on PDFs',
        'No batch processing',
        'Limited file size (5MB)'
      ],
      cta: 'Start Free',
      popular: false,
      color: 'secondary'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: '$9.99',
      period: 'per month',
      description: 'For professionals and small teams',
      features: [
        'Unlimited conversions',
        'All image formats supported',
        'High-quality PDF output',
        'No watermarks',
        'Batch processing up to 100 files',
        'Premium templates library',
        'Priority support',
        'Cloud storage integration',
        'Custom branding options'
      ],
      limitations: [],
      cta: 'Start Pro Trial',
      popular: true,
      color: 'primary'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 'Custom',
      period: 'pricing',
      description: 'For large organizations',
      features: [
        'Everything in Pro',
        'Unlimited batch processing',
        'API access',
        'White-label solution',
        'Advanced security features',
        'Dedicated account manager',
        'SLA guarantee',
        'Custom integrations',
        'Team collaboration tools'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      color: 'warning'
    }
  ];

  const handlePlanSelect = (plan) => {
    if (plan.id === 'free') {
      navigate('/conversion-studio');
    } else if (plan.id === 'enterprise') {
      // Would typically open contact form
      console.log('Contact sales for enterprise plan');
    } else {
      // Would typically open payment flow
      console.log(`Starting ${plan.name} plan subscription`);
    }
  };

  const getColorClasses = (color, isPopular = false) => {
    if (isPopular) {
      return {
        border: 'border-primary shadow-conversion',
        bg: 'bg-gradient-to-br from-primary/5 to-primary/10',
        badge: 'bg-primary text-primary-foreground',
        cta: 'cta-primary'
      };
    }

    const colorMap = {
      secondary: {
        border: 'border-border',
        bg: 'bg-card',
        badge: 'bg-secondary text-secondary-foreground',
        cta: 'bg-secondary text-secondary-foreground hover:bg-secondary/90'
      },
      primary: {
        border: 'border-primary/20',
        bg: 'bg-card',
        badge: 'bg-primary text-primary-foreground',
        cta: 'cta-primary'
      },
      warning: {
        border: 'border-warning/20',
        bg: 'bg-card',
        badge: 'bg-warning text-warning-foreground',
        cta: 'bg-warning text-warning-foreground hover:bg-warning/90'
      }
    };
    return colorMap[color];
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="DollarSign" size={16} />
            <span>No Hidden Fees • Cancel Anytime</span>
          </div>
          
          <h2 className="text-brand-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Choose Your{' '}
            <span className="bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
              Perfect Plan
            </span>
          </h2>
          
          <p className="text-brand-body text-xl text-muted-foreground max-w-3xl mx-auto">
            Start free and upgrade when you need more power. All plans include our core security 
            features and 99.9% uptime guarantee.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => {
            const colors = getColorClasses(plan.color, plan.popular);
            
            return (
              <div
                key={plan.id}
                className={`relative ${colors.bg} ${colors.border} border rounded-2xl p-8 hover-float transition-brand`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className={`${colors.badge} px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1`}>
                      <Icon name="Star" size={14} />
                      <span>Most Popular</span>
                    </div>
                  </div>
                )}

                <div className="space-y-6">
                  {/* Plan Header */}
                  <div className="space-y-2">
                    <h3 className="text-brand-value text-xl font-semibold text-foreground">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </div>

                  {/* Pricing */}
                  <div className="space-y-1">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-3xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
                    {plan.id === 'pro' && (
                      <p className="text-xs text-success">
                        7-day free trial • No credit card required
                      </p>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium text-foreground">
                      What's included:
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <div className="w-5 h-5 bg-success/10 rounded-full flex items-center justify-center mt-0.5">
                            <Icon name="Check" size={12} color="var(--color-success)" strokeWidth={3} />
                          </div>
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Limitations */}
                    {plan.limitations.length > 0 && (
                      <div className="pt-3 border-t border-border">
                        <ul className="space-y-2">
                          {plan.limitations.map((limitation, idx) => (
                            <li key={idx} className="flex items-start space-x-3">
                              <div className="w-5 h-5 bg-muted rounded-full flex items-center justify-center mt-0.5">
                                <Icon name="Minus" size={12} color="var(--color-muted-foreground)" strokeWidth={2} />
                              </div>
                              <span className="text-sm text-muted-foreground">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <Button
                    variant={plan.popular ? "default" : "outline"}
                    fullWidth
                    size="lg"
                    iconName={plan.id === 'enterprise' ? 'Phone' : 'ArrowRight'}
                    iconPosition="right"
                    className={plan.popular ? colors.cta : ''}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    {plan.cta}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="text-center space-y-8">
          {/* Money Back Guarantee */}
          <div className="bg-success/5 border border-success/20 rounded-xl p-6">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Icon name="Shield" size={24} color="var(--color-success)" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-success">30-Day Money Back Guarantee</p>
                  <p className="text-sm text-muted-foreground">Not satisfied? Get a full refund, no questions asked</p>
                </div>
              </div>
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="CreditCard" size={16} />
                  <span>Secure payments</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Lock" size={16} />
                  <span>SSL encrypted</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Teaser */}
          <div className="space-y-4">
            <h3 className="text-brand-value text-lg font-semibold text-foreground">
              Questions about pricing?
            </h3>
            <p className="text-muted-foreground">
              Check our FAQ or contact our sales team for custom enterprise solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" iconName="HelpCircle" iconPosition="left">
                View FAQ
              </Button>
              <Button variant="outline" iconName="MessageCircle" iconPosition="left">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTeaser;