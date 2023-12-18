interface Loan {
	id: number;
	user_id: number;
	book_id: number;
	status: string;
	borrow_date: string;
	due_date: string;
	return_date: string;
}

interface LoanHistories {
	id: number;
	loan_id: number;
	action: string;
}

interface LoanDetailed extends Loan {
	loan_histories: LoanHistories[];
	fines: Fine[];
}
