"use client";
import { useRouter } from "next/navigation";
import { Schema } from "mongoose";
import { useFormik } from "formik";
import axios from "axios";
import * as Yup from "yup";

type FoodValues = {
  categoryName: string;
};

const FoodValidationSchema = Yup.object({
  categoryName: Yup.string().required("Category name is required"),
});

export type foodProps = {
  values: FoodValues;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
};

// FoodValidationSchema.index({ categoryName: 1 }, { unique: true });

const CategoryPage = () => {
  const router = useRouter();

  const formik = useFormik<FoodValues>({
    initialValues: {
      categoryName: "",
    },
    validationSchema: FoodValidationSchema,

    onSubmit: async (values) => {
      console.log("asdfghjkl");
      try {
        const response = await axios.post(
          "http://localhost:8000/addCategories",
          {
            categoryName: values.categoryName,
          }
        );
        console.log(response.data.message, "axios");
        if (response) {
          alert("add successful");
        }
      } catch (err: any) {
        const errorMessage =
          err.response?.data?.message || "Error occured. try again";
        alert(errorMessage);
      }
    },
  });
  return <div>jgkh</div>;
};

export default CategoryPage;
