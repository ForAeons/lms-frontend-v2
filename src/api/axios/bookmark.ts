import { BaseApi } from "./base";
import { BookmarkRoutes } from "../backend-routes";

class BookmarkApi extends BaseApi {
	public DeleteBookmark = (bookmarkID: number, abortSignal?: AbortSignal) => {
		return this.Delete<BookmarkDetailed>(
			`${BookmarkRoutes.BASE}/${bookmarkID}/`,
			abortSignal,
		);
	};

	public ListBookmarks = (cq: CollectionQuery, abortSignal?: AbortSignal) => {
		return this.List<BookmarkDetailed[]>(BookmarkRoutes.BASE, cq, abortSignal);
	};
}

export const bookmarkApi = new BookmarkApi();
