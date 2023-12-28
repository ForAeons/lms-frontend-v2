export const loanToBadgeProps = (loan: LoanDetailed): BadgeProps[] => {
	const dueDate = new Date(loan.due_date);
	const currentDate = new Date();
	const isOverdue = currentDate > dueDate;
	const v =
		loan.status === "returned"
			? "secondary"
			: isOverdue
			? "destructive"
			: "default";
	const t =
		loan.status === "returned"
			? "Returned"
			: isOverdue
			? "Overdue"
			: `Due ${new Date(loan.due_date).toLocaleDateString()}`;

	return [
		{
			variant: "secondary",
			text: `Loaned to ${loan.user.username}`,
		},
		{
			variant: v,
			text: t,
		},
	];
};
