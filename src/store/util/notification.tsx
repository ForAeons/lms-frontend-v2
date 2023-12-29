import { toast } from "sonner";

export const NotifyBookmarks = (bookmarks: WithBookCopies<Bookmark>[]) => {
	const available = bookmarks.filter((bookmark) =>
		bookmark.book.book_copies.some((copy) => copy.status === "available"),
	);

	if (available.length > 0) {
		toast.success("A book you bookmarked is now available!", {
			description: `"${available[0].book.title}" is now available for you to borrow.`,
		});
	}
};

export const NotifyLoans = (loans: Loan[]) => {
	const dueSoon = loans.filter((loan) => {
		const dueDate = new Date(loan.due_date);
		const now = new Date();
		const diff = dueDate.getTime() - now.getTime();
		const days = diff / (1000 * 3600 * 24);

		return days < 3;
	});

	if (dueSoon.length > 0) {
		toast.warning("Loan reminders", {
			description: `You have ${dueSoon.length} loan${
				dueSoon.length ?? "s"
			} due soon!`,
		});
	}
};

export const NotifyReservations = (reservations: WithBook<Reservation>[]) => {
	const dueSoon = reservations.filter((reservation) => {
		const dueDate = new Date(reservation.reservation_date);
		const now = new Date();
		const diff = dueDate.getTime() - now.getTime();
		const days = diff / (1000 * 3600 * 24);

		return days < 3;
	});

	if (dueSoon.length > 0) {
		toast.warning("Reservation reminders", {
			description: `You have ${dueSoon.length} reservation${
				dueSoon.length ?? "s"
			} due soon!`,
		});
	}
};

export const NotifyFines = (fines: Fine[]) => {
	const outstanding = fines.filter((fine) => fine.status === "outstanding");

	if (outstanding.length > 0) {
		toast.error("You have outstanding fines!");
	}
};
