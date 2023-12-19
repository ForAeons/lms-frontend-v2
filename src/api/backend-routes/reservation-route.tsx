import { cqToUrl } from "@/util";

export const ReservationRoutes = {
	BASE: "reservation",
	LIST: {
		DYNAMIC_ROUTE: (q: CollectionQuery) => cqToUrl(q),
	},
	SPECIFIC: {
		DYNAMIC_ROUTE: (reservationID: number) => String(reservationID),
	},
	CANCEL: {
		ROUTE: "cancel",
	},
	CHECKOUT: {
		ROUTE: "checkout",
	},
};
