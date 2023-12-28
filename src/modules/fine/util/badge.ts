export const fineToBadgeProps = (fine: FineDetailed): BadgeProps[] => {
	const v = fine.status === "outstanding" ? "destructive" : "secondary";
	const t =
		fine.status === "outstanding"
			? `Outstanding | amount - ${fine.amount}`
			: "Paid";

	return [
		{ variant: "destructive", text: `Fined to ${fine.user.username}` },
		{
			variant: v,
			text: t,
		},
	];
};
