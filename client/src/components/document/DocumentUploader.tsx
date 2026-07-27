import { useRef, useState } from "react";
import { FaFileUpload, FaFilePdf, FaFileWord, FaTimes, FaCheckCircle } from "react-icons/fa";

interface Props {
  file: File | null;
  setFile: (file: File) => void;
}

const DocumentUploader = ({ file, setFile }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    setError(null);
    
    // Validate file type
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const validExtensions = ['.pdf', '.docx'];
    const fileExtension = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(selectedFile.type) && !validExtensions.includes(fileExtension)) {
      setError("Please upload a PDF or DOCX file.");
      return;
    }
    
    // Validate file size (10MB)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("File size exceeds 10MB limit.");
      return;
    }

    setFile(selectedFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleRemove = () => {
    setFile(null as any);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileIcon = () => {
    if (!file) return null;
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension === 'pdf') {
      return <FaFilePdf className="w-8 h-8 text-red-500" />;
    } else if (extension === 'docx') {
      return <FaFileWord className="w-8 h-8 text-blue-500" />;
    }
    return null;
  };

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 ${
            isDragging
              ? "border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-500/10"
              : "border-gray-300 bg-gray-50/50 hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-lg hover:shadow-blue-500/5"
          }`}
        >
          <input
            ref={fileInputRef}
            id="document"
            type="file"
            accept=".pdf,.docx"
            className="hidden"
            onChange={handleChange}
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className={`rounded-full p-4 transition-all duration-300 ${
              isDragging ? "bg-blue-500 text-white scale-110" : "bg-blue-100 text-blue-600"
            }`}>
              <FaFileUpload className="w-8 h-8" />
            </div>
            
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {isDragging ? "Drop your document here" : "Upload Document"}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Drag & drop or click to browse
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Supports PDF, DOCX (Max 10MB)
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
            >
              <FaFileUpload className="w-4 h-4" />
              Choose Document
            </button>
          </div>
        </div>
      ) : (
        <div className="group relative rounded-2xl bg-gradient-to-r from-gray-50 to-blue-50/30 border-2 border-blue-200 p-4 transition-all duration-300 hover:border-blue-400 hover:shadow-lg">
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              {getFileIcon() || (
                <div className="rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 p-3 shadow-lg shadow-blue-500/20">
                  <FaFileUpload className="w-6 h-6 text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-gray-700 truncate">
                  {file.name}
                </p>
                <span className="flex-shrink-0 text-xs text-green-600 font-medium bg-green-100 px-2 py-0.5 rounded-full">
                  <FaCheckCircle className="w-3 h-3 inline mr-1" />
                  Loaded
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-0.5">
                {(file.size / 1024 / 1024).toFixed(2)} MB • {file.name.split('.').pop()?.toUpperCase()}
              </p>
            </div>

            <button
              onClick={handleRemove}
              className="flex-shrink-0 rounded-full bg-red-100 p-2 text-red-600 transition-all duration-200 hover:bg-red-500 hover:text-white hover:scale-110"
              title="Remove file"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-3 h-1 w-full bg-blue-100 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-progress"></div>
          </div>
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700">
          <span className="font-medium">Error:</span> {error}
        </div>
      )}
    </div>
  );
};

export default DocumentUploader;