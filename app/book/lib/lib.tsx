import { useMutation, useQuery } from "@tanstack/react-query";
import { BookListFilter, BookListResponse, BookCreatePayload } from "../interface/interface";
import { axiosClient } from "@/lib/axiosClient";

const useBookModule = () => {
  const defaultParams: BookListFilter = {
    author: "",
    from_year: "",
    to_year: "",
    page: 1,
    pageSize: 10,
  };

  // Fungsi untuk membuat buku
  const createBook = (payload: BookCreatePayload) => {
    return axiosClient.post("/book/create", payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const useCreateBook = () => {
    const mutation = useMutation({
      mutationFn: (payload: BookCreatePayload) => createBook(payload),
      onSuccess: (res) => {
        console.log("Response", res);
      },
      onError: (err) => {
        console.log("Error creating book", err);
      },
    });
    return mutation;
  };

  // Fungsi untuk mendapatkan detail buku
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getDetailBook = async (id: string): Promise<any> => {
    const response = await axiosClient.get(`/book/detail/${id}`);
    console.log("Fetched Book Detail:", response.data); // Log the fetched book detail
    return response.data;
  };

  const useDetailBook = (id: string) => {
    return useQuery({
      queryKey: ["/book/detail", { id }],
      queryFn: () => getDetailBook(id),
    });
  };

  /**
   * Fungsi untuk mengambil daftar buku dari API
   * @param params Filter parameter untuk query
   * @returns Data yang diambil dari API
   */
  const getBookList = async (params: BookListFilter): Promise<BookListResponse> => {
    const response = await axiosClient.get("/book/list", { params });
    console.log("Fetched Book List:", response.data);
    return response.data;
  };

  /**
   * Custom hook untuk daftar buku
   * @param filterParams Filter parameter
   * @returns Data, status fetching, dan fungsi refetch
   */
  const useBookList = (filterParams = defaultParams) => {
    return useQuery<BookListResponse>({
      queryKey: ["/book/list", filterParams],
      queryFn: () => getBookList(filterParams),
    });
  };

  /**
   * Fungsi untuk menghapus buku berdasarkan ID
   * @param id ID buku yang ingin dihapus
   */
  const deleteBookById = async (id: string): Promise<void> => {
    await axiosClient.delete(`/book/delete/${id}`);
  };

  /**
   * Fungsi untuk menghapus beberapa buku berdasarkan array ID
   * @param ids Array ID buku yang ingin dihapus
   */
  const deleteMultipleBooks = async (ids: string[]): Promise<void> => {
    try {
      const idString = ids.join(",");
      await axiosClient.delete(`/book/delete?id=${idString}`);
    } catch (error) {
      console.error("Error deleting books:", error);
      throw error;
    }
  };

  const updateBook = async (id: number, payload: BookCreatePayload): Promise<void> => {
    await axiosClient.put(`/book/update/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const useUpdateBook = () => {
    const mutation = useMutation({
      mutationFn: ({ id, payload }: { id: number; payload: BookCreatePayload }) => updateBook(id, payload),
      onSuccess: (res) => {
        console.log("Book updated successfully", res);
      },
      onError: (err) => {
        console.log("Error updating book", err);
      },
    });
    return mutation;
  };

  return { 
    useBookList, 
    deleteBookById, 
    deleteMultipleBooks, 
    useCreateBook, 
    useUpdateBook, 
    useDetailBook  // Ditambahkan agar dapat digunakan di UpdateBook
  };
};

export default useBookModule;