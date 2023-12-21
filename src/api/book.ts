import { BaseApi } from "./base";
import { BookRoutes } from "./backend-routes";

class BookApi extends BaseApi {
	public AutoComplete = (value: string, abortSignal?: AbortSignal) => {
		return this.Get<BookSimple[]>(
			`${BookRoutes.BASE}/${BookRoutes.AUTOCOMPLETE.DYNAMIC_ROUTE(value)}`,
			abortSignal,
		);
	};

	public CreateBook = (book: BookCreate, abortSignal?: AbortSignal) => {
		return this.Post<BookCreate, Book>(
			`${BookRoutes.BASE}/`,
			book,
			abortSignal,
		);
	};

	public GetBook = (bookID: number, abortSignal?: AbortSignal) => {
		return this.Get<BookDetailed>(
			`${BookRoutes.BASE}/${BookRoutes.SPECIFIC.DYNAMIC_ROUTE(bookID)}`,
			abortSignal,
		);
	};

	public UpdateBook = (book: Book, abortSignal?: AbortSignal) => {
		return this.Patch<Book>(
			`${BookRoutes.BASE}/${BookRoutes.SPECIFIC.DYNAMIC_ROUTE(book.id)}`,
			book,
			abortSignal,
		);
	};

	public DeleteBook = (bookID: number, abortSignal?: AbortSignal) => {
		return this.Delete<Book>(
			`${BookRoutes.BASE}/${BookRoutes.SPECIFIC.DYNAMIC_ROUTE(bookID)}`,
			abortSignal,
		);
	};

	public ListBook = (q: CollectionQuery, abortSignal?: AbortSignal) => {
		return this.Get<Book[]>(
			`${BookRoutes.BASE}?${BookRoutes.LIST.DYNAMIC_ROUTE(q)}`,
			abortSignal,
		);
	};
}

export const bookApi = new BookApi();
