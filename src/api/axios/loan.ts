import { BaseApi } from "./base";
import { LoanRoutes, BookcopyRoutes } from "../backend-routes";

class LoanApi extends BaseApi {
	public ListLoan = (q: CollectionQuery, abortSignal?: AbortSignal) => {
		return this.List<LoanDetailed[]>(LoanRoutes.BASE, q, abortSignal);
	};

	public LoanBook = (bookCopyId: number, abortSignal?: AbortSignal) => {
		return this.Post<null, LoanDetailed>(
			`${BookcopyRoutes.BASE}/${bookCopyId}/${LoanRoutes.BASE}/`,
			null,
			abortSignal,
		);
	};

	public CreateLoan = (loan: LoanCreate, abortSignal?: AbortSignal) => {
		return this.Post<LoanCreate, LoanDetailed>(
			`${LoanRoutes.BASE}/`,
			loan,
			abortSignal,
		);
	};

	public CreateLoanByBook = (
		loan: LoanCreateBook,
		abortSignal?: AbortSignal,
	) => {
		return this.Post<LoanCreateBook, LoanDetailed>(
			`${LoanRoutes.BASE}/${LoanRoutes.BOOK.ROUTE}/`,
			loan,
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
