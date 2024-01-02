import { IntlShape } from "react-intl";

export const resToBadgeProps = (
	r: ReservationDetailed,
	intl: IntlShape,
): BadgeProps[] => {
	// Check if the loan is overdue
	const resDate = new Date(r.reservation_date);
	const currentDate = new Date();
	const isExpired = currentDate > resDate;

	const checkedOut = intl.formatMessage({
		id: "F3EWgg",
		defaultMessage: "Checked out",
	});
	const expired = intl.formatMessage({
		id: "RahCRH",
		defaultMessage: "Expired",
	});
	const reservedUntil = intl.formatMessage(
		{
			id: "ashuNd",
			defaultMessage: "Reserved until {date}",
		},
		{
			date: resDate.toLocaleDateString(),
		},
	);
	const reservedBy = intl.formatMessage(
		{
			id: "st8FyU",
			defaultMessage: "Reserved by {username}",
		},
		{
			username: r.user.username,
		},
	);

	const v =
		r.status === "fulfilled"
			? "secondary"
			: isExpired
			? "destructive"
			: "default";

	const t =
		r.status === "fulfilled" ? checkedOut : isExpired ? expired : reservedUntil;

	return [
		{ variant: v, text: t },
		{ variant: "secondary", text: reservedBy },
	];
};
