"use client";

import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { ChangeEvent, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogFooter, DialogHeader } from "@/components/ui/dialog";

type FoodType = {
  foodName: string;
  ingredients: string;
  price: number;
};

type PropsType = {
  category: Record<string, string>;
};

type CategoryType = {
  categoryName: string;
  _id: string;
};

const FoodValidationSchema = Yup.object({
  foodName: Yup.string()
    .required("Food name is required")
    .max(50, "Food name must not exceed 50 characters"),
  ingredients: Yup.string().required("Ingredients are required"),
  price: Yup.number()
    .required("Price is required")
    .min(0, "Price must be positive"),
});

export const InsertFoodTab = ({ category }: PropsType) => {
  const [file, setFile] = useState<File | null>(null);
  const [url, setUrl] = useState("");
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
      foodName: "",
      ingredients: "",
      price: 0,
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
            category: category._id,
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

  const chooseCategory = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.post(
        "http://localhost:8000/categories",

        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      chooseCategory();
      setError("");

      formik.setFieldValue("categoryName", data.data.categoryName);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to create category");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className=" bg-red-500">
          <Plus className="text-white" />
        </Button>
      </DialogTrigger>
      <DialogContent className="absolute z-50 bg-white border border-green-400 shadow-2xl rounded-2xl !h-[600px] !w-[460px]">
        <DialogHeader>
          <DialogTitle className="flex text-bold ml-6">
            Add new Dishes
          </DialogTitle>
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
                type="text"
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
            <p className="ml-6">Ingredients</p>
            <input
              type="text"
              name="ingredients"
              value={formik.values.ingredients}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Ingredients"
              className="border p-2 w-[412px] h-[112px] mx-auto text-wrap"
            />
            {formik.touched.ingredients && formik.errors.ingredients && (
              <p className="text-red-500 ml-6 text-sm">
                {formik.errors.ingredients}
              </p>
            )}
          </div>

          <div className="flex mx-auto items-center content-center w-[412px] h-[112px] border border-blue-500 border-dashed">
            <input type="file" onChange={fileHandler} accept="image/*" />
            {url && <img src={url} alt="Preview" className="w-24 h-24 mt-2" />}
          </div>
          <DialogFooter className="flex content-between">
            <Button>
              <Trash2 />
            </Button>

            <Button
              className="mr-6"
              type="button"
              onClick={() => formik.handleSubmit()}
            >
              Add new Dishes
            </Button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </DialogFooter>

          {/* <div className="space-y-4">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                placeholder="Enter category name (e.g., Pizza)"
                className="border p-2 w-full"
              />
              <Button onClick={createCategory}>Create Category</Button>
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div> */}
        </form>
      </DialogContent>
    </Dialog>
  );
};

// const createCategory = async () => {
//   if (!newCategoryName.trim()) {
//     setError("Category name is required");
//     return;
//   }
//   try {
//     const token = localStorage.getItem("token");
//     const { data } = await axios.post(
//       "http://localhost:8000/categories",
//       // { categoryName: newCategoryName.trim() },
//       {
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );

//     setNewCategoryName("");
//     setError("");
//     formik.setFieldValue("categoryName", data.data.categoryName);
//   } catch (error: any) {
//     setError(error.response?.data?.message || "Failed to create category");
//   }
// };
