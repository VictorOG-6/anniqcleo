"use client";

import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { X, Upload, Loader2 } from "lucide-react";
import { useCreateProductContext } from "@/contexts/product/create-product-context";
import { useCreateProduct } from "@/hooks/product/use-create-product";
import { useUpdateProduct } from "@/hooks/product/use-update-product";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { ProductCreate, ProductStatus } from "@/types";
import { $http } from "@/lib/http";
import { API_URL } from "@/lib/constants";

const IMAGE_UPLOAD_ENDPOINT = "/image";
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

interface ImageUploadResponse {
  image_url: string;
  image_path: string;
}

const getUploadedImageUrl = (payload: ImageUploadResponse) => {
  return payload.image_url;
};

const createProductSchema = z.object({
  name: z.string().min(2, "Product name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  category: z.string().min(2, "Category is required"),
  image_url: z.string().min(1, "Product image is required"),
  price: z
    .number({ invalid_type_error: "Price is required" })
    .positive("Product price must be greater than 0"),
  status: z.enum(["draft", "published", "archived"], {
    message: "Product status must be draft, published or archived",
  }),
  variants: z.string().optional(),
});

type CreateProductFormFields = z.infer<typeof createProductSchema>;

const formatVariantsForInput = (variants?: string[] | string) => {
  if (!variants) return "";
  if (Array.isArray(variants)) return variants.join(", ");
  return variants;
};

const parseVariants = (variants?: string) => {
  if (!variants?.trim()) return undefined;

  const parsed = variants
    .split(",")
    .map((variant) => variant.trim())
    .filter(Boolean);

  return parsed.length > 0 ? parsed : undefined;
};

const FieldError = ({ message }: { message?: string }) => {
  if (!message) return null;

  return (
    <p className="text-sm text-red-600" role="alert">
      {message}
    </p>
  );
};

const getImagePreviewSrc = (imageUrl: string) => {
  if (
    !imageUrl ||
    imageUrl.startsWith("/") ||
    imageUrl.startsWith("data:") ||
    /^https?:\/\//.test(imageUrl)
  ) {
    return imageUrl;
  }

  const baseUrl = API_URL?.replace(/\/$/, "");
  const imagePath = imageUrl.startsWith("uploads/")
    ? imageUrl
    : `uploads/${imageUrl}`;

  return baseUrl ? `${baseUrl}/${imagePath}` : `/${imagePath}`;
};

export default function ProductModal() {
  const { createProductData, setCreateProductData, isEditMode, setIsOpen } =
    useCreateProductContext();
  const FORM_STORAGE_KEY = "productDetailsForm";
  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const [uploading, setUploading] = useState(false);

  const form = useForm<CreateProductFormFields>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      description: "",
      category: "",
      image_url: "",
      price: undefined,
      status: "draft",
      variants: "",
    },
    mode: "onChange",
  });

  const {
    formState: { isValid, errors },
  } = form;

  useEffect(() => {
    if (isEditMode && createProductData?.id) {
      form.reset({
        name: createProductData.name ?? "",
        description: createProductData.description ?? "",
        category: createProductData.category ?? "",
        image_url: createProductData.image_url ?? "",
        price: createProductData.price ?? undefined,
        status: createProductData.status ?? "draft",
        variants: formatVariantsForInput(createProductData.variants),
      });
    }
  }, [isEditMode, createProductData, form]);

  useEffect(() => {
    if (!isEditMode) {
      const stored = localStorage.getItem(FORM_STORAGE_KEY);
      if (!stored) return;

      try {
        const parsed = JSON.parse(stored);
        form.reset({
          name: parsed.name || "",
          description: parsed.description || "",
          category: parsed.category || "",
          image_url: parsed.image_url || "",
          price: parsed.price || 0,
          status: parsed.status || "draft",
          variants: formatVariantsForInput(parsed.variants),
        });
      } catch (error) {
        console.error("Failed to parse stored product data:", error);
        localStorage.removeItem(FORM_STORAGE_KEY);
      }
    }
  }, [form, isEditMode]);

  useEffect(() => {
    if (isEditMode) return;

    const subscription = form.watch((value) => {
      try {
        localStorage.setItem(FORM_STORAGE_KEY, JSON.stringify(value));
      } catch (error) {
        console.error("Failed to store product form:", error);
      }
    });

    return () => subscription.unsubscribe();
  }, [form, isEditMode]);

  const onSubmit: SubmitHandler<CreateProductFormFields> = async (values) => {
    const productPayload: ProductCreate = {
      name: values.name,
      description: values.description,
      category: values.category,
      image_url: values.image_url,
      price: values.price,
      status: values.status,
      variants: parseVariants(values.variants),
    };

    if (isEditMode && createProductData?.id) {
      updateProduct(
        { ...productPayload, id: createProductData.id },
        {
          onSuccess: () => {
            toast.success("Product updated successfully");
            setIsOpen(false);
          },
          onError: (error) => {
            console.error("Update failed:", error);
            toast.error("Failed to update product");
          },
        },
      );
    } else {
      createProduct(productPayload, {
        onSuccess: () => {
          form.reset();
          setIsOpen(false);
          localStorage.removeItem(FORM_STORAGE_KEY);
        },
        onError: (error) => {
          console.error("Create failed:", error);
          toast.error("Failed to create product");
        },
      });
    }
  };

  const handleClose = () => {
    form.reset();
    setIsOpen(false);
    localStorage.removeItem(FORM_STORAGE_KEY);
  };

  const handleFormError = (errors: any) => {
    console.log("Form validation errors:", errors);
    // Show first error to user
    const firstErrorKey = Object.keys(errors)[0];
    if (firstErrorKey && errors[firstErrorKey]?.message) {
      toast.error(errors[firstErrorKey].message);
    }
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or WEBP image");
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      toast.error("Image must be 5MB or smaller");
      event.target.value = "";
      return;
    }

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("purpose", "product");
      formData.append("file", file);

      const response = await $http.post<ImageUploadResponse>(
        IMAGE_UPLOAD_ENDPOINT,
        formData,
      );

      const uploadedImageUrl = getUploadedImageUrl(response.data);

      form.setValue("image_url", uploadedImageUrl, {
        shouldDirty: true,
        shouldValidate: true,
      });

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload failed:", error);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  const imageUrl = form.watch("image_url");
  const isSubmitDisabled = isCreating || isUpdating || uploading || !isValid;

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit, handleFormError)}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-semibold">
          {isEditMode ? "Edit Product" : "Create Product"}
        </h2>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="cursor-pointer transition-all duration-300 hover:text-red-500  "
        >
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Image */}
      <div>
        <Label>Product Image</Label>
        <div className="mt-2 flex items-center gap-4">
          {imageUrl ? (
            <div className="relative w-24 h-24 rounded-xl overflow-hidden border">
              <img
                src={getImagePreviewSrc(imageUrl)}
                alt=""
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() =>
                  form.setValue("image_url", "", {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                className="absolute top-1 right-1 w-5 h-5 bg-black/50 rounded-full flex items-center justify-center"
              >
                <X className="w-3 h-3 text-white" />
              </button>
            </div>
          ) : (
            <label className="w-24 h-24 rounded-xl border-2 border-dashed border-border flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors">
              {uploading ? (
                <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
              ) : (
                <Upload className="w-5 h-5 text-muted-foreground" />
              )}
              <span className="text-[10px] text-muted-foreground mt-1">
                Upload
              </span>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          )}
        </div>
        <FieldError message={errors.image_url?.message} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2 md:col-span-2">
          <Label>Product Name *</Label>
          <Input
            type="text"
            {...form.register("name")}
            placeholder="e.g. Hydrating Rose Serum"
            required
            autoComplete="off"
          />
          <FieldError message={errors.name?.message} />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Description *</Label>
          <Textarea
            {...form.register("description")}
            placeholder="Product description..."
            rows={3}
            autoComplete="off"
          />
          <FieldError message={errors.description?.message} />
        </div>
        <div className="space-y-2">
          <Label>Category *</Label>
          <Input
            type="text"
            {...form.register("category")}
            placeholder="e.g. Serum"
            required
            autoComplete="off"
          />
          <FieldError message={errors.category?.message} />
        </div>
        <div className="space-y-2">
          <Label>Price *</Label>
          <Input
            type="number"
            step="0.01"
            min="0.01"
            {...form.register("price", {
              valueAsNumber: true,
              setValueAs: (value) =>
                value === "" || value === null ? undefined : Number(value),
            })}
            placeholder="e.g. 100"
            required
          />
          <FieldError message={errors.price?.message} />
        </div>
        <div className="space-y-2">
          <Label>Status</Label>
          <Controller
            name="status"
            control={form.control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(value) => {
                  if (!value) return; // guard against Radix firing ""
                  field.onChange(value);
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Product Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          <FieldError message={errors.status?.message} />
        </div>
        <div className="space-y-2">
          <Label>Variants</Label>
          <Input
            type="text"
            {...form.register("variants")}
            placeholder="e.g. Red, Blue, Green"
            autoComplete="off"
          />
          <p className="text-xs text-muted-foreground">
            Optional. Separate multiple variants with commas.
          </p>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t">
        <Button type="button" variant="outline" onClick={handleClose}>
          Cancel
        </Button>
        {isEditMode ? (
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className="cursor-pointer"
          >
            {isUpdating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              "Update Product"
            )}
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={isSubmitDisabled}
            className="cursor-pointer"
          >
            {isCreating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              "Create Product"
            )}
          </Button>
        )}
      </div>
    </form>
  );
}
