import { IntlShape } from "react-intl";

export const fineToBadgeProps = (
	fine: FineDetailed,
	intl: IntlShape,
): BadgeProps[] => {
	const outstandingAmount = intl.formatMessage(
		{
			id: "vyODZ+",
			defaultMessage: "Outstanding | amount - {amount}",
		},
		{ amount: fine.amount },
	);
	const paid = intl.formatMessage({
		id: "u/vOPu",
		defaultMessage: "Paid",
	});
	const finedTo = intl.formatMessage(
		{
			id: "MhKGQF",
			defaultMessage: "Fined to {username}",
		},
		{ username: fine.user.username },
	);

	const v = fine.status === "outstanding" ? "destructive" : "secondary";
	const t = fine.status === "outstanding" ? outstandingAmount : paid;

	return [
		{ variant: v, text: t },
		{ variant: "destructive", text: finedTo },
	];
};
