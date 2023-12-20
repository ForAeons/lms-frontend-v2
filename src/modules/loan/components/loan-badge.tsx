import { Badge } from "@/components/ui/badge";
import React from "react";

export const LoanBadge: React.FC<{ loan: Loan }> = ({ loan }) => {
	if (loan.status === "returned")
		return (
			<Badge variant="secondary" className="w-fit">
				Returned
			</Badge>
		);

	// Check if the loan is overdue
	const dueDate = new Date(loan.due_date);
	const currentDate = new Date();
	const isOverdue = currentDate > dueDate;
	if (!isOverdue)
		return (
			<Badge variant="default" className="w-fit">
				{`Due ${new Date(loan.due_date).toLocaleDateString()}`}
			</Badge>
		);

	return (
		<Badge variant="destructive" className="w-fit">
			Overdue
		</Badge>
	);
};
