import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateProductMutation } from "@/redux/features/product/productApi";
import { toast } from "sonner";

const categoriesList = ["Mountain", "Road", "Hybrid", "Electric"];
const colorsList = ["Red", "Blue", "Black", "White", "Green"];

const CreateProduct = () => {
  const [createProduct] = useCreateProductMutation();
  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    // Convert string inputs to arrays
    const formattedData = {
      ...data,
      categories: data.categories ? [data.categories] : [],
      colors: data.colors ? [data.colors] : [],
      images: data.images ? data.images.split(",").map((img: string) => img.trim()) : [],
    };

    try {
        const res = await createProduct(formattedData);
        if(res.data.success){
            toast.success('Product created successfully')
        }
    } catch (error) {
        toast.error('Failed to create product')
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
              <Input {...register("brand", { required: "Brand is required" })} />
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
                      {categoriesList.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
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

            {/* Images (Comma-Separated Input) */}
            <div>
              <Label>Images (URLs, comma separated)</Label>
              <Input {...register("images")} placeholder="Enter image URLs separated by commas" />
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
                      {colorsList.map((color) => (
                        <SelectItem key={color} value={color}>
                          {color}
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
