import { format } from "date-fns";
import { Translator } from "@/util";

export const loanToBadgeProps = (
	loan: LoanDetailed,
	t: Translator,
): BadgeProps[] => {
	const dueDate = new Date(loan.due_date);
	const currentDate = new Date();
	const isOverdue = currentDate > dueDate;

	const returnedText = t.Returned();
	const overdueText = t.Overdue();
	const dueText = t.dueDate({
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

	const loanedTo = t.loanedTo({
		username: loan.user.username,
	});

	return [
		{ variant, text },
		{ variant: "secondary", text: loanedTo },
	];
};
