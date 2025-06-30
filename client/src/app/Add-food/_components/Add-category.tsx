"use client";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";

type FoodValues = {
  categoryName: string;
};

type CategoryPageProps = {
  onCreatedCategory: (categoryName: string) => void;
};

const FoodValidationSchema = Yup.object({
  categoryName: Yup.string()
    .required("Category name is required")
    .min(2, "Category name must be at least 2 characters")
    .max(50, "Category name must not exceed 50 characters"),
});

export const CategoryPage = ({ onCreatedCategory }: CategoryPageProps) => {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState("");

  const formik = useFormik<FoodValues>({
    initialValues: {
      categoryName: "",
    },
    validationSchema: FoodValidationSchema,
    onSubmit: async (values) => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.post(
          "https://food-delivery-p342.onrender.com/categories",
          { categoryName: values.categoryName },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert(response.data.message);
        router.push("/categories");
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "An error occurred. Please try again.";
        alert(errorMessage);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Add New Category</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="categoryName" className="block text-sm font-medium">
            Category Name
          </label>
          <input
            id="categoryName"
            name="categoryName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.categoryName}
            className="mt-1 block w-full border rounded-md p-2"
          />
          {formik.touched.categoryName && formik.errors.categoryName ? (
            <div className="text-red-500 text-sm">
              {formik.errors.categoryName}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Add Category
        </button>
      </form>
    </div>
  );
};
