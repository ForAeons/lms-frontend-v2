import React from "react";
import { Badge } from "@/components/ui/badge";

export const BookBadge: React.FC<{ copies: BookCopy[] }> = ({ copies }) => {
	const isAvailable = copies.some((bc) => bc.status === "available");
	const total = copies.length;
	const onHoldTotal = copies.filter((bc) => bc.status !== "available").length;

	const copy = copies.length === 1 ? "copy" : "copies";

	if (isAvailable)
		return (
			<Badge variant="secondary" className="w-fit">
				{`${onHoldTotal} on hold | ${total} ${copy}`}
			</Badge>
		);

	return (
		<Badge variant="destructive" className="w-fit">
			{`${onHoldTotal} on hold | ${total} ${copy}`}
		</Badge>
	);
};

export default BookBadge;
