import { Translator } from "@/util";

export const fineToBadgeProps = (
	fine: FineDetailed,
	t: Translator,
): BadgeProps[] => {
	const outstandingAmount = t.outstandingAmount({
		amount: String(fine.amount),
	});
	const paid = t.Paid();
	const finedTo = t.finedTo({
		username: fine.user.username,
	});

	const variant = fine.status === "outstanding" ? "destructive" : "secondary";
	const text = fine.status === "outstanding" ? outstandingAmount : paid;

	return [
		{ variant, text },
		{ variant: "destructive", text: finedTo },
	];
};
