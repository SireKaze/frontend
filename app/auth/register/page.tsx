/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useFormik, Form, FormikProvider, getIn } from "formik";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import * as yup from "yup";
import { LoginPayload, RegisterPayload } from "../interface";
import Label from "../../component/LabelProps";
import Button from "../../component/ButtonProps";
import useAuthModule from "../lib";
import InputText from './../../component/TextInput';
import Link from "next/link";
 
export const registerSchema = yup.object().shape({
  nama: yup.string().nullable().default("").required("Wajib isi"),
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
 
const Register = () => {
  const { useRegister } = useAuthModule();
  const { mutate,  isPending: isloading} = useRegister();
  const formik = useFormik<RegisterPayload>({
    initialValues: registerSchema.getDefault(),
    validationSchema: registerSchema,
    enableReinitialize: true,
    onSubmit: (payload) => {
      mutate(payload);
    },
  });
  const {
    handleChange,
    handleSubmit,
    handleBlur,
    values,
    errors,
    resetForm,
    setValues,
  } = formik;
 
  return (
    <section>
      <div className="flex items-center justify-center w-full">
        <h1 className="text-3xl text-blue-400">Register</h1>
      </div>
      <FormikProvider value={formik}>
        <Form className="space-y-5" onSubmit={handleSubmit}>
          <section>
            <Label htmlFor="nama" title="Nama" />
            <InputText
              value={values.nama}
              placeholder="ihsan"
              id="nama"
              name="nama"
              onChange={handleChange}
              onBlur={handleBlur}
              isError={getIn(errors, "nama")}
              messageError={getIn(errors, "nama")}
            />
          </section>
          <section>
            <Label htmlFor="email" title="Email" />
            <InputText
              value={values.email}
              placeholder="exampel@email.com"
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
              title="Register"
              colorSchema="blue"
              isLoading={isloading}
              disabled={isloading}
            />
            <Link href={"/auth/login"}>
              <Button title="HalamanLogin" colorSchema="green" />
            </Link>
          </section>
        </Form>
      </FormikProvider>
    </section>
  );
};
 
export default Register;