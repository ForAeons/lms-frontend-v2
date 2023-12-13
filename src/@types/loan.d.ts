// type Loan struct {
// 	gorm.Model

// 	UserID        uint          `gorm:"not null"`
// 	BookID        uint          `gorm:"not null"`
// 	Status        LoanStatus    `gorm:"not null"`
// 	BorrowDate    time.Time     `gorm:"not null"` // Date when the book is borrowed
// 	DueDate       time.Time     `gorm:"not null"` // Date when the book is due
// 	ReturnDate    sql.NullTime  // Date when the book is returned
// 	LoanHistories []LoanHistory `gorm:"->;<-:create"`
// 	Fines         []Fine        `gorm:"->;<-:create"`
// }

interface Loan {
	id: number;
	userId: number;
	bookId: number;
	status: string;
	borrowDate: string;
	dueDate: string;
	returnDate: string;
}
