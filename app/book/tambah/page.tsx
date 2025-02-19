"use client";

import React from "react";
import { useRouter } from "next/navigation";
import useBookModule from "../lib/lib";
import { useFormik, Form, FormikProvider } from "formik";
import * as yup from "yup";
import { BookCreatePayload } from "../interface/interface";
import InputText from "@/app/component/TextInput";
import Label from "@/app/component/LabelProps";
import Swal from "sweetalert2";

const createBookSchema = yup.object().shape({
  title: yup.string().default("").required("Wajib di isi"),
  author: yup.string().default("").required("Wajib di isi"),
  year: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .required("Wajib di isi"),
  deskripsi: yup.string().default(""),
});

export default function TambahBook() {
  const { useCreateBook } = useBookModule();
  const router = useRouter();

  // Asumsikan useCreateBook mengembalikan objek dengan properti mutate
  const { mutate: createBook } = useCreateBook();

  const formik = useFormik<BookCreatePayload>({
    initialValues: {
      ...createBookSchema.getDefault(),
      deskripsi: "",
    },
    validationSchema: createBookSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm, setValues }) => {
      // Panggil mutation untuk membuat buku
      createBook(values, {
        onSuccess: () => {
          // Tampilkan alert SweetAlert2 ketika berhasil
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: "Buku berhasil ditambahkan!",
            timer: 2000,
            showConfirmButton: false,
          });
          // Setelah sukses, reset form dan navigasi ke halaman daftar buku
          resetForm();
          setValues(createBookSchema.getDefault());
          router.push("/book");
        },
        onError: (error) => {
          // Tampilkan alert SweetAlert2 ketika terjadi error
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Gagal menambahkan buku. Mohon periksa input Anda. ",
          });
          console.error("Gagal menambahkan buku", error);
        },
      });
    },
  });

  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

  return (
    <section className="flex flex-col items-center justify-center w-full h-full p-5">
      <h1 className="text-2xl font-bold mb-5">Tambah Book</h1>

      <FormikProvider value={formik}>
        <Form className="space-y-5" onSubmit={handleSubmit}>
          <section>
            <Label htmlFor="title" title="Judul" />
            <InputText
              value={values.title ?? ""}
              placeholder="Judul Buku"
              id="title"
              name="title"
              onChange={handleChange}
              onBlur={handleBlur}
              isError={!!errors.title}
              messageError={errors.title}
            />
          </section>
          <section>
            <Label htmlFor="author" title="Penulis" />
            <InputText
              value={values.author ?? ""}
              placeholder="Penulis Buku"
              id="author"
              name="author"
              onChange={handleChange}
              onBlur={handleBlur}
              isError={!!errors.author}
              messageError={errors.author}
            />
          </section>
          <InputText
            type="number"
            value={values.year ?? ""}
            placeholder="Tahun"
            id="year"
            name="year"
            onChange={handleChange}
            onBlur={handleBlur}
            isError={!!errors.year}
            messageError={errors.year}
          />
          <section>
            <Label htmlFor="deskripsi" title="Deskripsi" />
            <InputText
              value={values.deskripsi ?? ""}
              placeholder="Deskripsi Buku"
              id="deskripsi"
              name="deskripsi"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </section>
          <section className="mt-5">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Add Book
            </button>
          </section>
        </Form>
      </FormikProvider>
    </section>
  );
}
