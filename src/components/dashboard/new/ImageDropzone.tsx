"use client";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { ImageUp, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export const ImageDropzone = ({
  onChange,
  value,
  multiple = false,
  label,
  error,
}: {
  onChange: (files: string | string[]) => void;
  value: string | string[];
  multiple?: boolean;
  label: string;
  error?: string;
}) => {
  const [preview, setPreview] = useState<string[]>(
    Array.isArray(value) ? value : value ? [value] : []
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      // Convert files to URLs
      const urls = acceptedFiles.map((file) => URL.createObjectURL(file));

      if (multiple) {
        setPreview((prev) => [...prev, ...urls]);
        onChange([...preview, ...urls]);
      } else {
        setPreview([urls[0]]);
        onChange(urls[0]);
      }
    },
    [multiple, onChange, preview]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple,
  });

  const removeImage = (indexToRemove: number) => {
    const newPreview = preview.filter((_, index) => index !== indexToRemove);
    setPreview(newPreview);
    if (multiple) {
      onChange(newPreview);
    } else {
      onChange("");
    }
  };

  return (
    <div className="space-y-4">
      <Label className="mb-2 block text-sm font-medium text-[#1C1C1C]">
        {label}
      </Label>

      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-6 transition-colors duration-200 ease-in-out ${
          isDragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"
        } ${error ? "border-red-500" : ""} `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <ImageUp className="h-12 w-12 text-gray-400" />
          <div className="text-sm text-gray-600">
            {isDragActive ? (
              <p>اسحب الملفات هنا</p>
            ) : (
              <p>اسحب واترك الملفات او اضغط وحدد الملفات</p>
            )}
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {preview.length > 0 && (
        <div className="flex items-center flex-wrap gap-2">
          {preview.map((url, index) => (
            <Card key={url} className="group relative h-28 w-28">
              <Image
                src={url}
                alt={`Preview ${index + 1}`}
                fill
                sizes="(100vw, 100vh)"
                priority
                className="rounded-lg object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
