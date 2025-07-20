import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [isConverting, setIsConverting] = useState(false);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setUploadedFiles(imageFiles);
      // Simulate conversion process
      setIsConverting(true);
      setTimeout(() => {
        setIsConverting(false);
        navigate('/conversion-studio');
      }, 2000);
    }
  }, [navigate]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setUploadedFiles(imageFiles);
      setIsConverting(true);
      setTimeout(() => {
        setIsConverting(false);
        navigate('/conversion-studio');
      }, 2000);
    }
  };

  const handleConversionStudio = () => {
    navigate('/conversion-studio');
  };

  return (
    <section className="relative bg-gradient-to-br from-background via-surface to-accent min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563EB' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content Section */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <Icon name="Zap" size={16} />
                <span>50M+ Files Converted This Month</span>
              </div>
              
              <h1 className="text-brand-headline text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Transform Images to{' '}
                <span className="bg-gradient-to-r from-primary to-blue-700 bg-clip-text text-transparent">
                  Professional PDFs
                </span>{' '}
                in Seconds
              </h1>
              
              <p className="text-brand-body text-xl text-muted-foreground leading-relaxed">
                Enterprise-grade conversion with military-level security. No registration required, 
                files auto-deleted in 24 hours. Experience the difference quality makes.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span>SOC 2 Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} color="var(--color-success)" />
                <span>GDPR Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} color="var(--color-success)" />
                <span>24h Auto-Delete</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                iconName="FileImage"
                iconPosition="left"
                className="cta-primary text-lg px-8 py-4"
                onClick={handleConversionStudio}
              >
                Start Converting Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                iconName="Play"
                iconPosition="left"
                className="text-lg px-8 py-4"
              >
                Watch Demo
              </Button>
            </div>
          </div>

          {/* Conversion Widget */}
          <div className="space-y-6">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-floating">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h3 className="text-brand-value text-xl font-semibold text-foreground">
                    Instant Conversion
                  </h3>
                  <p className="text-muted-foreground">
                    Drag & drop your images or click to browse
                  </p>
                </div>

                {/* Drop Zone */}
                <div
                  className={`drop-zone ${isDragOver ? 'drag-over' : ''} ${isConverting ? 'opacity-50' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                    disabled={isConverting}
                  />
                  
                  {isConverting ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="Loader2" size={32} color="var(--color-primary)" className="animate-spin" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-foreground font-medium">Converting your images...</p>
                        <div className="progress-bar h-2">
                          <div className="progress-fill w-3/4 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ) : uploadedFiles.length > 0 ? (
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center">
                        <Icon name="Check" size={32} color="var(--color-success)" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-foreground font-medium">
                          {uploadedFiles.length} image{uploadedFiles.length > 1 ? 's' : ''} ready
                        </p>
                        <Button
                          variant="default"
                          size="sm"
                          iconName="ArrowRight"
                          iconPosition="right"
                          onClick={handleConversionStudio}
                        >
                          Continue to Studio
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <label htmlFor="file-upload" className="cursor-pointer block">
                      <div className="space-y-4">
                        <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon name="Upload" size={32} color="var(--color-primary)" />
                        </div>
                        <div className="space-y-2">
                          <p className="text-foreground font-medium">
                            Drop images here or click to browse
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Supports JPG, PNG, WEBP up to 10MB each
                          </p>
                        </div>
                      </div>
                    </label>
                  )}
                </div>

                {/* Security Notice */}
                <div className="bg-success/5 border border-success/20 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Icon name="ShieldCheck" size={20} color="var(--color-success)" className="mt-0.5" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-success">
                        Your files are secure
                      </p>
                      <p className="text-xs text-muted-foreground">
                        End-to-end encryption, processed locally when possible, automatically deleted after 24 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center space-y-1">
                <p className="text-2xl font-bold text-primary">2.5M+</p>
                <p className="text-xs text-muted-foreground">Monthly Users</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-2xl font-bold text-primary">99.9%</p>
                <p className="text-xs text-muted-foreground">Uptime</p>
              </div>
              <div className="text-center space-y-1">
                <p className="text-2xl font-bold text-primary">4.9★</p>
                <p className="text-xs text-muted-foreground">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;