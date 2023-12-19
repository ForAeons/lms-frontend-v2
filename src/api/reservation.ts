import { BaseApi } from "./base";
import { BookRoutes, ReservationRoutes } from "./backend-routes";

class ReservationApi extends BaseApi {
	public ListReservation = (q: CollectionQuery, abortSignal?: AbortSignal) => {
		return this.Get<Reservation[]>(
			`${ReservationRoutes.BASE}?${ReservationRoutes.LIST.DYNAMIC_ROUTE(q)}`,
			abortSignal,
		);
	};

	public ReserveBook = (bookId: number, abortSignal?: AbortSignal) => {
		return this.Post<null, Reservation>(
			`${BookRoutes.BASE}/${bookId}/${ReservationRoutes.BASE}/`,
			null,
			abortSignal,
		);
	};

	public GetReservation = (
		reservationID: number,
		abortSignal?: AbortSignal,
	) => {
		return this.Get<Reservation>(
			`${ReservationRoutes.BASE}/${reservationID}/`,
			abortSignal,
		);
	};

	public DeleteReservation = (
		reservationID: number,
		abortSignal?: AbortSignal,
	) => {
		return this.Delete<Reservation>(
			`${ReservationRoutes.BASE}/${reservationID}/`,
			abortSignal,
		);
	};

	public CancelReservation = (
		reservationID: number,
		abortSignal?: AbortSignal,
	) => {
		return this.Patch<null, Reservation>(
			`${ReservationRoutes.BASE}/${reservationID}/${ReservationRoutes.CANCEL.ROUTE}`,
			null,
			abortSignal,
		);
	};

	public CheckoutReservation = (
		reservationID: number,
		abortSignal?: AbortSignal,
	) => {
		return this.Patch<null, Reservation>(
			`${ReservationRoutes.BASE}/${reservationID}/${ReservationRoutes.CHECKOUT.ROUTE}`,
			null,
			abortSignal,
		);
	};
}

export const reservationApi = new ReservationApi();
