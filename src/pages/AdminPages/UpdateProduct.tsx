import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateProductMutation } from "@/redux/features/product/productApi";
import { toast } from "sonner";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";

const categoriesList = ["Mountain", "Road", "Hybrid", "Electric"];
const colorsList = ["Red", "Blue", "Black", "White", "Green"];

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/devsajadurrahman/image/upload";
const UPLOAD_PRESET = "sajadurrahmanpresent";

type FormData = {
  _id?: string;
  name?: string;
  brand?: string;
  price?: number;
  categories?: string;
  description?: string;
  stockQuantity?: number;
  images?: string[];
  videoUrl?: string;
  colors?: string;
  weight?: number;
  discount?: number;
};

const UpdateProduct = () => {
    const { productId } = useParams<{ productId: string }>();
  const [updateProduct] = useUpdateProductMutation();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const uploadImages = async (files: File[]) => {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", UPLOAD_PRESET);
      try {
        const { data } = await axios.post(CLOUDINARY_URL, formData);
        uploadedUrls.push(data.secure_url);
      } catch {
        toast.error("Image upload failed.");
      }
    }
    return uploadedUrls;
  };

  const onSubmit = async (data: FormData) => {
    let imageUrls = previewImages;
    if (selectedImages.length > 0) {
      imageUrls = await uploadImages(selectedImages);
    }
  
    const updatedData: Record<string, any> = {};
  
    // Only add changed fields to updatedData
    if (data.name) updatedData.name = data.name;
    if (data.brand) updatedData.brand = data.brand;
    if (data.price) updatedData.price = data.price;
    if (data.categories) updatedData.categories = [data.categories];
    if (data.description) updatedData.description = data.description;
    if (data.stockQuantity) updatedData.stockQuantity = data.stockQuantity;
    if (imageUrls.length > 0) updatedData.images = imageUrls;
    if (data.videoUrl) updatedData.videoUrl = data.videoUrl;
    if (data.colors) updatedData.colors = [data.colors];
  
    if (Object.keys(updatedData).length === 0) {
      toast.error("No changes detected.");
      return;
    }
  
    try {
      const res = await updateProduct({ productId, updatedData });
      if (res.data.success) {
        toast.success("Product updated successfully");
      } else {
        toast.error(res.data.message || "Failed to update product");
      }
    } catch {
      toast.error("Failed to update product");
    }
  };
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Update Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Label>Name</Label>
            <Input {...register("name")} />

            <Label>Brand</Label>
            <Input {...register("brand")} />

            <Label>Price ($)</Label>
            <Input type="number" {...register("price", { valueAsNumber: true })} />

            <Label>Category</Label>
            <Controller
              control={control}
              name="categories"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriesList.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Label>Description</Label>
            <Textarea {...register("description")} />

            <Label>Stock Quantity</Label>
            <Input type="number" {...register("stockQuantity", { valueAsNumber: true })} />

            <Label>Product Images</Label>
            <input type="file" accept="image/*" multiple onChange={handleFileChange} className="w-full border p-2 rounded-md" />
            {previewImages.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {previewImages.map((image, index) => (
                  <img key={index} src={image} alt={`Preview ${index + 1}`} className="w-32 h-32 object-cover" />
                ))}
              </div>
            )}

            <Label>Video URL</Label>
            <Input type="url" {...register("videoUrl")} />

            <Label>Colors</Label>
            <Controller
              control={control}
              name="colors"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    {colorsList.map((color) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Button className="bg-blue-500 w-full" type="submit">
              Update Product
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProduct;
