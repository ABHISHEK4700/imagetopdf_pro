import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const SettingsPanel = ({ settings, onSettingsChange, isProcessing }) => {
  const [activeTab, setActiveTab] = useState('quality');

  const qualityOptions = [
    { value: 'web', label: 'Web (72 DPI)', description: 'Optimized for online viewing' },
    { value: 'print', label: 'Print (300 DPI)', description: 'High quality for printing' },
    { value: 'archive', label: 'Archive (600 DPI)', description: 'Maximum quality preservation' }
  ];

  const orientationOptions = [
    { value: 'portrait', label: 'Portrait' },
    { value: 'landscape', label: 'Landscape' },
    { value: 'auto', label: 'Auto-detect' }
  ];

  const pageSizeOptions = [
    { value: 'a4', label: 'A4 (210 × 297 mm)' },
    { value: 'letter', label: 'Letter (8.5 × 11 in)' },
    { value: 'legal', label: 'Legal (8.5 × 14 in)' },
    { value: 'a3', label: 'A3 (297 × 420 mm)' },
    { value: 'custom', label: 'Custom Size' }
  ];

  const compressionOptions = [
    { value: 'none', label: 'No Compression', description: 'Original quality' },
    { value: 'low', label: 'Low Compression', description: 'Slight size reduction' },
    { value: 'medium', label: 'Medium Compression', description: 'Balanced quality/size' },
    { value: 'high', label: 'High Compression', description: 'Smallest file size' }
  ];

  const marginOptions = [
    { value: 'none', label: 'No Margins' },
    { value: 'small', label: 'Small (0.5 in)' },
    { value: 'medium', label: 'Medium (1 in)' },
    { value: 'large', label: 'Large (1.5 in)' }
  ];

  const tabs = [
    { id: 'quality', label: 'Quality', icon: 'Settings' },
    { id: 'layout', label: 'Layout', icon: 'Layout' },
    { id: 'advanced', label: 'Advanced', icon: 'Sliders' }
  ];

  const handleSettingChange = (key, value) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Settings" size={18} color="var(--color-primary)" strokeWidth={2} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Conversion Settings</h3>
            <p className="text-sm text-muted-foreground">Customize your PDF output</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            disabled={isProcessing}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-brand ${
              activeTab === tab.id
                ? 'bg-primary text-primary-foreground border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Icon name={tab.icon} size={16} strokeWidth={2} />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 space-y-6">
        {activeTab === 'quality' && (
          <div className="space-y-6">
            <Select
              label="Output Quality"
              description="Choose the DPI setting for your PDF"
              options={qualityOptions}
              value={settings.quality}
              onChange={(value) => handleSettingChange('quality', value)}
              disabled={isProcessing}
            />

            <Select
              label="Compression Level"
              description="Balance between file size and image quality"
              options={compressionOptions}
              value={settings.compression}
              onChange={(value) => handleSettingChange('compression', value)}
              disabled={isProcessing}
            />

            <div className="bg-accent/50 border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} color="var(--color-primary)" strokeWidth={2} />
                <div className="text-sm">
                  <p className="font-medium text-foreground mb-1">Quality Guide</p>
                  <p className="text-muted-foreground">
                    Web quality is perfect for digital sharing, while Print quality ensures crisp physical documents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'layout' && (
          <div className="space-y-6">
            <Select
              label="Page Size"
              description="Standard paper sizes for your PDF"
              options={pageSizeOptions}
              value={settings.pageSize}
              onChange={(value) => handleSettingChange('pageSize', value)}
              disabled={isProcessing}
            />

            <Select
              label="Orientation"
              description="How images are positioned on the page"
              options={orientationOptions}
              value={settings.orientation}
              onChange={(value) => handleSettingChange('orientation', value)}
              disabled={isProcessing}
            />

            <Select
              label="Page Margins"
              description="White space around images"
              options={marginOptions}
              value={settings.margins}
              onChange={(value) => handleSettingChange('margins', value)}
              disabled={isProcessing}
            />

            <Checkbox
              label="Fit images to page"
              description="Automatically scale images to fit within page boundaries"
              checked={settings.fitToPage}
              onChange={(e) => handleSettingChange('fitToPage', e.target.checked)}
              disabled={isProcessing}
            />
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="space-y-6">
            <Checkbox
              label="Enable OCR Text Recognition"
              description="Extract text from scanned documents (adds processing time)"
              checked={settings.enableOCR}
              onChange={(e) => handleSettingChange('enableOCR', e.target.checked)}
              disabled={isProcessing}
            />

            <Checkbox
              label="Add Watermark"
              description="Include a watermark on each page"
              checked={settings.addWatermark}
              onChange={(e) => handleSettingChange('addWatermark', e.target.checked)}
              disabled={isProcessing}
            />

            {settings.addWatermark && (
              <div className="ml-6 space-y-4 p-4 bg-accent/30 rounded-lg border border-border">
                <input
                  type="text"
                  placeholder="Watermark text"
                  value={settings.watermarkText || ''}
                  onChange={(e) => handleSettingChange('watermarkText', e.target.value)}
                  disabled={isProcessing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 text-sm">
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={settings.watermarkOpacity || 30}
                      onChange={(e) => handleSettingChange('watermarkOpacity', parseInt(e.target.value))}
                      disabled={isProcessing}
                      className="w-20"
                    />
                    <span className="text-muted-foreground">
                      Opacity: {settings.watermarkOpacity || 30}%
                    </span>
                  </label>
                </div>
              </div>
            )}

            <Checkbox
              label="Password Protection"
              description="Secure your PDF with a password"
              checked={settings.passwordProtect}
              onChange={(e) => handleSettingChange('passwordProtect', e.target.checked)}
              disabled={isProcessing}
            />

            {settings.passwordProtect && (
              <div className="ml-6 p-4 bg-accent/30 rounded-lg border border-border">
                <input
                  type="password"
                  placeholder="Enter password"
                  value={settings.password || ''}
                  onChange={(e) => handleSettingChange('password', e.target.value)}
                  disabled={isProcessing}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Preset Actions */}
      <div className="px-6 py-4 border-t border-border bg-accent/30">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Quick Presets</span>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSettingsChange({
                quality: 'web',
                compression: 'medium',
                pageSize: 'a4',
                orientation: 'auto',
                margins: 'small',
                fitToPage: true,
                enableOCR: false,
                addWatermark: false,
                passwordProtect: false
              })}
              disabled={isProcessing}
            >
              Web
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSettingsChange({
                quality: 'print',
                compression: 'low',
                pageSize: 'a4',
                orientation: 'portrait',
                margins: 'medium',
                fitToPage: true,
                enableOCR: false,
                addWatermark: false,
                passwordProtect: false
              })}
              disabled={isProcessing}
            >
              Print
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onSettingsChange({
                quality: 'archive',
                compression: 'none',
                pageSize: 'a4',
                orientation: 'auto',
                margins: 'large',
                fitToPage: false,
                enableOCR: true,
                addWatermark: false,
                passwordProtect: true
              })}
              disabled={isProcessing}
            >
              Archive
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;