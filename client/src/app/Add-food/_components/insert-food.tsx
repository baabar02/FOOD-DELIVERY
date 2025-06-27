"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useAuth } from "@/app/_components/UserProvider";
import { ChangeEvent, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type FoodType = {
  categoryName?: string;
   foodName: string;
  image: string;
  ingredients: string;
  price: number;
};

type FoodProps = {
  foodName: string;
  image: string;
  ingredients: string;
  price: number;
  _id: string;
 address:string;
};

type PropsType = {
  foods: Record<string, FoodProps[]>;
 
};

type FoodValues = {
  categoryName: string;
};

type CategoryPageProps = {
  onCreatedCategory: (categoryName: string) => void;
};

const FoodValidationSchema = Yup.object({
  foodName: Yup.string()
    .required("Food name is required")
    .min(2, "Food name must be at least 2 characters")
    .max(50, "Food name must not exceed 50 characters"),
  ingredients: Yup.string().required("Ingredients are required"),
  price: Yup.number().required("Price is required").min(0, "Price must be positive"),
  categoryName: Yup.string().required("Category is required"),
});

export const InsertFood = ({ foods }: PropsType) => {
  const router = useRouter();


  const { user } = useAuth();
 
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
  
  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [error, setError] = useState("");

  const uploadImage = async () => {
    if (!file) {
      alert("Please select a file");
      return null;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "food-delivery");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/dip9rajob/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      console.log("Uploaded image URL:", result.secure_url);
      alert("Image uploaded successfully!");
      return result.secure_url;
    } catch (error) {
      console.error("Failed to upload image:", error);
      alert("Failed to upload image");
      return null;
    }
  };

  const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);

      const url = URL.createObjectURL(selectedFile);
      setUrl(url);
      console.log("Selected file:", selectedFile.name);
    }
  };

  const formik = useFormik<FoodType>({
    initialValues: {
      categoryName: "",
      foodName:"",
      image:"",
      ingredients:"",
      price:0,  

    },
    validationSchema: FoodValidationSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");

const imageUrl = await uploadImage();
if (!imageUrl) return;

const response = await axios.post(
  "http://localhost:8000/foods",
  {
    foodName: values.foodName,
    image: imageUrl,
    ingredients: values.ingredients,
    price: values.price,
    category: values.categoryName,
  },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);


        alert(response.data.message);
      
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "An error occurred. Please try again.";
        alert(errorMessage);
      }
    },
  });

const createCategory = async () => {
    if (!newCategoryName.trim()) {
      setError("Category name is required");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:8000/category",
        { categoryName: newCategoryName.trim() },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setNewCategoryName("");
      setError("");
      formik.setFieldValue("categoryName", data.data.categoryName); 
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to create category");
    }
  };

  return (
   <Tabs defaultValue="food" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="food">Add Food</TabsTrigger>
        <TabsTrigger value="category">Add Category</TabsTrigger>
      </TabsList>
      <TabsContent value="food">
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="foodName"
              value={formik.values.foodName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Food Name"
              className="border p-2 w-full"
            />
            {formik.touched.foodName && formik.errors.foodName && (
              <p className="text-red-500 text-sm">{formik.errors.foodName}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="ingredients"
              value={formik.values.ingredients}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingredients"
              className="border p-2 w-full"
            />
            {formik.touched.ingredients && formik.errors.ingredients && (
              <p className="text-red-500 text-sm">{formik.errors.ingredients}</p>
            )}
          </div>
          <div>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Price"
              className="border p-2 w-full"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="text-red-500 text-sm">{formik.errors.price}</p>
            )}
          </div>
          <div>
            <select
              name="categoryName"
              value={formik.values.categoryName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border p-2 w-full"
            >
              <option value="">Select a category</option>
              {categories.map((cat:) => (
                <option key={cat.categoryName} value={cat.categoryName}>
                  {cat.categoryName}
                </option>
              ))}
            </select>
            {formik.touched.categoryName && formik.errors.categoryName && (
              <p className="text-red-500 text-sm">{formik.errors.categoryName}</p>
            )}
          </div>
          <div>
            <input type="file" onChange={fileHandler} accept="image/*" />
            {url && <img src={url} alt="Preview" className="w-24 h-24 mt-2" />}
          </div>
          <Button type="submit">Add Food</Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </form>
      </TabsContent>
      <TabsContent value="category">
        <div className="space-y-4">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name (e.g., Pizza)"
            className="border p-2 w-full"
          />
          <Button onClick={createCategory}>Create Category</Button>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>
      </TabsContent>
    </Tabs>

  );
};


