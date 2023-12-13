// type Reservation struct {
// 	gorm.Model

// 	UserID          uint              `gorm:"not null"`
// 	BookID          uint              `gorm:"not null"`
// 	Status          ReservationStatus `gorm:"not null"`
// 	ReservationDate time.Time         `gorm:"not null"` // Date before which the book is reserved
// }

interface Reservation {
	id: number;
	userId: number;
	bookId: number;
	status: string;
	reservationDate: string;
}
