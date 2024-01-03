import { IntlShape } from "react-intl";

/**
 * A function that returns a list of translations
 *
 * Steps to add a new translation:
 * 1. Add a new any arbitary key to the `translations` object below
 * 2. Add intl.formatMessage as that value of that new key
 * 3. Past an object with `defaultMessage` set to the default message desired WITHOUT `id`
 * 4. Ran npm run extract && npm run compile
 * 5. Search for the id of the that message in `en.json` file
 * 6. Copy the value of that id and paste it as the `id` in the object
 *
 * @param intl The intl object from react-intl
 * @returns A list of translations
 */
export const translations = (intl: IntlShape) => {
	return {
		youHaveResDueSoon: () =>
			intl.formatMessage({
				id: "+5zVex",
				defaultMessage: "You have reservation due soon.",
			}),
		youHaveLoanDueSoon: () =>
			intl.formatMessage({
				id: "VxQOZF",
				defaultMessage: "You have loan due soon.",
			}),
		bookmarkAvailBorrow: ({ title }: { title: string }) =>
			intl.formatMessage(
				{
					id: "1c6v8F",
					defaultMessage: '"{title}" is now available for you to borrow.',
				},
				{ title },
			),

		bookmarkAvailable: () =>
			intl.formatMessage({
				id: "RteBRh",
				defaultMessage: "A book you bookmarked is now available!",
			}),
		resReminders: () =>
			intl.formatMessage({
				id: "fciVZO",
				defaultMessage: "Reservation reminders",
			}),
		loanReminders: () =>
			intl.formatMessage({
				id: "bf08of",
				defaultMessage: "Loan reminders",
			}),
		youHaveOutstandingFines: () =>
			intl.formatMessage({
				id: "c/gWn5",
				defaultMessage: "You have outstanding fines!",
			}),
		noResults: () =>
			intl.formatMessage({
				id: "0H2hdf",
				defaultMessage: "No results.",
			}),
		Signup: () =>
			intl.formatMessage({
				id: "8HJxXG",
				defaultMessage: "Sign up",
			}),
		signInHere: () =>
			intl.formatMessage({
				id: "qkIZjG",
				defaultMessage: "Sign in here",
			}),
		roleSelection: () =>
			intl.formatMessage({
				id: "XM5uwK",
				defaultMessage: "Role selection",
			}),
		selectRolePlaceholder: () =>
			intl.formatMessage({
				id: "iaCoRs",
				defaultMessage: "Select role",
			}),
		Update: () =>
			intl.formatMessage({
				id: "BWpuKl",
				defaultMessage: "Update",
			}),
		updateUserRoleDesc: () =>
			intl.formatMessage({
				id: "M+yZJ8",
				defaultMessage: "Change the role of this user",
			}),
		updateUserRole: () =>
			intl.formatMessage({
				id: "izivwa",
				defaultMessage: "Update user role",
			}),
		changeRole: () =>
			intl.formatMessage({
				id: "9EZXpi",
				defaultMessage: "Change role",
			}),
		anUniqueName: () =>
			intl.formatMessage({
				id: "iGWDDx",
				defaultMessage: "An unique username",
			}),
		yourFullName: () =>
			intl.formatMessage({
				id: "m4c/De",
				defaultMessage: "Your full name",
			}),
		yourPreferredName: () =>
			intl.formatMessage({
				id: "MuE1Lz",
				defaultMessage: "Your preferred name",
			}),
		aStrongPassword: () =>
			intl.formatMessage({
				id: "SZBHgk",
				defaultMessage: "A strong password",
			}),
		confirmPassword: () =>
			intl.formatMessage({
				id: "vfG+nh",
				defaultMessage: "Confirm Password",
			}),
		enterYourPasswordAgain: () =>
			intl.formatMessage({
				id: "B0mhwF",
				defaultMessage: "Enter your password again",
			}),
		Save: () => intl.formatMessage({ id: "jvo0vs", defaultMessage: "Save" }),
		editUserProfile: () =>
			intl.formatMessage({
				id: "J29+pZ",
				defaultMessage: "Edit user profile",
			}),
		editUserDesc: () =>
			intl.formatMessage({
				id: "mq++y1",
				defaultMessage:
					"Make changes to this user's profile here. Click save when you're done.",
			}),
		addNewUser: () =>
			intl.formatMessage({
				id: "j3duXc",
				defaultMessage: "Add New User",
			}),
		createUserDesc: () =>
			intl.formatMessage({
				id: "ERkFf1",
				defaultMessage:
					"Add the new user's profile details here. Click save when you're done.",
			}),
		user: () => intl.formatMessage({ id: "sUNhQE", defaultMessage: "user" }),
		cancelResDesc: () =>
			intl.formatMessage({
				id: "64hPUB",
				defaultMessage: `Do you wish to cancel the reservation?`,
			}),
		Checkout: () =>
			intl.formatMessage({
				id: "BJ2TKX",
				defaultMessage: `Checkout`,
			}),
		checkoutResDesc: () =>
			intl.formatMessage({
				id: "Xl12PH",
				defaultMessage: `Do you wish to checkout the book?`,
			}),
		reservation: () =>
			intl.formatMessage({ id: "DjAt8v", defaultMessage: "reservation" }),
		createRes: () =>
			intl.formatMessage({
				id: "exNENh",
				defaultMessage: "Create reservation",
			}),
		checkedOut: () =>
			intl.formatMessage({
				id: "F3EWgg",
				defaultMessage: "Checked out",
			}),
		expired: () =>
			intl.formatMessage({
				id: "RahCRH",
				defaultMessage: "Expired",
			}),
		reservedUntil: ({ date }: { date: string }) =>
			intl.formatMessage(
				{
					id: "ashuNd",
					defaultMessage: "Reserved until {date}",
				},
				{
					date: date,
				},
			),
		reservedBy: ({ username }: { username: string }) =>
			intl.formatMessage(
				{
					id: "st8FyU",
					defaultMessage: "Reserved by {username}",
				},
				{
					username: username,
				},
			),
		loanedTo: ({ username }: { username: string }) =>
			intl.formatMessage(
				{
					id: "GDObmQ",
					defaultMessage: "Loaned to {username}",
				},
				{
					username: username,
				},
			),
		Return: () =>
			intl.formatMessage({ id: "0WJNP/", defaultMessage: "Return" }),
		returnBookDesc: () =>
			intl.formatMessage(
				{ id: "IfPris", defaultMessage: `Do you wish to return the book?` },
				{},
			),
		Renew: () => intl.formatMessage({ id: "nWQFic", defaultMessage: "Renew" }),
		renewLoanDesc: () =>
			intl.formatMessage({
				id: "bva7X2",
				defaultMessage: `Do you wish to renew the loan?`,
			}),
		User: () => intl.formatMessage({ id: "EwRIOm", defaultMessage: "User" }),
		searchForUser: () =>
			intl.formatMessage({
				id: "n6nlj0",
				defaultMessage: "Search for user",
			}),
		noUserFound: () =>
			intl.formatMessage({
				id: "MD5B2N",
				defaultMessage: "No user found",
			}),
		startTypingForUser: () =>
			intl.formatMessage({
				id: "ETcvzE",
				defaultMessage: "Start typing something to search for users.",
			}),
		Book: () => intl.formatMessage({ id: "bv2X6I", defaultMessage: "Book" }),
		searchForBook: () =>
			intl.formatMessage({
				id: "sAr2D+",
				defaultMessage: "Search for book",
			}),
		noBookFound: () =>
			intl.formatMessage({
				id: "nMtlAn",
				defaultMessage: "No book found",
			}),
		startTypingForBook: () =>
			intl.formatMessage({
				id: "/kO/po",
				defaultMessage: "Start typing something to search for books.",
			}),
		loan: () => intl.formatMessage({ id: "RwzIKM", defaultMessage: "loan" }),
		createLoan: () =>
			intl.formatMessage({
				id: "3qVd6h",
				defaultMessage: "Create loan",
			}),
		selectUserAndBook: () =>
			intl.formatMessage({
				id: "SbUqp8",
				defaultMessage:
					"Select the user and book. Click upload when you're done.",
			}),
		dueDate: ({ date }: { date: string }) =>
			intl.formatMessage(
				{
					id: "5vDqi+",
					defaultMessage: "Due {date}",
				},
				{ date },
			),
		Overdue: () =>
			intl.formatMessage({
				id: "M0vCGv",
				defaultMessage: "Overdue",
			}),
		outstandingAmount: ({ amount }: { amount: string }) =>
			intl.formatMessage(
				{
					id: "Vxu0f9",
					defaultMessage: "Outstanding amount: {amount}",
				},
				{ amount },
			),
		Paid: () =>
			intl.formatMessage({
				id: "u/vOPu",
				defaultMessage: "Paid",
			}),
		finedTo: ({ username }: { username: string }) =>
			intl.formatMessage(
				{
					id: "MhKGQF",
					defaultMessage: "Fined to {username}",
				},
				{ username },
			),
		fine: () => intl.formatMessage({ id: "yfSHXZ", defaultMessage: "fine" }),
		Settle: () =>
			intl.formatMessage({ id: "mPKS81", defaultMessage: "Settle" }),
		Confirmation: () =>
			intl.formatMessage({ id: "Pswssl", defaultMessage: "Confirmation" }),
		settleFineDesc: () =>
			intl.formatMessage({
				id: "4rGuOk",
				defaultMessage: `Do you wish to settle the fine?`,
			}),
		Theme: () => intl.formatMessage({ id: "Pe0ogR", defaultMessage: "Theme" }),
		Themes: () =>
			intl.formatMessage({ id: "Avsnjl", defaultMessage: "Themes" }),
		selectTheme: () =>
			intl.formatMessage({
				id: "qJ010K",
				defaultMessage: "Select theme",
			}),
		pageNotFound: () =>
			intl.formatMessage({
				id: "Mz/gsa",
				defaultMessage: "Page Not Found",
			}),
		goBack: () =>
			intl.formatMessage({ id: "ekfOaV", defaultMessage: "Go Back" }),
		sortBy: () =>
			intl.formatMessage({
				id: "hDI+JM",
				defaultMessage: "Sort by",
			}),
		Search: () =>
			intl.formatMessage({ id: "xmcVZ0", defaultMessage: "Search" }),
		itemsPerPage: () =>
			intl.formatMessage({
				id: "svHvmD",
				defaultMessage: "Items per page",
			}),
		pageXofY: ({
			currentPage,
			totalPages,
		}: {
			currentPage: number;
			totalPages: number;
		}) =>
			intl.formatMessage(
				{ id: "eilhZ9", defaultMessage: "Page {currentPage} of {totalPages}" },
				{ currentPage, totalPages },
			),
		homePage: () =>
			intl.formatMessage({ id: "xHJnaY", defaultMessage: "Home Page" }),
		Catalogue: () =>
			intl.formatMessage({ id: "U2napd", defaultMessage: "Catalogue" }),
		signOut: () =>
			intl.formatMessage({ id: "F62y+K", defaultMessage: "Sign Out" }),
		signIn: () =>
			intl.formatMessage({ id: "Ub+AGc", defaultMessage: "Sign In" }),
		Resources: () =>
			intl.formatMessage({ id: "c/KktL", defaultMessage: "Resources" }),
		myBookmarks: () =>
			intl.formatMessage({ id: "X9bISG", defaultMessage: "My Bookmarks" }),
		myLoans: () =>
			intl.formatMessage({ id: "InakXV", defaultMessage: "My Loans" }),
		myReservations: () =>
			intl.formatMessage({
				id: "r3JtGI",
				defaultMessage: "My Reservations",
			}),
		myFines: () =>
			intl.formatMessage({ id: "UPVRty", defaultMessage: "My Fines" }),
		Admin: () => intl.formatMessage({ id: "iHN12u", defaultMessage: "Admin" }),
		manageUsers: () =>
			intl.formatMessage({ id: "55dcAt", defaultMessage: "Manage Users" }),
		manageBooks: () =>
			intl.formatMessage({ id: "RTM+tQ", defaultMessage: "Manage Books" }),
		manageLoans: () =>
			intl.formatMessage({ id: "zrW7b6", defaultMessage: "Manage Loans" }),
		manageReservations: () =>
			intl.formatMessage({
				id: "eujWGK",
				defaultMessage: "Manage Reservations",
			}),
		manageFines: () =>
			intl.formatMessage({ id: "pWbzFs", defaultMessage: "Manage Fines" }),
		AuditLog: () =>
			intl.formatMessage({ id: "7GrpT1", defaultMessage: "Audit Log" }),
		Settings: () =>
			intl.formatMessage({ id: "D3idYv", defaultMessage: "Settings" }),
		Welcome: ({ name }: { name: string }) =>
			intl.formatMessage(
				{ id: "gDMHVV", defaultMessage: "Welcome {name}" },
				{ name },
			),
		toggleTheme: () =>
			intl.formatMessage({
				id: "EQpyb8",
				defaultMessage: "Toggle theme",
			}),
		Back: () => intl.formatMessage({ id: "cyR7Kh", defaultMessage: "Back" }),
		selectAppLanguage: () =>
			intl.formatMessage({
				id: "LKP2kK",
				defaultMessage: "Select app language",
			}),
		filterBy: () =>
			intl.formatMessage({
				id: "S57QRB",
				defaultMessage: "Filter by",
			}),
		Edit: () => intl.formatMessage({ id: "wEQDC6", defaultMessage: "Edit" }),
		Delete: () =>
			intl.formatMessage({ id: "K3r6DQ", defaultMessage: "Delete" }),
		areYouSure: () =>
			intl.formatMessage({
				id: "v5ykbS",
				defaultMessage: "Are you absolutely sure?",
			}),
		thisActionCannotBeUndone: ({ subject }: { subject: string }) =>
			intl.formatMessage(
				{
					id: "s3ZjbA",
					defaultMessage:
						"This action cannot be undone. This will permanently delete this {subject} and remove it from our servers.",
				},
				{ subject },
			),
		Cancel: () =>
			intl.formatMessage({ id: "47FYwb", defaultMessage: "Cancel" }),
		Continue: () =>
			intl.formatMessage({ id: "acrOoz", defaultMessage: "Continue" }),
		addNew: ({ subject }: { subject: string }) =>
			intl.formatMessage(
				{ id: "HNHwk3", defaultMessage: "Add new {subject}" },
				{ subject },
			),
		book: () => intl.formatMessage({ id: "kmmXht", defaultMessage: "book" }),
		copy: () =>
			intl.formatMessage({
				id: "j7M9od",
				defaultMessage: "copy",
			}),
		copies: () =>
			intl.formatMessage({
				id: "K0FUQq",
				defaultMessage: "copies",
			}),
		XavailableYcopy: ({
			availableTotal,
			totalCount,
			copy,
		}: {
			availableTotal: number;
			totalCount: number;
			copy: string;
		}) =>
			intl.formatMessage(
				{
					id: "Rb/Qfr",
					defaultMessage: "{availableTotal} available - {totalCount} {copy}",
				},
				{ availableTotal, totalCount, copy },
			),
		Books: () =>
			intl.formatMessage({
				id: "ti1RKs",
				defaultMessage: "Books",
			}),
		newArrivals: () =>
			intl.formatMessage({
				id: "Qpxx+l",
				defaultMessage: "New Arrivals",
			}),
		popularBooks: () =>
			intl.formatMessage({
				id: "yLinlZ",
				defaultMessage: "Popular Books",
			}),
		Borrow: () =>
			intl.formatMessage({ id: "6dn1ux", defaultMessage: "Borrow" }),
		Reserve: () =>
			intl.formatMessage({
				id: "PCjq1b",
				defaultMessage: "Reserve",
			}),
		reserveBookDesc: ({ title }: { title: string }) =>
			intl.formatMessage(
				{ id: "Yvzv3+", defaultMessage: `Do you wish to reserve "{title}"?` },
				{ title },
			),
		openInOtherTab: () =>
			intl.formatMessage({
				id: "l/U6iS",
				defaultMessage: "Open in other tab",
			}),
		loanBookDesc: ({ title }: { title: string }) =>
			intl.formatMessage(
				{ id: "jXzYxr", defaultMessage: `Do you wish to borrow "{title}"?` },
				{ title },
			),
		volumeTitle: () =>
			intl.formatMessage({ id: "0cfEAN", defaultMessage: "Volume Title" }),
		volumeTitlePlaceholder: () =>
			intl.formatMessage({
				id: "aD09Do",
				defaultMessage: "The Great Gatsby",
			}),
		volumeAuthor: () =>
			intl.formatMessage({ id: "3kESYm", defaultMessage: "Volume Author" }),
		volumeAuthorPlaceholder: () =>
			intl.formatMessage({
				id: "7iInTF",
				defaultMessage: "F. Scott Fitzgerald",
			}),
		Publisher: () =>
			intl.formatMessage({ id: "Kdc67U", defaultMessage: "Publisher" }),
		publisherPlaceholder: () =>
			intl.formatMessage({
				id: "20IX1q",
				defaultMessage: "Alma Classics",
			}),
		publicationDate: () =>
			intl.formatMessage({
				id: "oR7LVU",
				defaultMessage: "Publication Date",
			}),
		pickADate: () =>
			intl.formatMessage({
				id: "idkGk/",
				defaultMessage: "Pick a date",
			}),
		Genre: () => intl.formatMessage({ id: "O70sde", defaultMessage: "Genre" }),
		genrePlaceholder: () =>
			intl.formatMessage({ id: "a/NIGu", defaultMessage: "Tragedy" }),
		Language: () =>
			intl.formatMessage({ id: "y1Z3or", defaultMessage: "Language" }),
		selectLanguage: () =>
			intl.formatMessage({
				id: "eVlu1R",
				defaultMessage: "Select language",
			}),
		ISBN: () => intl.formatMessage({ id: "YXUQIi", defaultMessage: "ISBN" }),
		updateBookDetails: () =>
			intl.formatMessage({
				id: "ljmOHb",
				defaultMessage: "Update Book Details",
			}),
		updateBookDesc: () =>
			intl.formatMessage({
				id: "r/k1xh",
				defaultMessage:
					"Make changes to the details of this book here. Click save when you're done.",
			}),
		addNewBook: () =>
			intl.formatMessage({ id: "tzgO/H", defaultMessage: "Add a New Book" }),
		addBookDesc: () =>
			intl.formatMessage({
				id: "bTUCkl",
				defaultMessage:
					"Add the details of the book here. Click upload when you're done.",
			}),
		Create: () =>
			intl.formatMessage({ id: "VzzYJk", defaultMessage: "Create" }),
		byAuthor: ({ author }: { author: string }) =>
			intl.formatMessage(
				{ id: "br61pm", defaultMessage: "By {author}" },
				{ author },
			),
		publishedDateLang: ({ date, lang }: { date: string; lang: string }) =>
			intl.formatMessage(
				{
					id: "FO8+CU",
					defaultMessage: "Published: {date} | Language: {lang}",
				},
				{ date, lang },
			),
		genreIs: ({ genre }: { genre: string }) =>
			intl.formatMessage(
				{ id: "U0QrR1", defaultMessage: "Genre: {genre}" },
				{ genre },
			),
		publishedBy: ({ publisher }: { publisher: string }) =>
			intl.formatMessage(
				{ id: "rqygQ8", defaultMessage: "Published by {publisher}" },
				{ publisher },
			),
		ISBNIs: ({ isbn }: { isbn: string }) =>
			intl.formatMessage(
				{ id: "rTUFJj", defaultMessage: "ISBN: {isbn}" },
				{ isbn },
			),
		dontHaveAcc: () =>
			intl.formatMessage({
				id: "25WwxF",
				defaultMessage: "Don't have an account?",
			}),
		signUpHere: () =>
			intl.formatMessage({ id: "CN7+xa", defaultMessage: "Sign up here" }),
		yourUsername: () =>
			intl.formatMessage({ id: "k9XuYY", defaultMessage: "Your username" }),
		usernameDesc: () =>
			intl.formatMessage({
				id: "aohCSR",
				defaultMessage: "This is your public display name.",
			}),
		Password: () =>
			intl.formatMessage({ id: "5sg7KC", defaultMessage: "Password" }),
		yourPassword: () =>
			intl.formatMessage({ id: "/aWpsO", defaultMessage: "Your password" }),
		passwordDesc: () =>
			intl.formatMessage({
				id: "xsQkIU",
				defaultMessage: "This is your password.",
			}),
		userID: () =>
			intl.formatMessage({ id: "55vTH+", defaultMessage: "User ID" }),
		Username: () =>
			intl.formatMessage({ id: "JCIgkj", defaultMessage: "Username" }),
		Action: () =>
			intl.formatMessage({ id: "QlsDcr", defaultMessage: "Action" }),
		AuditLogs: () =>
			intl.formatMessage({ id: "t/TuwD", defaultMessage: "Audit Logs" }),
		Event: () => intl.formatMessage({ id: "m1czzY", defaultMessage: "Event" }),
		whatHappened: () =>
			intl.formatMessage({ id: "eF7TQV", defaultMessage: "What happened?" }),
		Date: () => intl.formatMessage({ id: "P7PLVj", defaultMessage: "Date" }),
		auditLog: () =>
			intl.formatMessage({ id: "btC50m", defaultMessage: "audit log" }),
		logAnEvent: () =>
			intl.formatMessage({ id: "ttBFjN", defaultMessage: "Log an event" }),
		logEventDesc: () =>
			intl.formatMessage({
				id: "xDDxzU",
				defaultMessage:
					"Describe the event here. Click upload when you're done.",
			}),
		Borrowed: () =>
			intl.formatMessage({ id: "IFPQiA", defaultMessage: "Borrowed" }),
		Returned: () =>
			intl.formatMessage({ id: "wm96Jx", defaultMessage: "Returned" }),
		Reserved: () =>
			intl.formatMessage({ id: "sI/NFi", defaultMessage: "Reserved" }),
		Fulfilled: () =>
			intl.formatMessage({ id: "jY+f2f", defaultMessage: "Fulfilled" }),
		Outstanding: () =>
			intl.formatMessage({ id: "Q1xfqF", defaultMessage: "Outstanding" }),
		admin: () => intl.formatMessage({ id: "x61Ey6", defaultMessage: "admin" }),
		libadmin: () =>
			intl.formatMessage({ id: "vzfNEJ", defaultMessage: "libadmin" }),
		librarian: () =>
			intl.formatMessage({ id: "cyhrRT", defaultMessage: "librarian" }),
		member: () =>
			intl.formatMessage({ id: "v8f8hL", defaultMessage: "member" }),
		Fullname: () =>
			intl.formatMessage({ id: "yk4PT9", defaultMessage: "Full name" }),
		Preferredname: () =>
			intl.formatMessage({ id: "bY5h3E", defaultMessage: "Preferred name" }),
		DateOfCreation: () =>
			intl.formatMessage({ id: "KxPY7j", defaultMessage: "Date of creation" }),
		Title: () => intl.formatMessage({ id: "9a9+ww", defaultMessage: "Title" }),
		Author: () =>
			intl.formatMessage({ id: "tWkQ2J", defaultMessage: "Author" }),
		PublicationDate: () =>
			intl.formatMessage({ id: "6ruzVm", defaultMessage: "Publication date" }),
		BorrowDate: () =>
			intl.formatMessage({ id: "nZi7wU", defaultMessage: "Borrow date" }),
		DueDate: () =>
			intl.formatMessage({ id: "l3AfOI", defaultMessage: "Due date" }),
		ReservationDate: () =>
			intl.formatMessage({ id: "n/Oz/R", defaultMessage: "Reservation date" }),
		Amount: () =>
			intl.formatMessage({ id: "/0TOL5", defaultMessage: "Amount" }),
	};
};

export type Translator = ReturnType<typeof translations>;
export type TranslationKey = keyof Translator;
