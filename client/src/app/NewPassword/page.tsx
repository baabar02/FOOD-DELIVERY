"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputPropsType } from "../SignUp/page";
import Right from "../SignUp/_components/Rigth";
import { Check } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import * as Yup from "yup"
import { useFormik } from "formik";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";


  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Email is required")
    .min(4, "Password must be at least 4 characters")
    .matches(/[a-zA-Z]/, "Password must contain letters")
    .matches(/[0-9]/, "Password must contain numbers"),
    
    confirmPassword: Yup.string().required("Confirm password is required")
    .oneOf([Yup.ref("password")], "Passwords must match")  
  });

 const NewPassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState("");
  const searchParams = useSearchParams();
  const [error, setError] = useState("");
  const email = searchParams.get("email");


const formik = useFormik({
  initialValues: {
    password:"",
    confirmPassword: "",
  }, 
  validationSchema,
  onSubmit:async(values)=>{
    if (!email) {
        setError("Email is missing. Please start the reset process again.");
        return;
      }

    await axios.post("http://localhost:8000/reset-password"), {
     email,
     NewPassword:values.password
    }
    setSuccess("Password reset successfully! Redirecting to login...");
    setTimeout(() => router.push("/LogIn"), 2000);
  } 

}) 


  const isButtonDisabled =
    !!formik.errors.password || !!formik.errors.confirmPassword || !formik.values.password;

  return (
    <div className="flex gap-10 items-center justify-center mx-5 ">
      <div className="flex flex-col w-[416px] h-[372px] shadow-md gap-4">
        <div>
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={()=> router.back()}
          >
            Back
          </Button>
        </div>
        <div>
          <p className="text-2xl">Create new password</p>
          <p>Set a new password with a combination of letters and numbers for better security.</p>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-500 text-sm">{success}</div>}
        <div className="flex flex-col gap-4">
          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md"
          />
          {formik.touched.password && formik.errors.password && (
            <div className="text-red-500 text-sm">{formik.errors.password}</div>
          )}

          <Input
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full rounded-md"
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="text-red-500 text-sm">{formik.errors.confirmPassword}</div>
          )}
          <div className="flex items-center gap-3">
            <Checkbox checked={showPassword} 
            onCheckedChange={()=> setShowPassword(!showPassword)}/>

            <p>Show password</p>
          </div>
          <div>
            <Button
              type="submit"
              variant="ghost"
              className="w-full rounded-md border border-gray-300 bg-gray-200"
              
              disabled={isButtonDisabled}
            >
              {formik.isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          </div>
        </div>
      </div>
      <Right />
    </div>
  );
};

export default NewPassword;