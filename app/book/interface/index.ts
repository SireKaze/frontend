import {
  BaseResponsePagination,
} from "@/lib/axiosClient";
 
interface Book {
  id: number;
  title: string;
  author: string;
  year: number | undefined | string;
  create_at: string;
  update_at: string;
}
 
export interface BookListResponse extends BaseResponsePagination {
  data: Book[];
}
 
export interface BookListFilter extends Partial<Book> {
  from_year?: string;
  to_year?: string;
  page : number ,
  pageSize : number 
}
 
 
export interface BookCreatePayload extends Pick<Book, "author" | "title" | "year"> {}