import { Translator } from "@/util";

export const bookToBadgeProps = (
	book: BookDetailed,
	t: Translator,
): BadgeProps[] => {
	const isAvailable = book.book_copies.some((bc) => bc.status === "available");
	const totalCount = book.book_copies.length;
	const availableTotal = book.book_copies.filter(
		(bc) => bc.status === "available",
	).length;

	const copyText = t.copy();
	const copiesText = t.copies();

	const copy = book.book_copies.length === 1 ? copyText : copiesText;

	const text = t.XavailableYcopy({
		availableTotal,
		totalCount,
		copy,
	});

	const variant = isAvailable ? "secondary" : "destructive";

	return [{ text, variant }];
};
