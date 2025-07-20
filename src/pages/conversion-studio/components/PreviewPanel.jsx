import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PreviewPanel = ({ files, settings, isProcessing }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [previewMode, setPreviewMode] = useState('single'); // single, grid

  const totalPages = files.length;

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 25, 50));
  };

  const handleZoomReset = () => {
    setZoomLevel(100);
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageDimensions = () => {
    const dimensions = {
      a4: { width: 210, height: 297 },
      letter: { width: 216, height: 279 },
      legal: { width: 216, height: 356 },
      a3: { width: 297, height: 420 }
    };
    
    const size = dimensions[settings.pageSize] || dimensions.a4;
    const isLandscape = settings.orientation === 'landscape';
    
    return isLandscape 
      ? { width: size.height, height: size.width }
      : size;
  };

  const renderPagePreview = (file, index) => {
    const dimensions = getPageDimensions();
    const aspectRatio = dimensions.width / dimensions.height;
    
    return (
      <div
        key={file.id}
        className="bg-white border border-border rounded-lg shadow-brand-secondary overflow-hidden"
        style={{
          width: `${200 * (zoomLevel / 100)}px`,
          height: `${(200 / aspectRatio) * (zoomLevel / 100)}px`
        }}
      >
        <div className="w-full h-full p-2 flex items-center justify-center">
          <img
            src={file.preview}
            alt={`Page ${index + 1}`}
            className={`max-w-full max-h-full object-contain ${
              settings.fitToPage ? 'w-full h-full object-cover' : ''
            }`}
            style={{
              filter: settings.compression === 'high' ? 'contrast(0.95)' : 'none'
            }}
          />
          
          {/* Watermark Preview */}
          {settings.addWatermark && settings.watermarkText && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
              style={{
                opacity: (settings.watermarkOpacity || 30) / 100,
                transform: 'rotate(-45deg)'
              }}
            >
              <span className="text-gray-500 text-xs font-bold">
                {settings.watermarkText}
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  if (files.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg h-full flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Icon name="FileText" size={32} color="var(--color-muted-foreground)" strokeWidth={1.5} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">PDF Preview</h3>
            <p className="text-muted-foreground">
              Upload images to see your PDF preview
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Eye" size={18} color="var(--color-primary)" strokeWidth={2} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">PDF Preview</h3>
              <p className="text-sm text-muted-foreground">
                {totalPages} page{totalPages !== 1 ? 's' : ''} • {settings.quality.toUpperCase()} quality
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={previewMode === 'single' ? 'default' : 'outline'}
              size="sm"
              iconName="Square"
              onClick={() => setPreviewMode('single')}
              disabled={isProcessing}
            />
            <Button
              variant={previewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              iconName="Grid3X3"
              onClick={() => setPreviewMode('grid')}
              disabled={isProcessing}
            />
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-3 border-b border-border bg-accent/30">
        <div className="flex items-center justify-between">
          {/* Page Navigation */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronLeft"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage <= 1 || isProcessing}
            />
            
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Page</span>
              <input
                type="number"
                min="1"
                max={totalPages}
                value={currentPage}
                onChange={(e) => goToPage(parseInt(e.target.value))}
                disabled={isProcessing}
                className="w-16 px-2 py-1 text-sm border border-border rounded bg-background text-foreground text-center focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground">of {totalPages}</span>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="ChevronRight"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage >= totalPages || isProcessing}
            />
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="ZoomOut"
              onClick={handleZoomOut}
              disabled={zoomLevel <= 50 || isProcessing}
            />
            
            <button
              onClick={handleZoomReset}
              disabled={isProcessing}
              className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-brand disabled:opacity-50"
            >
              {zoomLevel}%
            </button>
            
            <Button
              variant="outline"
              size="sm"
              iconName="ZoomIn"
              onClick={handleZoomIn}
              disabled={zoomLevel >= 200 || isProcessing}
            />
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-auto p-6">
        {previewMode === 'single' ? (
          <div className="flex justify-center">
            {files[currentPage - 1] && renderPagePreview(files[currentPage - 1], currentPage - 1)}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.map((file, index) => (
              <div
                key={file.id}
                className={`cursor-pointer transition-brand hover-lift ${
                  index + 1 === currentPage ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setCurrentPage(index + 1)}
              >
                {renderPagePreview(file, index)}
                <div className="text-center mt-2">
                  <span className="text-xs text-muted-foreground">
                    Page {index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-6 py-3 border-t border-border bg-accent/30">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={14} color="var(--color-muted-foreground)" />
              <span className="text-muted-foreground">
                {settings.pageSize.toUpperCase()} • {settings.orientation}
              </span>
            </div>
            
            {settings.enableOCR && (
              <div className="flex items-center space-x-2">
                <Icon name="Scan" size={14} color="var(--color-success)" />
                <span className="text-success">OCR Enabled</span>
              </div>
            )}
            
            {settings.passwordProtect && (
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={14} color="var(--color-warning)" />
                <span className="text-warning">Password Protected</span>
              </div>
            )}
          </div>
          
          <div className="text-muted-foreground">
            Quality: {settings.quality.toUpperCase()} • Compression: {settings.compression}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;