"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { ChevronLeft, Link } from "lucide-react";
import { InputPropsType } from "../page";
import Right from "./Rigth";

export const Left = ({
  values,
  onChange,
  onBlur,
  touched,
  errors,
  nextStep,
}: InputPropsType) => {
  // const emailInputProps = {
  //   name: "email",
  //   placeholder: "Enter your email address",
  //   value: formik.values.email,
  //   onChange: formik.handleChange,
  // };
  // const passwordProps = {
  //   name: "password",
  //   placeholder: "password address",
  //   value: formik.values.email,
  //   onclick: formik.handleChange,
  // };

  const isButtonDisabled = !errors.email && !values.email;

  return (
    <div className="flex gap-10 items-center justify-center mx-5">
      <div className="flex flex-col w-[416px] h-[288px] gap-4 shadow-md">
        <div>
          <Button variant="outline" disabled={false} className="bg-transparent">
            <ChevronLeft />
          </Button>
        </div>
        <div>
          <p className="text-2xl">Create your account</p>
          <p>Sign up to explore your favorite dishes.</p>
        </div>

        <Input
          name="email"
          placeholder="Enter your email address"
          value={values.email}
          onChange={onChange}
          onBlur={onBlur}
          className="w-full rounded-2"
        />
        {touched.email && errors.email && (
          <div className="text-red-500">{errors.email}</div>
        )}

        <div>
          {
            <Button
              variant="ghost"
              className="w-full rounded-2 border border-color-gray-50 bg-color-gray-300"
              onClick={nextStep}
              disabled={isButtonDisabled}
            >
              Lets go
            </Button>
          }
        </div>

        <div className="flex content-center items-center justify-center gap-2">
          <p>Already have an acount?</p>
          <Button className="text-blue-600 " variant="ghost">
            {" "}
            Log in
          </Button>
        </div>
      </div>
      <Right />
    </div>
  );
};

// "use client";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ChevronLeft } from "lucide-react";
// import { InputPropsType } from "../page";

// export const Left = ({
//   values,
//   onChange,
//   onBlur,
//   touched,
//   nextStep,
//   errors,
// }: InputPropsType) => {
//   const isButtonDisabled = !!errors.email || !values.email;

//   return (
//     <div className="flex gap-10 items-center justify-center mx-5">
//       <div className="flex flex-col w-[416px] h-[288px] gap-4">
//         <div>
//           <Button
//             variant="outline"
//             className="bg-transparent"
//             onClick={() => window.history.back()} // Optional: Navigate back
//             disabled={false} // Adjust based on your needs
//           >
//             <ChevronLeft />
//           </Button>
//         </div>
//         <div>
//           <p className="text-2xl">Create your account</p>
//           <p>Sign up to explore your favorite dishes.</p>
//         </div>

//         <Input
//           name="email"
//           placeholder="Enter your email address"
//           value={values.email}
//           onChange={onChange}
//           onBlur={onBlur}
//           className="w-full rounded-md"
//         />
//         {touched.email && errors.email && (
//           <div className="text-red-500 text-sm">{errors.email}</div>
//         )}

//         <div>
//           <Button
//             variant="ghost"
//             className="w-full rounded-md border border-gray-300 bg-gray-200"
//             onClick={nextStep}
//             disabled={isButtonDisabled}
//           >
//             Let’s go
//           </Button>
//         </div>

//         <div className="flex items-center justify-center gap-4">
//           <p>Already have an account?</p>
//           <Button
//             variant="ghost"
//             className="text-blue-600"
//             onClick={() => window.location.href = "/login"} // Adjust to your login route
//           >
//             Log in
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
