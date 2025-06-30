"use client";

import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ChangeEvent, useEffect, useState } from "react";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";

type FoodType = {
  _id: string;
  foodName: string;
  ingredients: string;
  price: number;
  image: string;
  category: string;
};

type CategoryType = {
  _id: string;
  categoryName: string;
};

type PropsType = {
  food: FoodType;
  categories: CategoryType[];
  onFoodUpdated: () => void;
};

const FoodValidationSchema = Yup.object({
  foodName: Yup.string()
    .required("Food name is required")
    .max(50, "Food name must not exceed 50 characters"),
  ingredients: Yup.string().required("Ingredients are required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be positive"),
  // category: Yup.string().required("Category is required"),
});

export const UpdateFoodTab = ({
  food,
  categories = [],
  onFoodUpdated,
}: PropsType) => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState(food.image);
  const [error, setError] = useState("");

  const uploadImage = async () => {
    if (!file) return url;

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
    }
  };

  const formik = useFormik({
    initialValues: {
      _id: food._id,
      foodName: food.foodName,
      ingredients: food.ingredients,
      price: food.price,
      category: food.category,
      image: food.image,
    },
    validationSchema: FoodValidationSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");
        const imageUrl = await uploadImage();
        if (!imageUrl) return;

        const response = await axios.put(
          `https://food-delivery-p342.onrender.com/admin/food-update/`,
          {
            food: {
              _id: values._id,
              foodName: values.foodName,
              image: imageUrl,
              ingredients: values.ingredients,
              price: values.price,
              category: values.category,
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(response.data.message);
        onFoodUpdated();
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "An error occurred. Please try again.";
        setError(errorMessage);
      }
    },
  });

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://food-delivery-p342.onrender.com/foods/${food._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Food deleted successfully!");
      onFoodUpdated();
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to delete food.";
      setError(errorMessage);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-red-500">
          <Pencil className="absolute text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-white border border-green-400 shadow-2xl rounded-2xl !h-[600px] !w-[460px]">
        <DialogHeader>
          <DialogTitle className="text-bold  ml-6">Update Dish</DialogTitle>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex justify-center gap-6">
            <div className="flex flex-col">
              <p>Food name</p>
              <input
                type="text"
                name="foodName"
                value={formik.values.foodName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Food Name"
                className="w-[194px] border p-2"
              />
              {formik.touched.foodName && formik.errors.foodName && (
                <p className="text-red-500 text-sm">{formik.errors.foodName}</p>
              )}
            </div>
            <div className="flex flex-col">
              <p>Price</p>
              <input
                type="number"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter price"
                className="w-[194px] border p-2"
              />
              {formik.touched.price && formik.errors.price && (
                <p className="text-red-500 text-sm">{formik.errors.price}</p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="ml-6">Category</p>
            <select
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="border p-2 w-[412px] mx-auto"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.categoryName}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <p className="text-red-500 text-sm ml-6">
                {formik.errors.category}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <p className="ml-6">Ingredients</p>
            <textarea
              name="ingredients"
              value={formik.values.ingredients}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingredients"
              className="border p-2 w-[412px] h-[112px] mx-auto"
            />
            {formik.touched.ingredients && formik.errors.ingredients && (
              <p className="text-red-500 text-sm ml-6">
                {formik.errors.ingredients}
              </p>
            )}
          </div>
          <div className="flex mx-auto items-center content-center w-[412px] h-[112px] border border-blue-500 border-dashed">
            <input type="file" onChange={fileHandler} accept="image/*" />
            {url && <img src={url} alt="Preview" className="w-24 h-24 mt-2" />}
          </div>
          <DialogFooter className="flex justify-between">
            <Button type="button" onClick={handleDelete}>
              <Trash2 />
            </Button>
            <Button type="submit" className="mr-6">
              Update Dish
            </Button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

// <div className="space-y-4">
//     <input
//       type="text"
//       value={newCategoryName}
//       onChange={(e) => setNewCategoryName(e.target.value)}
//       placeholder="Enter category name (e.g., Pizza)"
//       className="border p-2 w-full"
//     />
//     <Button onClick={createCategory}>Create Category</Button>
//     {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//   </div>
