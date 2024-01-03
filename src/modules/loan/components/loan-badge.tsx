import React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "@/components/language-provider";

export const LoanBadge: React.FC<{ loan: Loan }> = ({ loan }) => {
	const translate = useTranslations();
	const returned = translate.Returned();

	if (loan.status === "returned")
		return (
			<Badge variant="secondary" className="w-fit">
				{returned}
			</Badge>
		);

	// Check if the loan is overdue
	const dueDate = new Date(loan.due_date);
	const currentDate = new Date();
	const isOverdue = currentDate > dueDate;

	const due = translate.dueDate({
		date: format(dueDate, "P"),
	});

	if (!isOverdue)
		return (
			<Badge variant="default" className="w-fit">
				{due}
			</Badge>
		);

	const overdue = translate.Overdue();

	return (
		<Badge variant="destructive" className="w-fit">
			{overdue}
		</Badge>
	);
};
