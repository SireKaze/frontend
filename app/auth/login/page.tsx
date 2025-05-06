/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";
import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import { LoginPayload } from "../interface";
import Label from "../../component/LabelProps";
import Button from "../../component/ButtonProps";
import useAuthModule from "../lib";
import InputText from './../../component/TextInput';
import Link from "next/link";
import { Session } from 'next-auth';

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .nullable()
    .default("")
    .email("Gunakan format email")
    .required("Wajib isi"),
  password: yup
    .string()
    .nullable()
    .default("")
    .required("Wajib isi")
    .min(8, "Minimal 8 karakater"),
});

const Login = () => {
    const { useLogin } = useAuthModule();
    const {data: session, status} = useSession();
    const router = useRouter();
    console.log("Session", session);
    console.log("status", status);

    useEffect(() => {
      if (session?.user.role === "admin") {
        return router.push("/admin");
      }
      if (session?.user.role === "member") {
        return router.push("/member");
      }
    }
    
    ) 
    
  const { mutate, isPending: isLoading } = useLogin();
  const formik = useFormik<LoginPayload>({
    initialValues: registerSchema.getDefault(),
    validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      console.log("payload", payload);
      mutate(payload);
    },
  });
  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

  if(status === "loading" || status === "authenticated"){
    return <div>Loading...</div>
  }
 
  if (status === "unauthenticated")
  return (
    <section>
      <div className="flex items-center justify-center w-full">
        <h1 className="text-3xl text-blue-400">Login</h1>
      </div>
      <FormikProvider value={formik}>
        <Form className="space-y-5" onSubmit={handleSubmit}>
          <section>
            <Label htmlFor="email" title="Email" />
            <InputText
              value={values.email}
              placeholder="example@email.com"
              id="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              isError={getIn(errors, "email")}
              messageError={getIn(errors, "email")}
            />
          </section>
          <section>
            <Label htmlFor="password" title="Password" />
 
            <InputText
              value={values.password}
              placeholder="**********"
              id="password"
              name="password"
              type="password"
              onChange={handleChange}
              onBlur={handleBlur}
              isError={getIn(errors, "password")}
              messageError={getIn(errors, "password")}
            />
          </section>
            <section>
            <Button
              type="submit"
              title="Login"
              colorSchema="blue"
              isLoading={isLoading}
              disabled={isLoading}
            />
            <Link href={"/auth/register"}>
              <Button title="Halaman Register" colorSchema="green" />
            </Link>
            <Link href={"/auth/forgot-pw"}>
              <Button title="Lupa Password" colorSchema="red" />
            </Link>
            <Button
              title="Login by Google"
              colorSchema="red"
              onClick={() => {
                signIn("google")
              }}
              type="button"
              isLoading={isLoading}
              disabled={isLoading}
            />
            <Button
              title="Login by github"
              colorSchema="gray"
              onClick={() => {
                signIn("github")
              }}
              type="button"
              isLoading={isLoading}
              disabled={isLoading}
            />
            </section>
        </Form>
      </FormikProvider>
    </section>
  );


};
 
export default Login;
