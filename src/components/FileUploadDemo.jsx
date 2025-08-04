import React, { useState, useRef } from 'react';

const FileUploadDemo = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const fileInputRef = useRef(null);

  const handleFileSelect = (files) => {
    const newFiles = Array.from(files).map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      preview: null,
      uploadProgress: 0,
    }));

    // 生成预览
    newFiles.forEach(fileObj => {
      if (fileObj.file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setUploadedFiles(prev => 
            prev.map(f => 
              f.id === fileObj.id ? { ...f, preview: e.target.result } : f
            )
          );
        };
        reader.readAsDataURL(fileObj.file);
      }
    });

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // 模拟上传进度
    newFiles.forEach(fileObj => {
      simulateUpload(fileObj.id);
    });
  };

  const simulateUpload = (fileId) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      setUploadProgress(prev => ({ ...prev, [fileId]: progress }));
    }, 200);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[fileId];
      return newProgress;
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type) => {
    if (type.startsWith('image/')) return '🖼️';
    if (type.startsWith('video/')) return '🎥';
    if (type.startsWith('audio/')) return '🎵';
    if (type.includes('pdf')) return '📄';
    if (type.includes('word') || type.includes('document')) return '📝';
    if (type.includes('excel') || type.includes('spreadsheet')) return '📊';
    return '📁';
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px' }}>
      <h2>文件上传 Demo</h2>
      <p>支持拖拽上传、文件预览、上传进度等功能</p>

      <div style={{ marginBottom: '30px' }}>
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${dragActive ? '#2ed573' : '#ddd'}`,
            borderRadius: '8px',
            padding: '40px',
            textAlign: 'center',
            cursor: 'pointer',
            background: dragActive ? '#f0fff0' : '#f8f9fa',
            transition: 'all 0.3s ease',
          }}
        >
          <div style={{ fontSize: '48px', marginBottom: '15px' }}>
            📁
          </div>
          <h3>拖拽文件到这里或点击选择文件</h3>
          <p style={{ color: '#666', marginTop: '10px' }}>
            支持图片、视频、音频、文档等多种格式
          </p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={(e) => handleFileSelect(e.target.files)}
            style={{ display: 'none' }}
          />
        </div>
      </div>

      {uploadedFiles.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          <h3>已上传文件 ({uploadedFiles.length})</h3>
          <div style={{ display: 'grid', gap: '15px' }}>
            {uploadedFiles.map((fileObj) => (
              <div
                key={fileObj.id}
                style={{
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  padding: '15px',
                  background: 'white',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ fontSize: '32px' }}>
                    {getFileIcon(fileObj.type)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                      {fileObj.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '10px' }}>
                      {formatFileSize(fileObj.size)} • {fileObj.type}
                    </div>
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ 
                        width: '100%', 
                        height: '6px', 
                        background: '#eee', 
                        borderRadius: '3px',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${uploadProgress[fileObj.id] || 0}%`,
                          height: '100%',
                          background: uploadProgress[fileObj.id] === 100 ? '#2ed573' : '#3742fa',
                          transition: 'width 0.3s ease'
                        }} />
                      </div>
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '5px' }}>
                        上传进度: {Math.round(uploadProgress[fileObj.id] || 0)}%
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(fileObj.id)}
                    style={{
                      padding: '5px 10px',
                      background: '#ff4757',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '12px'
                    }}
                  >
                    删除
                  </button>
                </div>
                
                {fileObj.preview && (
                  <div style={{ marginTop: '15px' }}>
                    <img
                      src={fileObj.preview}
                      alt={fileObj.name}
                      style={{
                        maxWidth: '200px',
                        maxHeight: '150px',
                        borderRadius: '4px',
                        border: '1px solid #ddd'
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <h4>文件上传功能特性：</h4>
        <ul>
          <li>拖拽上传支持</li>
          <li>多文件同时上传</li>
          <li>实时上传进度</li>
          <li>图片文件预览</li>
          <li>文件类型识别</li>
          <li>文件大小显示</li>
          <li>文件删除功能</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUploadDemo; 