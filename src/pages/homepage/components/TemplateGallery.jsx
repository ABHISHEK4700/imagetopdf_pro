import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TemplateGallery = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Templates', icon: 'Grid3X3' },
    { id: 'business', name: 'Business', icon: 'Briefcase' },
    { id: 'portfolio', name: 'Portfolio', icon: 'Image' },
    { id: 'presentation', name: 'Presentation', icon: 'Monitor' },
    { id: 'document', name: 'Document', icon: 'FileText' }
  ];

  const templates = [
    {
      id: 1,
      name: "Executive Presentation",
      category: "business",
      description: "Professional slides with corporate branding and data visualization layouts",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      isPremium: false,
      downloads: "12.5K",
      rating: 4.9
    },
    {
      id: 2,
      name: "Creative Portfolio",
      category: "portfolio",
      description: "Showcase your work with elegant layouts and typography",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?w=400&h=300&fit=crop",
      isPremium: true,
      downloads: "8.2K",
      rating: 4.8
    },
    {
      id: 3,
      name: "Technical Documentation",
      category: "document",
      description: "Clean, structured layouts perfect for manuals and guides",
      image: "https://images.pixabay.com/photo/2016/11/30/20/58/programming-1873854_1280.jpg?w=400&h=300&fit=crop",
      isPremium: false,
      downloads: "15.1K",
      rating: 4.9
    },
    {
      id: 4,
      name: "Marketing Proposal",
      category: "business",
      description: "Compelling layouts designed to win clients and close deals",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      isPremium: true,
      downloads: "9.7K",
      rating: 4.7
    },
    {
      id: 5,
      name: "Product Showcase",
      category: "presentation",
      description: "Highlight features and benefits with stunning visual layouts",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?w=400&h=300&fit=crop",
      isPremium: false,
      downloads: "11.3K",
      rating: 4.8
    },
    {
      id: 6,
      name: "Annual Report",
      category: "document",
      description: "Professional financial and performance reporting templates",
      image: "https://images.pixabay.com/photo/2016/11/27/21/42/stock-1863880_1280.jpg?w=400&h=300&fit=crop",
      isPremium: true,
      downloads: "6.9K",
      rating: 4.9
    }
  ];

  const filteredTemplates = activeCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  const handleTemplateSelect = (template) => {
    navigate('/conversion-studio', { state: { selectedTemplate: template } });
  };

  const handleViewAllTemplates = () => {
    navigate('/conversion-studio', { state: { showTemplates: true } });
  };

  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="Palette" size={16} />
            <span>50+ Professional Templates</span>
          </div>
          
          <h2 className="text-brand-headline text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Transform Images into{' '}
            <span className="bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
              Stunning Documents
            </span>
          </h2>
          
          <p className="text-brand-body text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just convert—create. Our professionally designed templates turn your images 
            into polished documents that make an impact.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-brand ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-conversion'
                  : 'bg-card text-muted-foreground hover:text-foreground hover:bg-accent border border-border'
              }`}
            >
              <Icon name={category.icon} size={16} strokeWidth={2} />
              <span>{category.name}</span>
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredTemplates.map((template, index) => (
            <div
              key={template.id}
              className="group bg-card border border-border rounded-2xl overflow-hidden shadow-brand hover-float transition-brand cursor-pointer"
              onClick={() => handleTemplateSelect(template)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Template Preview */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-brand"
                />
                
                {/* Premium Badge */}
                {template.isPremium && (
                  <div className="absolute top-3 right-3 bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <Icon name="Crown" size={12} />
                    <span>Premium</span>
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-brand">
                  <div className="absolute bottom-4 left-4 right-4">
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Eye"
                      iconPosition="left"
                      className="w-full bg-white text-black hover:bg-gray-100"
                    >
                      Preview Template
                    </Button>
                  </div>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6 space-y-4">
                <div className="space-y-2">
                  <h3 className="text-brand-value text-lg font-semibold text-foreground group-hover:text-primary transition-brand">
                    {template.name}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Download" size={12} />
                      <span>{template.downloads}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={12} color="var(--color-warning)" />
                      <span>{template.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-primary">
                    <span>Use Template</span>
                    <Icon name="ArrowRight" size={12} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-brand">
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Plus" size={32} color="var(--color-primary)" />
              </div>
              <h3 className="text-brand-value text-xl font-semibold text-foreground">
                Explore All Templates
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Discover our complete collection of 50+ professional templates designed for every use case
              </p>
              <Button
                variant="default"
                size="lg"
                iconName="ArrowRight"
                iconPosition="right"
                className="cta-primary"
                onClick={handleViewAllTemplates}
              >
                Browse Template Library
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TemplateGallery;