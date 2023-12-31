export const bookToBadgeProps = (book: BookDetailed): BadgeProps[] => {
	const isAvailable = book.book_copies.some((bc) => bc.status === "available");
	const total = book.book_copies.length;
	const availableTotal = book.book_copies.filter(
		(bc) => bc.status === "available",
	).length;
	const copy = book.book_copies.length === 1 ? "copy" : "copies";
	const badgeText = `${availableTotal} available - ${total} ${copy}`;
	const badgeVariant = isAvailable ? "secondary" : "destructive";

	return [
		{
			text: badgeText,
			variant: badgeVariant,
		},
	];
};
