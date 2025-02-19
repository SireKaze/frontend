import { BaseResponsePagination } from "@/lib/axiosClient";

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number | undefined | string;
  create_at: string;
  update_at: string;
}

export interface BookListResponse extends BaseResponsePagination {
  data: Book[];
}

export interface BookListFilter {
  author?: string;
  from_year?: string;
  to_year?: string;
  page: number;
  pageSize: number;
}

export interface BookCreatePayload extends Pick<Book, "author" | "title" | "year"> {
  deskripsi: string;
}
