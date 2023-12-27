type BookCopyStatus = "available" | "loaned" | "reserved";

interface BookCopy {
	id: number;
	book_id: number;
	status: BookCopyStatus;
}
