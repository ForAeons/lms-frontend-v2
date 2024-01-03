import { format } from "date-fns";
import { IntlWrapper } from "@/components/language-provider";

export const loanToBadgeProps = (loan: LoanDetailed): BadgeProps[] => {
	const dueDate = new Date(loan.due_date);
	const currentDate = new Date();
	const isOverdue = currentDate > dueDate;

	const returned = IntlWrapper.translator.Returned();
	const overdue = IntlWrapper.translator.Overdue();
	const due = IntlWrapper.translator.dueDate({
		date: format(dueDate, "P"),
	});
	const loanedTo = IntlWrapper.translator.loanedTo({
		username: loan.user.username,
	});

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
