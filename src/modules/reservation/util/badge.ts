import { format } from "date-fns";
import { Translator } from "@/util";

export const resToBadgeProps = (
	r: ReservationDetailed,
	t: Translator,
): BadgeProps[] => {
	// Check if the loan is overdue
	const resDate = new Date(r.reservation_date);
	const currentDate = new Date();
	const isExpired = currentDate > resDate;

	const checkedOut = t.checkedOut();
	const expired = t.expired();
	const reservedUntil = t.reservedUntil({
		date: format(resDate, "P"),
	});
	const reservedBy = t.reservedBy({
		username: r.user.username,
	});

	const variant =
		r.status === "fulfilled"
			? "secondary"
			: isExpired
			? "destructive"
			: "default";

	const text =
		r.status === "fulfilled" ? checkedOut : isExpired ? expired : reservedUntil;

	return [
		{ variant, text },
		{ variant: "secondary", text: reservedBy },
	];
};
