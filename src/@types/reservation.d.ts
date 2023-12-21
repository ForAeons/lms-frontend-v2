type reservationStatus = "pending" | "fulfilled";

interface Reservation {
	id: number;
	user_id: number;
	book_id: number;
	status: reservationStatus;
	reservation_date: string;
}

interface ReservationDetailed extends Reservation {
	book: Book;
	user: User;
}

interface ReservationCreate {
	user_id: number;
	book_id: number;
}
