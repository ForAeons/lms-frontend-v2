type reservationStatus = "pending" | "fulfilled";

interface Reservation {
	id: number;
	user_id: number;
	book_id: number;
	status: reservationStatus;
	reservation_date: string;
}
