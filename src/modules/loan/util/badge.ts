import { IntlShape } from "react-intl";

export const loanToBadgeProps = (
	loan: LoanDetailed,
	intl: IntlShape,
): BadgeProps[] => {
	const dueDate = new Date(loan.due_date);
	const currentDate = new Date();
	const isOverdue = currentDate > dueDate;

	const returned = intl.formatMessage({
		id: "wm96Jx",
		defaultMessage: "Returned",
	});
	const overdue = intl.formatMessage({
		id: "M0vCGv",
		defaultMessage: "Overdue",
	});
	const due = intl.formatMessage(
		{
			id: "5vDqi+",
			defaultMessage: "Due {date}",
		},
		{
			date: dueDate.toLocaleDateString(),
		},
	);
	const loanedTo = intl.formatMessage(
		{
			id: "GDObmQ",
			defaultMessage: "Loaned to {username}",
		},
		{
			username: loan.user.username,
		},
	);

	const v =
		loan.status === "returned"
			? "secondary"
			: isOverdue
			? "destructive"
			: "default";
	const t = loan.status === "returned" ? returned : isOverdue ? overdue : due;

	return [
		{ variant: v, text: t },
		{ variant: "secondary", text: loanedTo },
	];
};
