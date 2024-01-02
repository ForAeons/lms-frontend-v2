import { IntlShape } from "react-intl";

export const bookToBadgeProps = (
	book: BookDetailed,
	intl: IntlShape,
): BadgeProps[] => {
	const isAvailable = book.book_copies.some((bc) => bc.status === "available");
	const totalCount = book.book_copies.length;
	const availableTotal = book.book_copies.filter(
		(bc) => bc.status === "available",
	).length;

	const copyText = intl.formatMessage({
		id: "j7M9od",
		defaultMessage: "copy",
	});
	const copiesText = intl.formatMessage({
		id: "K0FUQq",
		defaultMessage: "copies",
	});

	const copy = book.book_copies.length === 1 ? copyText : copiesText;

	const text = intl.formatMessage(
		{
			id: "Rb/Qfr",
			defaultMessage: "{availableTotal} available - {totalCount} {copy}",
		},
		{ availableTotal, totalCount, copy },
	);

	const variant = isAvailable ? "secondary" : "destructive";

	return [{ text, variant }];
};
