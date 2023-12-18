import React from "react";
import { Badge } from "@/components/ui/badge";

export const BookBadge: React.FC<{ book: BookDetailed }> = ({ book }) => {
	if (book.loans.length > 0 && book.loans.at(-1)?.status === "borrowed")
		return (
			<Badge variant="destructive" className="w-fit">
				On loan
			</Badge>
		);

	if (
		book.reservations.length > 0 &&
		book.reservations.at(-1)?.status === "pending"
	)
		return (
			<Badge variant="destructive" className="w-fit">
				Reserved
			</Badge>
		);
	return (
		<Badge variant="secondary" className="w-fit">
			Available
		</Badge>
	);
};

export default BookBadge;
