import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";

// Import Select Options
import { brandOptions, colorsList, categoryOptions } from "@/utils/product.utils";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/devsajadurrahman/image/upload";
const UPLOAD_PRESET = "sajadurrahmanpresent";

const CreateProduct = () => {
  const [createProduct] = useCreateProductMutation();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Upload multiple images to Cloudinary
  const uploadImagesToCloudinary = async (files: File[]) => {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);

      try {
        const response = await axios.post(CLOUDINARY_URL, formData);
        uploadedUrls.push(response.data.secure_url);
      } catch (error) {
        toast.error("Image upload failed.");
      }
    }
    return uploadedUrls;
  };

  const onSubmit = async (data: any) => {
    let uploadedImageUrls = previewImages;

    // If new images are selected, upload them to Cloudinary
    if (selectedImages.length > 0) {
      uploadedImageUrls = await uploadImagesToCloudinary(selectedImages);
    }

    const formattedData = {
      ...data,
      categories: data.categories ? [data.categories] : [],
      colors: data.colors ? [data.colors] : [],
      images: uploadedImageUrls.length > 0 ? uploadedImageUrls : data.images.split(",").map((img: string) => img.trim()),
    };

    try {
      const res = await createProduct(formattedData);
      if (res.data.success) {
        toast.success('Product created successfully');
      }
    } catch (error) {
      toast.error('Failed to create product');
    }
  };

  // Handle file selection for multiple product images
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      setSelectedImages(newFiles);
      setPreviewImages(newFiles.map((file) => URL.createObjectURL(file)));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Product Name */}
            <div>
              <Label>Name</Label>
              <Input {...register("name", { required: "Product name is required" })} />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
            </div>

            {/* Brand */}
            <div>
              <Label>Brand</Label>
              <Controller
                control={control}
                name="brand"
                rules={{ required: "Brand is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brandOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message as string}</p>}
            </div>

            {/* Price */}
            <div>
              <Label>Price ($)</Label>
              <Input type="number" {...register("price", { required: "Price is required", valueAsNumber: true })} />
              {errors.price && <p className="text-red-500 text-sm">{errors.price.message as string}</p>}
            </div>

            {/* Category (Single Select) */}
            <div>
              <Label>Category</Label>
              <Controller
                control={control}
                name="categories"
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.categories && <p className="text-red-500 text-sm">{errors.categories.message as string}</p>}
            </div>

            {/* Description */}
            <div>
              <Label>Description</Label>
              <Textarea {...register("description", { required: "Description is required" })} />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message as string}</p>}
            </div>

            {/* Stock Quantity */}
            <div>
              <Label>Stock Quantity</Label>
              <Input type="number" {...register("stockQuantity", { required: "Stock quantity is required", valueAsNumber: true })} />
              {errors.stockQuantity && <p className="text-red-500 text-sm">{errors.stockQuantity.message as string}</p>}
            </div>

            {/* Product Image Upload */}
            <div>
              <Label>Product Images</Label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full border p-2 rounded-md"
              />
              {previewImages.length > 0 && (
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {previewImages.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-32 h-32 object-cover"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Video URL */}
            <div>
              <Label>Video URL</Label>
              <Input type="url" {...register("videoUrl")} />
            </div>

            {/* Colors (Single Select) */}
            <div>
              <Label>Colors</Label>
              <Controller
                control={control}
                name="colors"
                rules={{ required: "Color is required" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorsList.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.colors && <p className="text-red-500 text-sm">{errors.colors.message as string}</p>}
            </div>

            {/* Weight */}
            <div>
              <Label>Weight (kg)</Label>
              <Input type="number" step="0.1" {...register("weight", { required: "Weight is required", valueAsNumber: true })} />
              {errors.weight && <p className="text-red-500 text-sm">{errors.weight.message as string}</p>}
            </div>

            {/* Discount */}
            <div>
              <Label>Discount (%)</Label>
              <Input type="number" {...register("discount", { valueAsNumber: true })} />
            </div>

            {/* Submit Button */}
            <Button className="bg-blue-500 w-full" type="submit">
              Create Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateProduct;
