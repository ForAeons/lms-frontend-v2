import { BaseApi } from "./base";
import { BookRoutes, BookcopyRoutes, LoanRoutes } from "../backend-routes";

type DeleteBookcopyArgs = Abortable<{
	bookcopyID: number;
}>;

type CreateBookcopyArgs = Abortable<{
	bookID: number;
	count?: number;
}>;

type ReturnBookcopyArgs = Abortable<{
	bookcopyID: number;
}>;

class BookcopyApi extends BaseApi {
	public DeleteBookcopy = (payload: DeleteBookcopyArgs) => {
		return this.Delete<BookCopy>(
			`${BookcopyRoutes.BASE}/${payload.bookcopyID}/`,
			payload.abortSignal,
		);
	};

	public CreateBookcopy = (payload: CreateBookcopyArgs) => {
		return this.Post<null, BookCopy[]>(
			`${BookRoutes.BASE}/${payload.bookID}/${BookcopyRoutes.BASE}?count=${
				payload.count ?? 1
			}`,
			null,
			payload.abortSignal,
		);
	};

	public ReturnBookcopy = (payload: ReturnBookcopyArgs) => {
		return this.Patch<null, LoanDetailed>(
			`${BookcopyRoutes.BASE}/${payload.bookcopyID}/${LoanRoutes.BASE}/${LoanRoutes.RETURN.ROUTE}/`,
			null,
			payload.abortSignal,
		);
	};
}

export const bookcopyApi = new BookcopyApi();
