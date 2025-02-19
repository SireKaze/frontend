/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Table, Th, Thead, Tr, Tbody, Td } from "../component/table";
import useBookModule from "./lib/lib";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../component/ButtonProps";
import React, { createContext } from 'react';
import Swal from 'sweetalert2';

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Page for listing books
 * 
 * This page will display a list of books with the following columns:
 * - Select: A checkbox for selecting the book
 * - ID: The ID of the book
 * - Author: The author of the book

/******  118ed18f-aae7-4f93-9ed9-fb43cc3e350c  *******/
const Book = () => {
  const { useBookList, deleteBookById, deleteMultipleBooks } = useBookModule();
  const router = useRouter();
  const [authorFilter, setAuthorFilter] = useState<string>("");
  const [fromYearFilter, setFromYearFilter] = useState<string>("");
  const [toYearFilter, setToYearFilter] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const { data, isFetching, isLoading, refetch } = useBookList({
    author: authorFilter,
    from_year: fromYearFilter,
    to_year: toYearFilter,
    page,
    pageSize
  });

  const handleSearch = () => {
    refetch();
  };

  const handleDeleteSingle = async (id: string) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteBookById(id);
        refetch();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  };

  const handleDeleteMultiple = async () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteMultipleBooks(selectedBooks);
        setSelectedBooks([]);
        refetch();
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
      }
    })
  };

  const handleSelectBook = (id: string) => {
    setSelectedBooks((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((bookId) => bookId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <>
      <section className="container px-4 mx-auto mt-12">
        <div className="mb-4">
          <h1 className="text-xl font-semibold mb-2">Book List</h1>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
          <Button onClick={() => {
            router.push('/book/tambah')
          }} colorSchema="red" title="tambah" />
          {showFilters && (
            <div className="flex items-center gap-4 mb-4">
              <input
                type="text"
                placeholder="Filter by Author"
                className="p-2 border rounded"
                value={authorFilter}
                onChange={(e) => setAuthorFilter(e.target.value)}
              />
              <input
                type="number"
                placeholder="From Year"
                className="p-2 border rounded"
                value={fromYearFilter}
                onChange={(e) => setFromYearFilter(e.target.value)}
              />
              <input
                type="number"
                placeholder="To Year"
                className="p-2 border rounded"
                value={toYearFilter}
                onChange={(e) => setToYearFilter(e.target.value)}
              />
              <input
                type="number"
                placeholder="Page"
                className="p-2 border rounded"
                value={page}
                onChange={(e) => setPage(Number(e.target.value))}
              />
              <input
                type="number"
                placeholder="Page Size"
                className="p-2 border rounded"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              />
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          )}
        </div>

        <Table>
          <Thead>
            <Tr>
              <Th scope="col">Select</Th>
              <Th scope="col">ID</Th>
              <Th scope="col">Author</Th>
              <Th scope="col">Title</Th>
              <Th scope="col">Year</Th>
              <Th scope="col">Created At</Th>
              <Th scope="col">Updated At</Th>
              <Th scope="col">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isLoading || isFetching ? (
              <Tr>
                <Td colSpan={8}>Loading...</Td>
              </Tr>
            ) : data?.data.length ? (
              data.data.map((item) => (
                <Tr key={item.id}>
                  <Td>
                    <input
                      type="checkbox"
                      checked={selectedBooks.includes(item.id)}
                      onChange={() => handleSelectBook(item.id)}
                    />
                  </Td>
                  <Td>{item.id}</Td>
                  <Td>{item.author}</Td>
                  <Td>{item.title}</Td>
                  <Td>{item.year}</Td>
                  <Td>{item.create_at || "Not Available"}</Td>
                  <Td>{item.update_at || "Not Available"}</Td>
                  <Td>
                    <button
                      className="px-2 py-1 bg-green-500 text-white rounded mr-2"
                      onClick={() => router.push(`/book/update?id=${item.id}`)}
                    >
                      Update
                    </button>
                    <button
                      className="px-2 py-1 bg-red-500 text-white rounded"
                      onClick={() => handleDeleteSingle(item.id)}
                    >
                      Delete
                    </button>
                  </Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={8}>No data found</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
        {selectedBooks.length > 0 && (
          <button
            className="px-4 py-2 bg-red-500 text-white rounded mt-4"
            onClick={handleDeleteMultiple}
          >
            Delete Selected
          </button>
        )}
      </section>
    </>
  );
};

export default Book;