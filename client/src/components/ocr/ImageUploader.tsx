import { useState, useRef } from "react";
import { FaUpload, FaImage, FaTimes, FaFileImage } from "react-icons/fa";

interface Props {
  preview: string;
  setPreview: (value: string) => void;
  setImage: (file: File | null) => void;
}

const ImageUploader = ({ preview, setPreview, setImage }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    processFile(file);
  };

  const processFile = (file: File) => {
    setImage(file);
    setPreview(URL.createObjectURL(file));
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
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    } else {
      alert("Please drop an image file.");
    }
  };

  const handleRemove = () => {
    setImage(null);
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      {!preview ? (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative cursor-pointer rounded-2xl border-2 border-dashed p-12 text-center transition-all duration-300 ${
            isDragging
              ? "border-blue-500 bg-blue-50/50 shadow-lg shadow-blue-500/10"
              : "border-gray-300 bg-gray-50/50 hover:border-blue-400 hover:bg-blue-50/30 hover:shadow-lg hover:shadow-blue-500/5"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className={`rounded-full p-4 transition-all duration-300 ${
              isDragging ? "bg-blue-500 text-white scale-110" : "bg-blue-100 text-blue-600"
            }`}>
              <FaUpload className="w-8 h-8" />
            </div>
            
            <div>
              <p className="text-lg font-semibold text-gray-700">
                {isDragging ? "Drop your image here" : "Upload an image"}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Drag & drop or click to browse
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Supports JPG, PNG, WebP (Max 10MB)
              </p>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClick();
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-2.5 text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105"
            >
              <FaImage className="w-4 h-4" />
              Choose Image
            </button>
          </div>
        </div>
      ) : (
        <div className="relative group">
          <div className="relative overflow-hidden rounded-2xl bg-gray-100 shadow-lg">
            <img
              src={preview}
              alt="Preview"
              className="max-h-96 w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-4">
              <div className="flex items-center gap-2 text-white">
                <FaFileImage className="w-4 h-4" />
                <span className="text-sm font-medium">Image loaded</span>
              </div>
              <button
                onClick={handleRemove}
                className="rounded-full bg-red-500/90 p-2 text-white transition-all duration-200 hover:bg-red-600 hover:scale-110"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-gray-500">Image ready for OCR</span>
            <button
              onClick={handleClick}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
            >
              Change image
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;