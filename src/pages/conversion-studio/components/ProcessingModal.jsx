import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProcessingModal = ({ isOpen, progress, onCancel, onComplete, files, settings }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [processingFile, setProcessingFile] = useState('');

  const steps = [
    { id: 'preparing', label: 'Preparing images', icon: 'FileImage' },
    { id: 'processing', label: 'Converting to PDF', icon: 'RefreshCw' },
    { id: 'optimizing', label: 'Optimizing quality', icon: 'Zap' },
    { id: 'finalizing', label: 'Finalizing document', icon: 'CheckCircle' }
  ];

  useEffect(() => {
    if (progress <= 25) {
      setCurrentStep(0);
      setProcessingFile('Analyzing image formats...');
    } else if (progress <= 50) {
      setCurrentStep(1);
      setProcessingFile('Converting images to PDF...');
    } else if (progress <= 75) {
      setCurrentStep(2);
      setProcessingFile('Applying compression settings...');
    } else if (progress <= 100) {
      setCurrentStep(3);
      setProcessingFile('Generating final PDF...');
    }

    // Calculate estimated time based on progress
    if (progress > 0 && progress < 100) {
      const timePerPercent = 0.5; // 0.5 seconds per percent
      const remainingPercent = 100 - progress;
      setEstimatedTime(Math.ceil(remainingPercent * timePerPercent));
    }
  }, [progress]);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  const formatTime = (seconds) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-floating max-w-md w-full">
        {/* Header */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="FileText" size={18} color="var(--color-primary)" strokeWidth={2} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Converting to PDF</h3>
                <p className="text-sm text-muted-foreground">
                  Processing {files.length} image{files.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            
            {progress < 100 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onCancel}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" size={18} strokeWidth={2} />
              </Button>
            )}
          </div>
        </div>

        {/* Progress Content */}
        <div className="px-6 py-6 space-y-6">
          {/* Overall Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                {progress >= 100 ? 'Conversion Complete!' : 'Converting...'}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round(progress)}%
              </span>
            </div>
            
            <div className="progress-bar h-2">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            {progress < 100 && estimatedTime > 0 && (
              <p className="text-xs text-muted-foreground">
                Estimated time remaining: {formatTime(estimatedTime)}
              </p>
            )}
          </div>

          {/* Processing Steps */}
          <div className="space-y-3">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center space-x-3 p-3 rounded-lg transition-brand ${
                  index === currentStep
                    ? 'bg-primary/10 border border-primary/20'
                    : index < currentStep
                    ? 'bg-success/10 border border-success/20' :'bg-muted/30 border border-border'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  index === currentStep
                    ? 'bg-primary text-primary-foreground'
                    : index < currentStep
                    ? 'bg-success text-success-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {index < currentStep ? (
                    <Icon name="Check" size={14} strokeWidth={2.5} />
                  ) : index === currentStep ? (
                    <Icon name={step.icon} size={14} strokeWidth={2} className="animate-spin" />
                  ) : (
                    <Icon name={step.icon} size={14} strokeWidth={2} />
                  )}
                </div>
                
                <div className="flex-1">
                  <p className={`text-sm font-medium ${
                    index <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </p>
                  
                  {index === currentStep && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {processingFile}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Settings Summary */}
          <div className="bg-accent/30 border border-border rounded-lg p-4">
            <h4 className="text-sm font-semibold text-foreground mb-3">Conversion Settings</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-muted-foreground">Quality:</span>
                <span className="ml-2 font-medium text-foreground">
                  {settings.quality.toUpperCase()}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Size:</span>
                <span className="ml-2 font-medium text-foreground">
                  {settings.pageSize.toUpperCase()}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Compression:</span>
                <span className="ml-2 font-medium text-foreground">
                  {settings.compression}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Orientation:</span>
                <span className="ml-2 font-medium text-foreground">
                  {settings.orientation}
                </span>
              </div>
            </div>
            
            {(settings.enableOCR || settings.addWatermark || settings.passwordProtect) && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex flex-wrap gap-2">
                  {settings.enableOCR && (
                    <span className="inline-flex items-center space-x-1 px-2 py-1 bg-success/10 text-success rounded text-xs">
                      <Icon name="Scan" size={12} strokeWidth={2} />
                      <span>OCR</span>
                    </span>
                  )}
                  {settings.addWatermark && (
                    <span className="inline-flex items-center space-x-1 px-2 py-1 bg-warning/10 text-warning rounded text-xs">
                      <Icon name="Droplets" size={12} strokeWidth={2} />
                      <span>Watermark</span>
                    </span>
                  )}
                  {settings.passwordProtect && (
                    <span className="inline-flex items-center space-x-1 px-2 py-1 bg-error/10 text-error rounded text-xs">
                      <Icon name="Lock" size={12} strokeWidth={2} />
                      <span>Protected</span>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Completion Message */}
          {progress >= 100 && (
            <div className="text-center space-y-3">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="CheckCircle" size={24} color="var(--color-success)" strokeWidth={2} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  PDF created successfully!
                </p>
                <p className="text-xs text-muted-foreground">
                  Your document is ready for download
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {progress < 100 && (
          <div className="px-6 py-4 border-t border-border bg-accent/30">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={12} color="var(--color-success)" />
                <span>Files will be auto-deleted in 24h</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Zap" size={12} color="var(--color-primary)" />
                <span>Secure processing</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingModal;