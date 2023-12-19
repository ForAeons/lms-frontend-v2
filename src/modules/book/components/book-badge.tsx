import React from "react";
import { Badge } from "@/components/ui/badge";

export const BookBadge: React.FC<{ status: bookStatus }> = ({ status }) => {
	if (status === "borrowed")
		return (
			<Badge variant="destructive" className="w-fit">
				On loan
			</Badge>
		);

	if (status === "reserved")
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
