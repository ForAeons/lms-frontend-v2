type loanStatus = "borrowed" | "returned";

interface Loan {
	id: number;
	user_id: number;
	book_id: number;
	status: loanStatus;
	borrow_date: string;
	due_date: string;
	return_date: string;
}

interface LoanCreate {
	user_id: number;
	book_id: number;
}

interface LoanHistories {
	id: number;
	loan_id: number;
	action: string;
}

interface LoanDetailed extends Loan {
	book: Book;
	user: UserPerson;
	loan_histories: LoanHistories[];
	fines: Fine[];
}
