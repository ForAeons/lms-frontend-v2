interface Fine {
	id: number;
	user_id: number;
	loan_id: number;
	status: string;
	amount: number;
}

interface FineDetailed extends Fine {
	book: Book;
	user: User;
}
