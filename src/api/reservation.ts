import { BaseApi } from "./base";
import { BookRoutes, ReservationRoutes } from "./backend-routes";

class ReservationApi extends BaseApi {
	public ListRes = (q: CollectionQuery, abortSignal?: AbortSignal) => {
		return this.List<ReservationDetailed[]>(
			ReservationRoutes.BASE,
			q,
			abortSignal,
		);
	};

	public CreateRes = (res: ReservationCreate, abortSignal?: AbortSignal) => {
		return this.Post<ReservationCreate, ReservationDetailed>(
			`${ReservationRoutes.BASE}/`,
			res,
			abortSignal,
		);
	};

	public ReserveBook = (bookId: number, abortSignal?: AbortSignal) => {
		return this.Post<null, ReservationDetailed>(
			`${BookRoutes.BASE}/${bookId}/${ReservationRoutes.BASE}/`,
			null,
			abortSignal,
		);
	};

	public GetRes = (reservationID: number, abortSignal?: AbortSignal) => {
		return this.Get<ReservationDetailed>(
			`${ReservationRoutes.BASE}/${reservationID}/`,
			abortSignal,
		);
	};

	public DeleteRes = (reservationID: number, abortSignal?: AbortSignal) => {
		return this.Delete<ReservationDetailed>(
			`${ReservationRoutes.BASE}/${reservationID}/`,
			abortSignal,
		);
	};

	public CancelRes = (reservationID: number, abortSignal?: AbortSignal) => {
		return this.Patch<null, ReservationDetailed>(
			`${ReservationRoutes.BASE}/${reservationID}/${ReservationRoutes.CANCEL.ROUTE}`,
			null,
			abortSignal,
		);
	};

	public CheckoutRes = (reservationID: number, abortSignal?: AbortSignal) => {
		return this.Patch<null, ReservationDetailed>(
			`${ReservationRoutes.BASE}/${reservationID}/${ReservationRoutes.CHECKOUT.ROUTE}`,
			null,
			abortSignal,
		);
	};
}

export const reservationApi = new ReservationApi();
