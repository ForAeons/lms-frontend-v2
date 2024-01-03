import { IntlWrapper } from "@/components/language-provider";

export const fineToBadgeProps = (fine: FineDetailed): BadgeProps[] => {
	const outstandingAmount = IntlWrapper.translator.outstandingAmount({
		amount: String(fine.amount),
	});
	const paid = IntlWrapper.translator.Paid();
	const finedTo = IntlWrapper.translator.finedTo({
		username: fine.user.username,
	});

	const v = fine.status === "outstanding" ? "destructive" : "secondary";
	const t = fine.status === "outstanding" ? outstandingAmount : paid;

	return [
		{ variant: v, text: t },
		{ variant: "destructive", text: finedTo },
	];
};
