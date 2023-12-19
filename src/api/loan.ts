import { BaseApi } from "./base";
import { LoanRoutes, BookRoutes } from "./backend-routes";

class LoanApi extends BaseApi {
	public ListLoan = (q: CollectionQuery, abortSignal?: AbortSignal) => {
		return this.Get<Loan[]>(
			`${LoanRoutes.BASE}?${LoanRoutes.LIST.DYNAMIC_ROUTE(q)}`,
			abortSignal,
		);
	};

	public LoanBook = (bookId: number, abortSignal?: AbortSignal) => {
		return this.Post<null, LoanDetailed>(
			`${BookRoutes.BASE}/${bookId}/${LoanRoutes.BASE}/`,
			null,
			abortSignal,
		);
	};

	public GetLoan = (loanID: number, abortSignal?: AbortSignal) => {
		return this.Get<LoanDetailed>(`${LoanRoutes.BASE}/${loanID}/`, abortSignal);
	};

	public DeleteLoan = (loanID: number, abortSignal?: AbortSignal) => {
		return this.Delete<LoanDetailed>(
			`${LoanRoutes.BASE}/${loanID}/`,
			abortSignal,
		);
	};

	public ReturnLoan = (loanID: number, abortSignal?: AbortSignal) => {
		return this.Patch<null, LoanDetailed>(
			`${LoanRoutes.BASE}/${loanID}/${LoanRoutes.RETURN.ROUTE}`,
			null,
			abortSignal,
		);
	};

	public RenewLoan = (loanID: number, abortSignal?: AbortSignal) => {
		return this.Patch<null, LoanDetailed>(
			`${LoanRoutes.BASE}/${loanID}/${LoanRoutes.RENEW.ROUTE}`,
			null,
			abortSignal,
		);
	};
}

export const loanApi = new LoanApi();
