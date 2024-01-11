import { BaseApi } from "./base";
import { BookRoutes, BookcopyRoutes } from "../backend-routes";

type DeleteBookcopyArgs = Abortable<{
	bookcopyID: number;
}>;

type CreateBookcopyArgs = Abortable<{
	bookID: number;
	count?: number;
}>;

class BookcopyApi extends BaseApi {
	public DeleteBookcopy = (arg: DeleteBookcopyArgs) => {
		return this.Delete<BookCopy>(
			`${BookcopyRoutes.BASE}/${arg.bookcopyID}/`,
			arg.abortSignal,
		);
	};

	public CreateBookcopy = (arg: CreateBookcopyArgs) => {
		console.log(arg);
		return this.Post<null, BookCopy[]>(
			`${BookRoutes.BASE}/${arg.bookID}/${BookcopyRoutes.BASE}?count=${
				arg.count ?? 1
			}`,
			null,
			arg.abortSignal,
		);
	};
}

export const bookcopyApi = new BookcopyApi();
