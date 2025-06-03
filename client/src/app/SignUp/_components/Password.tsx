// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useFormik } from "formik";
// import { ChevronLeft, Link } from "lucide-react";
// import Image from "next/image";
// import * as Yup from "yup";

// const validationLogIn = Yup.object({
//   email: Yup.string()
//     .required()
//     .test(
//       "email",
//       "Invalid email. Use format like example@email.com",
//       (value) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(value);
//       }
//     ),
// });

// export const Password = () => {
//   const formik = useFormik({
//     initialValues: {
//       email: "",
//     },
//     validationSchema: validationLogIn,
//     onSubmit: (values) => {},
//   });

//   const emailInputProps = {
//     name: "email",
//     placeholder: "Password",
//     value: formik.values.email,
//     onChange: formik.handleChange,
//   };

//   const isButtonDisabled = !formik.errors.email;

//   return (
//     <div className="flex gap-10 items-center justify-center mx-5">
//       <div className="flex flex-col  w-[416px] h-[288px] gap-4 border border-green-400">
//         <div>
//           <Button variant="outline" className="bg-transparent">
//             <ChevronLeft />
//           </Button>
//         </div>
//         <div>
//           <p className="text-2xl">Create your account</p>
//           <p>Sign up to explore your favorite dishes.</p>
//         </div>

//         <Input className="w-full rounded-2" {...emailInputProps} />
//         <Input className="w-full rounded-2" {...emailInputProps} />

//         <div className="text-red-500">
//           {formik.touched && formik.errors.email}
//         </div>
//         <Button
//           variant="ghost"
//           className="w-full rounded-2 border border-color-gray-50 bg-color-gray-200"
//         >
//           Let's go
//         </Button>
//         <div className="flex content-center items-center justify-center gap-4">
//           <p>Already have an acount?</p>
//           <Button className="text-blue-600 " variant="ghost">
//             {" "}
//             Log in
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };


"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputPropsType } from "../page";
import Right from "./Rigth";
import { Check } from "lucide-react";
import { useState } from "react";
import { CheckboxIcon } from "@radix-ui/react-icons";

export const Password = ({
  values,
  onChange,
  onBlur,
  touched,
  errors,
  handleSubmit, prevStep}: InputPropsType) => {

  const [showPassword,setShowPassword] = useState(false);
  console.log(showPassword,"asd");
  
  const togglePassword = () => setShowPassword((prev) => !prev)


  const isButtonDisabled =
    !!errors.password || !!errors.confirmPassword || !values.password;

  return (
    <div className="flex gap-10 items-center justify-center mx-5 ">
      <div className="flex flex-col w-[416px] h-[372px] shadow-md gap-4">
        <div>
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={prevStep}
          >
            Back
          </Button>
        </div>
        <div>
          <p className="text-2xl">Create a strong password</p>
          <p>Create a strong password with letters, numbers.</p>
        </div>
<div className="flex flex-col gap-4">
<Input
          name="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={values.password}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full rounded-md"
        />
        {touched.password && errors.password && (
          <div className="text-red-500 text-sm">{errors.password}</div>
        )}

        <Input
          name="confirmPassword"
          type={ showPassword? "text": "password"}
          placeholder="Confirm your password"
          value={values.confirmPassword}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full rounded-md"
        />
        {touched.confirmPassword && errors.confirmPassword && (
          <div className="text-red-500 text-sm">{errors.confirmPassword}</div>
        )}
        <div className="flex items-center gap-3">
          
            <Check className="w-[20px] h-[20px]"
            aria-checked={showPassword}
            onChange={togglePassword} 
            
            /> 
            <p>Show password</p>
        </div>
        <div>
          <Button
            variant="ghost"
            className="w-full rounded-md border border-gray-300 bg-gray-200"
            onClick={() => handleSubmit()}
            disabled={isButtonDisabled}
          >
            Submit
          </Button>
</div>
        
        </div>
      </div>
      <Right/>
    </div>
  );
};

