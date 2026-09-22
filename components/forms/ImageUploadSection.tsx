import React from "react";
import Image from "next/image";
import { X, Image as ImageIcon, Upload, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

interface ImageUploadSectionProps {
  imageUrl: string | null;
  onImageUpload: (url: string) => void;
  onImageRemove: () => void;
  error?: string;
  disabled?: boolean;
}

export const ImageUploadSection: React.FC<ImageUploadSectionProps> = ({
  imageUrl,
  onImageUpload,
  onImageRemove,
  error,
  disabled = false,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="mainImageUpload" className="text-sm font-medium">
          Project Image
        </Label>
        {imageUrl && (
          <Badge variant="secondary" className="text-xs">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Uploaded
          </Badge>
        )}
      </div>

      <Card
        className={cn(
          "transition-all duration-200",
          error && "border-destructive"
        )}
      >
        <CardContent className="p-0">
          {!imageUrl ? (
            <div className="relative">
              <div className="flex flex-col items-center justify-center p-8 space-y-4 border-2 border-dashed border-muted-foreground/25 rounded-lg hover:border-muted-foreground/50 transition-colors">
                <div className="p-4 rounded-full bg-muted">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>

                <div className="text-center space-y-2">
                  <h3 className="font-medium text-sm">Upload project image</h3>
                  <p className="text-xs text-muted-foreground max-w-xs">
                    Choose a high-quality image that represents your project
                    best. Supports JPG, PNG up to 4MB.
                  </p>
                </div>

                <label className={cn("cursor-pointer", disabled && "pointer-events-none opacity-50")}>
                  <span className="bg-primary hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium inline-flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Choose Image
                  </span>
                  <input
                    id="mainImageUpload"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="sr-only"
                    disabled={disabled}
                    onChange={async (event) => {
                      const file = event.target.files?.[0];
                      if (!file) return;
                      const formData = new FormData();
                      formData.append("file", file);
                      try {
                        const response = await fetch("/api/project-images", {
                          method: "POST",
                          body: formData,
                        });
                        const result = await response.json();
                        if (!response.ok) throw new Error(result.error);
                        onImageUpload(result.url);
                        toast.success("Image uploaded successfully!");
                      } catch (uploadError) {
                        toast.error("Upload failed", {
                          description:
                            uploadError instanceof Error ? uploadError.message : "Please try again",
                        });
                      } finally {
                        event.target.value = "";
                      }
                    }}
                  />
                </label>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg border">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    src={imageUrl}
                    alt="Uploaded project image"
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-foreground">
                        Image uploaded successfully
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Your project image is ready to use
                      </p>
                      <Badge variant="outline" className="text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
                        Ready
                      </Badge>
                    </div>

                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={async () => {
                        try {
                          await fetch("/api/project-images/delete", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ url: imageUrl }),
                          });
                        } finally {
                          onImageRemove();
                        }
                      }}
                      disabled={disabled}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove image</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {error && (
        <div className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <X className="h-4 w-4 text-destructive flex-shrink-0" />
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}
    </div>
  );
};
