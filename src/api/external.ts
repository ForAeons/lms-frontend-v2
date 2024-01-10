import { BaseApi } from "./base";
import { ExternalRoutes } from "./backend-routes";

class ExternalApi extends BaseApi {
	public QueryBook = (q: ExternalBookQuery, abortSignal?: AbortSignal) => {
		const paramArr: string[] = [];

		if (q.title) {
			const title = q.title.replace(/ /g, "+");
			paramArr.push(`title=${title}`);
		}

		if (q.author) {
			const author = q.author.replace(/ /g, "+");
			paramArr.push(`author=${author}`);
		}

		if (q.publisher) {
			const publisher = q.publisher.replace(/ /g, "+");
			paramArr.push(`publisher=${publisher}`);
		}

		if (q.isbn) {
			const isbn = q.isbn.replace(/-/g, "");
			paramArr.push(`isbn=${isbn}`);
		}

		const params = paramArr.join("&");

		return this.Get<Book[]>(`${ExternalRoutes.BASE}?${params}`, abortSignal);
	};
}

export const externalApi = new ExternalApi();
