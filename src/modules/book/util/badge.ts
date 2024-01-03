import { IntlWrapper } from "@/components/language-provider";

export const bookToBadgeProps = (book: BookDetailed): BadgeProps[] => {
	const isAvailable = book.book_copies.some((bc) => bc.status === "available");
	const totalCount = book.book_copies.length;
	const availableTotal = book.book_copies.filter(
		(bc) => bc.status === "available",
	).length;

	const copyText = IntlWrapper.translator["copy"]();
	const copiesText = IntlWrapper.translator["copies"]();

	const copy = book.book_copies.length === 1 ? copyText : copiesText;

	const text = IntlWrapper.translator["XavailableYcopy"]({
		availableTotal,
		totalCount,
		copy,
	});

	const variant = isAvailable ? "secondary" : "destructive";

	return [{ text, variant }];
};
