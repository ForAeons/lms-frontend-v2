import { Badge } from "@/components/ui/badge";
import React from "react";

export const ResBadge: React.FC<{ res: Reservation }> = ({ res }) => {
	if (res.status === "fulfilled")
		return (
			<Badge variant="secondary" className="w-fit">
				Checked out
			</Badge>
		);

	// Check if the loan is overdue
	const resDate = new Date(res.reservation_date);
	const currentDate = new Date();
	const isExpired = currentDate > resDate;
	if (!isExpired)
		return (
			<Badge variant="default" className="w-fit">
				{`Reserved until ${new Date(
					res.reservation_date,
				).toLocaleDateString()}`}
			</Badge>
		);

	return (
		<Badge variant="destructive" className="w-fit">
			Expired
		</Badge>
	);
};
