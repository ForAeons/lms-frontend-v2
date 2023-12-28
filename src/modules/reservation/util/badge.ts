export const resToBadgeProps = (r: ReservationDetailed): BadgeProps[] => {
	// Check if the loan is overdue
	const resDate = new Date(r.reservation_date);
	const currentDate = new Date();
	const isExpired = currentDate > resDate;

	const v =
		r.status === "fulfilled"
			? "secondary"
			: isExpired
			? "destructive"
			: "default";

	const t =
		r.status === "fulfilled"
			? "Checked out"
			: isExpired
			? "Expired"
			: `Reserved until ${new Date(r.reservation_date).toLocaleDateString()}`;

	return [
		{
			variant: v,
			text: t,
		},
		{ variant: "secondary", text: `Reserved by ${r.user.username}` },
	];
};
