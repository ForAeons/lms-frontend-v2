type Url = string;

// type Book struct {
// 	gorm.Model

// 	Title           string        `gorm:"not null"`
// 	Author          string        `gorm:"not null"`
// 	ISBN            string        `gorm:"not null"`
// 	Publisher       string        `gorm:"not null"`
// 	PublicationDate time.Time     `gorm:"not null"`
// 	Genre           string        `gorm:"not null"`
// 	Language        string        `gorm:"not null"`
// 	Loans           []Loan        `gorm:"->"`
// 	Reservations    []Reservation `gorm:"->"`
// }

interface Book {
	id: number;
	title: string;
	author: string;
	isbn: string;
	publisher: string;
	publicationDate: string;
	genre: string;
	language: string;
}

// type Fine struct {
// 	gorm.Model

// 	UserID uint       `gorm:"not null"`
// 	LoanID uint       `gorm:"not null"`
// 	Status FineStatus `gorm:"not null"`
// 	Amount float64    `gorm:"not null"`
// }

interface Fine {
	id: number;
	userId: number;
	loanId: number;
	status: string;
	amount: number;
}

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

// type Person struct {
// 	gorm.Model

// 	FullName           string `gorm:"not null"`
// 	PreferredName      string
// 	LanguagePreference string `gorm:"not null"`
// }

interface Person {
	id: number;
	fullName: string;
	preferredName: string;
	languagePreference: string;
}

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

// type User struct {
// 	gorm.Model

// 	Username          string `gorm:"unique;not null"`
// 	Email             string `gorm:"unique"`
// 	EncryptedPassword string `gorm:"not null"`
// 	SignInCount       int    `gorm:"not null;default:0"`
// 	CurrentSignInAt   time.Time
// 	LastSignInAt      time.Time
// 	PersonID          uint    `gorm:"not null"`
// 	Person            *Person `gorm:"->;<-:create"`
// 	Roles             []Role  `gorm:"many2many:user_roles;->"`
// 	Loans             []Loan  `gorm:"->"`
// }

interface User {
	id: number;
	username: string;
	email: string;
	personId: number;
	person: Person;
}
