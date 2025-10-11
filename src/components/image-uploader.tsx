
'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Copy, UploadCloud } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Label } from './ui/label';

export function ImageUploader() {
  const [dataUri, setDataUri] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (file: File | null) => {
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
            variant: 'destructive',
            title: 'Invalid File Type',
            description: 'Please upload an image file.',
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setDataUri(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleCopy = () => {
    if (dataUri) {
      navigator.clipboard.writeText(dataUri);
      toast({
        title: 'Copied to Clipboard!',
        description: 'The data URI has been copied successfully.',
      });
    }
  };

  return (
    <div className="space-y-6">
      <div
        className={`relative flex flex-col items-center justify-center w-full p-8 border-2 border-dashed rounded-lg transition-colors duration-200
        ${isDragging ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <UploadCloud className="w-12 h-12 text-muted-foreground mb-4" />
        <p className="text-muted-foreground mb-2">Drag & drop an image here, or click to select a file</p>
        <input
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={(e) => handleFileChange(e.target.files ? e.target.files[0] : null)}
          accept="image/*"
        />
      </div>
      
      {dataUri && (
        <div className="space-y-4">
          <div>
            <Label>Image Preview</Label>
            <div className="mt-2 relative w-full aspect-video border rounded-lg overflow-hidden">
              <Image src={dataUri} alt="Image preview" fill className="object-contain" />
            </div>
          </div>
          
          <div>
            <Label htmlFor="data-uri-output">Generated Data URI</Label>
            <div className="relative mt-2">
              <Textarea
                id="data-uri-output"
                readOnly
                value={dataUri}
                className="pr-12 min-h-[120px] font-mono text-xs"
                rows={5}
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-7 w-7"
                onClick={handleCopy}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Copy this URI and paste it into the `image` field in your article's frontmatter.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
