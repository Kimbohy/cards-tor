"use client";

import { cn } from "@/lib/utils";
import { Upload, X, FileIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
  DragEvent,
} from "react";

export interface FileWithPreview extends File {
  preview?: string;
}

interface DropzoneProps {
  value?: FileWithPreview[];
  onChange?: (files: FileWithPreview[]) => void;
  accept?: string;
  maxFiles?: number;
  maxSize?: number; // in bytes
  disabled?: boolean;
  className?: string;
  placeholder?: string;
  showPreviews?: boolean;
}

function Dropzone({
  value = [],
  onChange,
  accept = "image/*",
  maxFiles = 10,
  maxSize = 5 * 1024 * 1024, // 5MB default
  disabled = false,
  className,
  placeholder = "Drag and drop files here, or click to browse",
  showPreviews = true,
}: DropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files || disabled) return;

      setError(null);
      const newFiles: FileWithPreview[] = [];

      Array.from(files).forEach((file) => {
        // Check file size
        if (file.size > maxSize) {
          setError(
            `File "${file.name}" is too large. Max size is ${formatBytes(maxSize)}`,
          );
          return;
        }

        // Check max files
        if (value.length + newFiles.length >= maxFiles) {
          setError(`Maximum ${maxFiles} files allowed`);
          return;
        }

        // Create preview for images
        const fileWithPreview: FileWithPreview = Object.assign(file, {
          preview: file.type.startsWith("image/")
            ? URL.createObjectURL(file)
            : undefined,
        });

        newFiles.push(fileWithPreview);
      });

      if (newFiles.length > 0) {
        onChange?.([...value, ...newFiles]);
      }
    },
    [value, onChange, maxFiles, maxSize, disabled],
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      handleFiles(e.dataTransfer.files);
    },
    [handleFiles],
  );

  const handleDragOver = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setIsDragOver(true);
      }
    },
    [disabled],
  );

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleClick = useCallback(() => {
    if (!disabled) {
      inputRef.current?.click();
    }
  }, [disabled]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      // Reset input so the same file can be selected again
      e.target.value = "";
    },
    [handleFiles],
  );

  const handleRemove = useCallback(
    (index: number) => {
      const fileToRemove = value[index];
      if (fileToRemove.preview) {
        URL.revokeObjectURL(fileToRemove.preview);
      }
      const newFiles = value.filter((_, i) => i !== index);
      onChange?.(newFiles);
      setError(null);
    },
    [value, onChange],
  );

  // Cleanup previews on unmount
  useEffect(() => {
    return () => {
      value.forEach((file) => {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
      });
    };
  }, []);

  const canAddMore = value.length < maxFiles;

  return (
    <div className={cn("space-y-4", className)}>
      {/* Dropzone Area */}
      {canAddMore && (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={cn(
            "relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors cursor-pointer",
            isDragOver && "border-primary bg-primary/5",
            !isDragOver &&
              "border-muted-foreground/25 hover:border-muted-foreground/50",
            disabled && "cursor-not-allowed opacity-50",
          )}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={maxFiles > 1}
            onChange={handleInputChange}
            disabled={disabled}
            className="hidden"
          />
          <Upload className="size-8 text-muted-foreground" />
          <div className="text-center">
            <p className="text-sm text-muted-foreground">{placeholder}</p>
            <p className="text-xs text-muted-foreground/70 mt-1">
              {accept === "image/*" ? "PNG, JPG, GIF up to " : "Files up to "}
              {formatBytes(maxSize)}
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-sm text-destructive">{error}</p>}

      {/* File Previews */}
      {showPreviews && value.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {value.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative group aspect-square rounded-lg border overflow-hidden bg-muted"
            >
              {file.preview ? (
                <img
                  src={file.preview}
                  alt={file.name}
                  className="size-full object-cover"
                />
              ) : (
                <div className="size-full flex items-center justify-center">
                  <FileIcon className="size-8 text-muted-foreground" />
                </div>
              )}
              {/* File name overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-black/60 px-2 py-1">
                <p className="text-xs text-white truncate">{file.name}</p>
              </div>
              {/* Remove button */}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 size-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(index);
                }}
              >
                <X className="size-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* File count */}
      {value.length > 0 && (
        <p className="text-xs text-muted-foreground text-center">
          {value.length} of {maxFiles} files selected
        </p>
      )}
    </div>
  );
}

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

export { Dropzone };
