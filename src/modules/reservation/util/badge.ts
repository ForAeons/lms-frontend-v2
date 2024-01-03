import { format } from "date-fns";
import { IntlWrapper } from "@/components/language-provider";

export const resToBadgeProps = (r: ReservationDetailed): BadgeProps[] => {
	// Check if the loan is overdue
	const resDate = new Date(r.reservation_date);
	const currentDate = new Date();
	const isExpired = currentDate > resDate;

	const checkedOut = IntlWrapper.translator["checkedOut"]();
	const expired = IntlWrapper.translator["expired"]();
	const reservedUntil = IntlWrapper.translator["reservedUntil"]({
		date: format(resDate, "P"),
	});
	const reservedBy = IntlWrapper.translator["reservedBy"]({
		username: r.user.username,
	});

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
