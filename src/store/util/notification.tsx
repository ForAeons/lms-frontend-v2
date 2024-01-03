import { toast } from "sonner";
import { IntlWrapper } from "@/components/language-provider";

export const NotifyBookmarks = (bookmarks: WithBookCopies<Bookmark>[]) => {
	const available = bookmarks.filter((bookmark) =>
		bookmark.book.book_copies.some((copy) => copy.status === "available"),
	);

	if (available.length > 0) {
		toast.success(IntlWrapper.translator.bookmarkAvailable(), {
			description: IntlWrapper.translator.bookmarkAvailBorrow({
				title: available[0].book.title,
			}),
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
		toast.warning(IntlWrapper.translator.loanReminders(), {
			description: IntlWrapper.translator.youHaveLoanDueSoon(),
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
		toast.warning(IntlWrapper.translator.resReminders(), {
			description: IntlWrapper.translator.youHaveResDueSoon(),
		});
	}
};

export const NotifyFines = (fines: Fine[]) => {
	const outstanding = fines.filter((fine) => fine.status === "outstanding");

	if (outstanding.length > 0) {
		toast.error(IntlWrapper.translator.youHaveOutstandingFines());
	}
};
