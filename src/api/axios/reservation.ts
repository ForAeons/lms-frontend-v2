import { BaseApi } from "./base";
import { BookcopyRoutes, ResRoutes } from "../backend-routes";

class ReservationApi extends BaseApi {
	public ListRes = (q: CollectionQuery, abortSignal?: AbortSignal) => {
		return this.List<ReservationDetailed[]>(ResRoutes.BASE, q, abortSignal);
	};

	public CreateRes = (res: ReservationCreate, abortSignal?: AbortSignal) => {
		return this.Post<ReservationCreate, ReservationDetailed>(
			`${ResRoutes.BASE}/`,
			res,
			abortSignal,
		);
	};

	public CreateResByBook = (
		res: ReservationCreateBook,
		abortSignal?: AbortSignal,
	) => {
		return this.Post<ReservationCreateBook, ReservationDetailed>(
			`${ResRoutes.BASE}/${ResRoutes.BOOK.ROUTE}/`,
			res,
			abortSignal,
		);
	};

	public ReserveBook = (bookCopyId: number, abortSignal?: AbortSignal) => {
		return this.Post<null, ReservationDetailed>(
			`${BookcopyRoutes.BASE}/${bookCopyId}/${ResRoutes.BASE}/`,
			null,
			abortSignal,
		);
	};

	public GetRes = (reservationID: number, abortSignal?: AbortSignal) => {
		return this.Get<ReservationDetailed>(
			`${ResRoutes.BASE}/${reservationID}/`,
			abortSignal,
		);
	};

	public DeleteRes = (reservationID: number, abortSignal?: AbortSignal) => {
		return this.Delete<ReservationDetailed>(
			`${ResRoutes.BASE}/${reservationID}/`,
			abortSignal,
		);
	};

	public CancelRes = (reservationID: number, abortSignal?: AbortSignal) => {
		return this.Patch<null, ReservationDetailed>(
			`${ResRoutes.BASE}/${reservationID}/${ResRoutes.CANCEL.ROUTE}`,
			null,
			abortSignal,
		);
	};
}

export const reservationApi = new ReservationApi();
