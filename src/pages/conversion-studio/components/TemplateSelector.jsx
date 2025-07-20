import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TemplateSelector = ({ onTemplateSelect, selectedTemplate, isProcessing }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const templates = [
    {
      id: 'default',
      name: 'Default Layout',
      description: 'Simple, clean layout with standard margins',
      icon: 'FileText',
      preview: 'One image per page with automatic scaling',
      category: 'Basic'
    },
    {
      id: 'portfolio',
      name: 'Portfolio Grid',
      description: 'Professional grid layout for showcasing work',
      icon: 'Grid3X3',
      preview: 'Multiple images arranged in a grid format',
      category: 'Professional'
    },
    {
      id: 'presentation',
      name: 'Presentation Slides',
      description: 'Full-page images optimized for presentations',
      icon: 'Monitor',
      preview: 'Full-bleed images with minimal margins',
      category: 'Professional'
    },
    {
      id: 'document',
      name: 'Document Archive',
      description: 'Optimized for scanned documents and text',
      icon: 'FileText',
      preview: 'High contrast with OCR optimization',
      category: 'Archive'
    },
    {
      id: 'collage',
      name: 'Photo Collage',
      description: 'Multiple photos arranged artistically',
      icon: 'Images',
      preview: 'Creative layouts with varied image sizes',
      category: 'Creative'
    },
    {
      id: 'catalog',
      name: 'Product Catalog',
      description: 'Structured layout for product showcases',
      icon: 'Package',
      preview: 'Organized grid with titles and descriptions',
      category: 'Business'
    }
  ];

  const categories = ['All', 'Basic', 'Professional', 'Archive', 'Creative', 'Business'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTemplates = activeCategory === 'All' 
    ? templates 
    : templates.filter(template => template.category === activeCategory);

  const handleTemplateSelect = (template) => {
    onTemplateSelect(template);
    setIsExpanded(false);
  };

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate) || templates[0];

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Layout" size={18} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">PDF Template</h3>
              <p className="text-sm text-muted-foreground">Choose a layout style</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            onClick={() => setIsExpanded(!isExpanded)}
            disabled={isProcessing}
          >
            {isExpanded ? 'Collapse' : 'Browse Templates'}
          </Button>
        </div>
      </div>

      {/* Current Selection */}
      <div className="px-6 py-4">
        <div className="flex items-center space-x-4 p-4 bg-accent/30 border border-border rounded-lg">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name={selectedTemplateData.icon} size={24} color="var(--color-primary)" strokeWidth={2} />
          </div>
          
          <div className="flex-1">
            <h4 className="text-base font-semibold text-foreground">
              {selectedTemplateData.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {selectedTemplateData.description}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {selectedTemplateData.preview}
            </p>
          </div>
          
          <div className="text-right">
            <span className="inline-flex items-center px-2 py-1 bg-success/10 text-success rounded text-xs font-medium">
              <Icon name="Check" size={12} strokeWidth={2} className="mr-1" />
              Selected
            </span>
          </div>
        </div>
      </div>

      {/* Template Gallery */}
      {isExpanded && (
        <div className="border-t border-border">
          {/* Category Filter */}
          <div className="px-6 py-4 border-b border-border bg-accent/20">
            <div className="flex items-center space-x-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  disabled={isProcessing}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-brand ${
                    activeCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                  } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Template Grid */}
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`border border-border rounded-lg p-4 cursor-pointer transition-brand hover-lift ${
                    selectedTemplate === template.id
                      ? 'ring-2 ring-primary bg-primary/5' :'hover:border-primary/50'
                  } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => !isProcessing && handleTemplateSelect(template)}
                >
                  <div className="space-y-3">
                    {/* Template Icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <Icon 
                          name={template.icon} 
                          size={20} 
                          color={selectedTemplate === template.id ? "var(--color-primary)" : "var(--color-muted-foreground)"} 
                          strokeWidth={2} 
                        />
                      </div>
                      
                      <span className="inline-flex items-center px-2 py-1 bg-accent text-muted-foreground rounded text-xs font-medium">
                        {template.category}
                      </span>
                    </div>

                    {/* Template Info */}
                    <div>
                      <h5 className="text-sm font-semibold text-foreground mb-1">
                        {template.name}
                      </h5>
                      <p className="text-xs text-muted-foreground mb-2">
                        {template.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {template.preview}
                      </p>
                    </div>

                    {/* Selection Indicator */}
                    {selectedTemplate === template.id && (
                      <div className="flex items-center space-x-2 text-primary">
                        <Icon name="Check" size={14} strokeWidth={2} />
                        <span className="text-xs font-medium">Currently Selected</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Template Features */}
          <div className="px-6 py-4 border-t border-border bg-accent/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Icon name="Palette" size={16} color="var(--color-success)" strokeWidth={2} />
                <span className="text-muted-foreground">Custom styling options</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Layers" size={16} color="var(--color-success)" strokeWidth={2} />
                <span className="text-muted-foreground">Multi-page layouts</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Smartphone" size={16} color="var(--color-success)" strokeWidth={2} />
                <span className="text-muted-foreground">Mobile optimized</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateSelector;