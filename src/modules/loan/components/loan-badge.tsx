import React from "react";
import { useIntl } from "react-intl";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export const LoanBadge: React.FC<{ loan: Loan }> = ({ loan }) => {
	const intl = useIntl();
	const returned = intl.formatMessage({
		id: "wm96Jx",
		defaultMessage: "Returned",
	});

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

	const due = intl.formatMessage(
		{
			id: "5vDqi+",
			defaultMessage: "Due {date}",
		},
		{ date: format(dueDate, "P") },
	);

	if (!isOverdue)
		return (
			<Badge variant="default" className="w-fit">
				{due}
			</Badge>
		);

	const overdue = intl.formatMessage({
		id: "M0vCGv",
		defaultMessage: "Overdue",
	});

	return (
		<Badge variant="destructive" className="w-fit">
			{overdue}
		</Badge>
	);
};
