"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useBookModule from "../lib/lib";
import { useFormik, FormikProvider } from "formik";
import * as yup from "yup";
import { BookCreatePayload } from "../interface";
import InputText from "@/app/component/TextInput";
import Label from "@/app/component/LabelProps";

const updateBookSchema = yup.object().shape({
  title: yup.string().required("Wajib di isi"),
  author: yup.string().required("Wajib di isi"),
  year: yup
    .number()
    .transform((value, originalValue) => {
      return originalValue === "" ? undefined : value;
    })
    .required("Wajib di isi"),
  deskripsi: yup.string(),
});

export default function UpdateBook() {
  const { useUpdateBook, useDetailBook } = useBookModule();
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookId = searchParams.get("id");

  console.log("Retrieved bookId:", bookId);

  // Pastikan bookId tersedia sebelum memanggil useDetailBook
  const { data: bookData, isLoading } = useDetailBook(bookId || "");

  console.log("Book data:", bookData);

  // Hook untuk update buku
  const { mutate: updateBook } = useUpdateBook();

  const formik = useFormik<BookCreatePayload>({
    initialValues: {
      title: "",
      author: "",
      year: "",
      deskripsi: "",
    },
    validationSchema: updateBookSchema,
    enableReinitialize: true,
    onSubmit: (values, { resetForm }) => {
      if (bookId) {
        // Konversi nilai year menjadi number sebelum mengirim payload
        const updatedPayload: BookCreatePayload = {
          ...values,
          year: Number(values.year),
          deskripsi: values.deskripsi ?? "",
        };

        console.log("Submitting form with values:", updatedPayload);

        updateBook(
          { id: Number(bookId), payload: updatedPayload },
          {
            onSuccess: () => {
              console.log("Book updated successfully");
              resetForm();
              router.push("/book");
            },
            onError: (error) => {
              console.error("Failed to update book", error);
            },
          }
        );
      } else {
        console.error("Book ID is missing");
      }
    },
  });

  useEffect(() => {
    if (bookData) {
      formik.setValues({
        title: bookData.title || "",
        author: bookData.author || "",
        // Pastikan konversi ke string untuk konsistensi dengan value input
        year: bookData.year ? String(bookData.year) : "",
        deskripsi: bookData.deskripsi || "",
      });
    }
  }, [bookData]);

  const { handleChange, handleSubmit, handleBlur, values, errors } = formik;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex flex-col items-center justify-center w-full h-full p-5">
      <h1 className="text-2xl font-bold mb-5">Update Book</h1>

      <FormikProvider value={formik}>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <section>
            <Label htmlFor="title" title="Judul" />
            <InputText
              value={values.title}
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
              value={values.author}
              placeholder="Penulis Buku"
              id="author"
              name="author"
              onChange={handleChange}
              onBlur={handleBlur}
              isError={!!errors.author}
              messageError={errors.author}
            />
          </section>

          <section>
            <Label htmlFor="year" title="Tahun" />
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
          </section>

          <section>
            <Label htmlFor="deskripsi" title="Deskripsi" />
            <InputText
              value={values.deskripsi}
              placeholder="Deskripsi Buku"
              id="deskripsi"
              name="deskripsi"
              onChange={handleChange}
              onBlur={handleBlur}
              isError={!!errors.deskripsi}
              messageError={errors.deskripsi}
            />
          </section>

          <section className="mt-5">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Update Book
            </button>
          </section>
        </form>
      </FormikProvider>
    </section>
  );
}
