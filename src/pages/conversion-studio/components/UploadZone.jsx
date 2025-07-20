import React, { useState, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UploadZone = ({ onFilesUpload, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

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
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      const newFiles = files.map((file, index) => ({
        id: Date.now() + index,
        file,
        name: file.name,
        size: file.size,
        preview: URL.createObjectURL(file),
        status: 'ready'
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      onFilesUpload([...uploadedFiles, ...newFiles]);
    }
  }, [uploadedFiles, onFilesUpload]);

  const handleFileInput = useCallback((e) => {
    const files = Array.from(e.target.files).filter(file => 
      file.type.startsWith('image/')
    );
    
    if (files.length > 0) {
      const newFiles = files.map((file, index) => ({
        id: Date.now() + index,
        file,
        name: file.name,
        size: file.size,
        preview: URL.createObjectURL(file),
        status: 'ready'
      }));
      
      setUploadedFiles(prev => [...prev, ...newFiles]);
      onFilesUpload([...uploadedFiles, ...newFiles]);
    }
  }, [uploadedFiles, onFilesUpload]);

  const removeFile = useCallback((fileId) => {
    const updatedFiles = uploadedFiles.filter(file => file.id !== fileId);
    setUploadedFiles(updatedFiles);
    onFilesUpload(updatedFiles);
  }, [uploadedFiles, onFilesUpload]);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Zone */}
      <div
        className={`drop-zone ${isDragOver ? 'drag-over' : ''} ${
          isProcessing ? 'opacity-50 pointer-events-none' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Upload" size={32} color="var(--color-primary)" strokeWidth={2} />
          </div>
          
          <div className="text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Drop your images here
            </h3>
            <p className="text-muted-foreground mb-4">
              Support for JPG, PNG, GIF, BMP, TIFF, WebP formats
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Button
                variant="default"
                iconName="FolderOpen"
                iconPosition="left"
                onClick={() => document.getElementById('file-input').click()}
                disabled={isProcessing}
              >
                Browse Files
              </Button>
              
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Shield" size={16} color="var(--color-success)" />
                <span>Files auto-delete in 24h</span>
              </div>
            </div>
          </div>
        </div>
        
        <input
          id="file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileInput}
          className="hidden"
        />
      </div>

      {/* Uploaded Files List */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-lg font-semibold text-foreground">
              Uploaded Images ({uploadedFiles.length})
            </h4>
            <Button
              variant="outline"
              size="sm"
              iconName="Trash2"
              iconPosition="left"
              onClick={() => {
                setUploadedFiles([]);
                onFilesUpload([]);
              }}
              disabled={isProcessing}
            >
              Clear All
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedFiles.map((file, index) => (
              <div
                key={file.id}
                className="bg-card border border-border rounded-lg p-4 hover-float transition-brand"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {file.name}
                      </p>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(file.id)}
                        disabled={isProcessing}
                        className="w-6 h-6 text-muted-foreground hover:text-error"
                      >
                        <Icon name="X" size={14} strokeWidth={2} />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(file.size)}
                      </span>
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-muted-foreground">
                          #{index + 1}
                        </span>
                        <Icon name="GripVertical" size={14} color="var(--color-muted-foreground)" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Tips */}
      <div className="bg-accent/50 border border-border rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} color="var(--color-warning)" strokeWidth={2} />
          <div>
            <h5 className="text-sm font-semibold text-foreground mb-2">Pro Tips</h5>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Drag images to reorder them in your PDF</li>
              <li>• Use Ctrl+U to quickly upload files</li>
              <li>• Maximum file size: 50MB per image</li>
              <li>• Batch upload up to 100 images at once</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadZone;