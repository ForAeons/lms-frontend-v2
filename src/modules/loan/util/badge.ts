import { format } from "date-fns";
import { IntlWrapper } from "@/components/language-provider";

export const loanToBadgeProps = (loan: LoanDetailed): BadgeProps[] => {
	const dueDate = new Date(loan.due_date);
	const currentDate = new Date();
	const isOverdue = currentDate > dueDate;

	const returnedText = IntlWrapper.translator.Returned();
	const overdueText = IntlWrapper.translator.Overdue();
	const dueText = IntlWrapper.translator.dueDate({
		date: format(dueDate, "P"),
	});

	let variant: BadgeVariant;
	let text: string;

	if (loan.status === "returned") {
		variant = "secondary";
		text = returnedText;
	} else if (isOverdue) {
		variant = "destructive";
		text = overdueText;
	} else {
		variant = "default";
		text = dueText;
	}

	const loanedTo = IntlWrapper.translator.loanedTo({
		username: loan.user.username,
	});

	return [
		{ variant, text },
		{ variant: "secondary", text: loanedTo },
	];
};
