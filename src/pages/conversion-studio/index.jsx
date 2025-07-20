import React, { useState, useEffect, useCallback } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UploadZone from './components/UploadZone';
import SettingsPanel from './components/SettingsPanel';
import PreviewPanel from './components/PreviewPanel';
import ProcessingModal from './components/ProcessingModal';
import TemplateSelector from './components/TemplateSelector';

const ConversionStudio = () => {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showProcessingModal, setShowProcessingModal] = useState(false);
  const [activePanel, setActivePanel] = useState('upload'); // upload, settings, preview
  const [isMobile, setIsMobile] = useState(false);

  const [settings, setSettings] = useState({
    quality: 'print',
    compression: 'medium',
    pageSize: 'a4',
    orientation: 'auto',
    margins: 'medium',
    fitToPage: true,
    enableOCR: false,
    addWatermark: false,
    watermarkText: '',
    watermarkOpacity: 30,
    passwordProtect: false,
    password: ''
  });

  const [selectedTemplate, setSelectedTemplate] = useState('default');

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'u':
            e.preventDefault();
            document.getElementById('file-input')?.click();
            break;
          case ' ':
            e.preventDefault();
            if (files.length > 0) {
              setActivePanel('preview');
            }
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [files.length]);

  const handleFilesUpload = useCallback((uploadedFiles) => {
    setFiles(uploadedFiles);
    if (uploadedFiles.length > 0 && isMobile) {
      setActivePanel('settings');
    }
  }, [isMobile]);

  const handleSettingsChange = useCallback((newSettings) => {
    setSettings(newSettings);
  }, []);

  const handleTemplateSelect = useCallback((template) => {
    setSelectedTemplate(template.id);
  }, []);

  const startConversion = useCallback(() => {
    if (files.length === 0) return;

    setIsProcessing(true);
    setShowProcessingModal(true);
    setProgress(0);

    // Simulate conversion progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [files.length]);

  const handleConversionComplete = useCallback(() => {
    setShowProcessingModal(false);
    setIsProcessing(false);
    setProgress(0);
    
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `converted-document-${Date.now()}.pdf`;
    link.click();
    
    // Show success message
    alert('PDF downloaded successfully!');
  }, []);

  const handleConversionCancel = useCallback(() => {
    setShowProcessingModal(false);
    setIsProcessing(false);
    setProgress(0);
  }, []);

  const renderMobileNavigation = () => (
    <div className="lg:hidden bg-card border-b border-border">
      <div className="flex">
        {[
          { id: 'upload', label: 'Upload', icon: 'Upload' },
          { id: 'settings', label: 'Settings', icon: 'Settings' },
          { id: 'preview', label: 'Preview', icon: 'Eye' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePanel(tab.id)}
            disabled={isProcessing || (tab.id === 'preview' && files.length === 0)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-brand ${
              activePanel === tab.id
                ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            } ${isProcessing || (tab.id === 'preview' && files.length === 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Icon name={tab.icon} size={16} strokeWidth={2} />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderDesktopLayout = () => (
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* Left Sidebar - Upload & Settings */}
      <div className="col-span-4 space-y-6 overflow-y-auto">
        <UploadZone 
          onFilesUpload={handleFilesUpload}
          isProcessing={isProcessing}
        />
        
        <TemplateSelector
          onTemplateSelect={handleTemplateSelect}
          selectedTemplate={selectedTemplate}
          isProcessing={isProcessing}
        />
        
        <SettingsPanel
          settings={settings}
          onSettingsChange={handleSettingsChange}
          isProcessing={isProcessing}
        />
      </div>

      {/* Right Panel - Preview */}
      <div className="col-span-8 overflow-hidden">
        <PreviewPanel
          files={files}
          settings={settings}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );

  const renderMobileLayout = () => (
    <div className="h-full overflow-hidden">
      {activePanel === 'upload' && (
        <div className="p-4 overflow-y-auto h-full">
          <UploadZone 
            onFilesUpload={handleFilesUpload}
            isProcessing={isProcessing}
          />
        </div>
      )}

      {activePanel === 'settings' && (
        <div className="p-4 space-y-4 overflow-y-auto h-full">
          <TemplateSelector
            onTemplateSelect={handleTemplateSelect}
            selectedTemplate={selectedTemplate}
            isProcessing={isProcessing}
          />
          
          <SettingsPanel
            settings={settings}
            onSettingsChange={handleSettingsChange}
            isProcessing={isProcessing}
          />
        </div>
      )}

      {activePanel === 'preview' && (
        <div className="h-full">
          <PreviewPanel
            files={files}
            settings={settings}
            isProcessing={isProcessing}
          />
        </div>
      )}
    </div>
  );

  return (
    <>
      <Helmet>
        <title>Conversion Studio - ImageToPDF Pro</title>
        <meta name="description" content="Professional image to PDF conversion studio with advanced settings, real-time preview, and batch processing capabilities." />
        <meta name="keywords" content="image to pdf, conversion studio, batch convert, pdf creator, image converter" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16 lg:pt-24">
          {/* Studio Header */}
          <div className="bg-card border-b border-border">
            <div className="px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-depth-1 rounded-lg flex items-center justify-center shadow-brand">
                    <Icon name="Zap" size={24} color="white" strokeWidth={2.5} />
                  </div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                      Conversion Studio
                    </h1>
                    <p className="text-muted-foreground">
                      Transform your images into professional PDFs with advanced controls
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <div className="hidden lg:flex items-center space-x-2 text-sm text-muted-foreground">
                    <Icon name="Keyboard" size={16} strokeWidth={2} />
                    <span>Ctrl+U to upload</span>
                  </div>
                  
                  <Button
                    variant="outline"
                    iconName="RotateCcw"
                    iconPosition="left"
                    onClick={() => {
                      setFiles([]);
                      setProgress(0);
                      setActivePanel('upload');
                    }}
                    disabled={isProcessing || files.length === 0}
                  >
                    Reset
                  </Button>
                  
                  <Button
                    variant="default"
                    iconName="Download"
                    iconPosition="left"
                    onClick={startConversion}
                    disabled={isProcessing || files.length === 0}
                    className="cta-primary"
                  >
                    {isProcessing ? 'Converting...' : 'Convert to PDF'}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {renderMobileNavigation()}

          {/* Main Content */}
          <div className="h-[calc(100vh-12rem)] lg:h-[calc(100vh-16rem)]">
            <div className="h-full px-4 sm:px-6 lg:px-8 py-6">
              {isMobile ? renderMobileLayout() : renderDesktopLayout()}
            </div>
          </div>

          {/* Processing Modal */}
          <ProcessingModal
            isOpen={showProcessingModal}
            progress={progress}
            onCancel={handleConversionCancel}
            onComplete={handleConversionComplete}
            files={files}
            settings={settings}
          />

          {/* Floating Action Button (Mobile) */}
          {isMobile && files.length > 0 && !isProcessing && (
            <div className="thumb-zone">
              <Button
                variant="default"
                fullWidth
                iconName="Download"
                iconPosition="left"
                onClick={startConversion}
                className="cta-primary h-14 text-lg"
              >
                Convert {files.length} Image{files.length !== 1 ? 's' : ''} to PDF
              </Button>
            </div>
          )}

          {/* Status Bar */}
          <div className="bg-surface/50 border-t border-border">
            <div className="px-4 sm:px-6 lg:px-8 py-3">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="FileImage" size={14} color="var(--color-muted-foreground)" />
                    <span className="text-muted-foreground">
                      {files.length} image{files.length !== 1 ? 's' : ''} uploaded
                    </span>
                  </div>
                  
                  {files.length > 0 && (
                    <div className="flex items-center space-x-2">
                      <Icon name="Settings" size={14} color="var(--color-primary)" />
                      <span className="text-muted-foreground">
                        {settings.quality.toUpperCase()} • {settings.pageSize.toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-4 text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="Shield" size={14} color="var(--color-success)" />
                    <span>Secure Processing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={14} color="var(--color-success)" />
                    <span>Auto-delete 24h</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default ConversionStudio;