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
 * 6. Copy the value of that id and paste it as the `defaultMessage` in the object
 * 6. Copy the value of that id and set it as the key of this translation function
 *
 * @param intl The intl object from react-intl
 * @returns A list of translations
 */

export const translations = (intl: IntlShape) => {
	return {
		["Pe0ogR"]: () =>
			intl.formatMessage({ id: "Pe0ogR", defaultMessage: "Theme" }),
		["Avsnjl"]: () =>
			intl.formatMessage({ id: "Avsnjl", defaultMessage: "Themes" }),
		["qJ010K"]: () =>
			intl.formatMessage({
				id: "qJ010K",
				defaultMessage: "Select theme",
			}),
		["Mz/gsa"]: () =>
			intl.formatMessage({
				id: "Mz/gsa",
				defaultMessage: "Page Not Found",
			}),
		["ekfOaV"]: () =>
			intl.formatMessage({ id: "ekfOaV", defaultMessage: "Go Back" }),
		["hDI+JM"]: () =>
			intl.formatMessage({
				id: "hDI+JM",
				defaultMessage: "Sort by",
			}),
		["xmcVZ0"]: () =>
			intl.formatMessage({ id: "xmcVZ0", defaultMessage: "Search" }),
		["svHvmD"]: () =>
			intl.formatMessage({
				id: "svHvmD",
				defaultMessage: "Items per page",
			}),
		["eilhZ9"]: ({
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
		["xHJnaY"]: () =>
			intl.formatMessage({ id: "xHJnaY", defaultMessage: "Home Page" }),
		["U2napd"]: () =>
			intl.formatMessage({ id: "U2napd", defaultMessage: "Catalogue" }),
		["F62y+K"]: () =>
			intl.formatMessage({ id: "F62y+K", defaultMessage: "Sign Out" }),
		["Ub+AGc"]: () =>
			intl.formatMessage({ id: "Ub+AGc", defaultMessage: "Sign In" }),
		["c/KktL"]: () =>
			intl.formatMessage({ id: "c/KktL", defaultMessage: "Resources" }),
		["X9bISG"]: () =>
			intl.formatMessage({ id: "X9bISG", defaultMessage: "My Bookmarks" }),
		["InakXV"]: () =>
			intl.formatMessage({ id: "InakXV", defaultMessage: "My Loans" }),
		["r3JtGI"]: () =>
			intl.formatMessage({
				id: "r3JtGI",
				defaultMessage: "My Reservations",
			}),
		["UPVRty"]: () =>
			intl.formatMessage({ id: "UPVRty", defaultMessage: "My Fines" }),
		["iHN12u"]: () =>
			intl.formatMessage({ id: "iHN12u", defaultMessage: "Admin" }),
		["55dcAt"]: () =>
			intl.formatMessage({ id: "55dcAt", defaultMessage: "Manage Users" }),
		["RTM+tQ"]: () =>
			intl.formatMessage({ id: "RTM+tQ", defaultMessage: "Manage Books" }),
		["zrW7b6"]: () =>
			intl.formatMessage({ id: "zrW7b6", defaultMessage: "Manage Loans" }),
		["eujWGK"]: () =>
			intl.formatMessage({
				id: "eujWGK",
				defaultMessage: "Manage Reservations",
			}),
		["pWbzFs"]: () =>
			intl.formatMessage({ id: "pWbzFs", defaultMessage: "Manage Fines" }),
		["7GrpT1"]: () =>
			intl.formatMessage({ id: "7GrpT1", defaultMessage: "Audit Log" }),
		["D3idYv"]: () =>
			intl.formatMessage({ id: "D3idYv", defaultMessage: "Settings" }),
		["gDMHVV"]: ({ name }: { name: string }) =>
			intl.formatMessage(
				{ id: "gDMHVV", defaultMessage: "Welcome {name}" },
				{ name },
			),
		["EQpyb8"]: () =>
			intl.formatMessage({
				id: "EQpyb8",
				defaultMessage: "Toggle theme",
			}),
		["cyR7Kh"]: () =>
			intl.formatMessage({ id: "cyR7Kh", defaultMessage: "Back" }),
		["LKP2kK"]: () =>
			intl.formatMessage({
				id: "LKP2kK",
				defaultMessage: "Select app language",
			}),
		["S57QRB"]: () =>
			intl.formatMessage({
				id: "S57QRB",
				defaultMessage: "Filter by",
			}),
		["wEQDC6"]: () =>
			intl.formatMessage({ id: "wEQDC6", defaultMessage: "Edit" }),
		["K3r6DQ"]: () =>
			intl.formatMessage({ id: "K3r6DQ", defaultMessage: "Delete" }),
		["v5ykbS"]: () =>
			intl.formatMessage({
				id: "v5ykbS",
				defaultMessage: "Are you absolutely sure?",
			}),
		["s3ZjbA"]: ({ subject }: { subject: string }) =>
			intl.formatMessage(
				{
					id: "s3ZjbA",
					defaultMessage:
						"This action cannot be undone. This will permanently delete this {subject} and remove it from our servers.",
				},
				{ subject },
			),
		["47FYwb"]: () =>
			intl.formatMessage({ id: "47FYwb", defaultMessage: "Cancel" }),
		["acrOoz"]: () =>
			intl.formatMessage({ id: "acrOoz", defaultMessage: "Continue" }),
		["HNHwk3"]: ({ subject }: { subject: string }) =>
			intl.formatMessage(
				{ id: "HNHwk3", defaultMessage: "Add new {subject}" },
				{ subject },
			),
		["kmmXht"]: () =>
			intl.formatMessage({ id: "kmmXht", defaultMessage: "book" }),
		["j7M9od"]: () =>
			intl.formatMessage({
				id: "j7M9od",
				defaultMessage: "copy",
			}),
		["K0FUQq"]: () =>
			intl.formatMessage({
				id: "K0FUQq",
				defaultMessage: "copies",
			}),
		["Rb/Qfr"]: ({
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
		["ti1RKs"]: () =>
			intl.formatMessage({
				id: "ti1RKs",
				defaultMessage: "Books",
			}),
		["Qpxx+l"]: () =>
			intl.formatMessage({
				id: "Qpxx+l",
				defaultMessage: "New Arrivals",
			}),
		["yLinlZ"]: () =>
			intl.formatMessage({
				id: "yLinlZ",
				defaultMessage: "Popular Books",
			}),
		["6dn1ux"]: () =>
			intl.formatMessage({ id: "6dn1ux", defaultMessage: "Borrow" }),
		["PCjq1b"]: () =>
			intl.formatMessage({
				id: "PCjq1b",
				defaultMessage: "Reserve",
			}),
		["Yvzv3+"]: ({ title }: { title: string }) =>
			intl.formatMessage(
				{ id: "Yvzv3+", defaultMessage: `Do you wish to reserve "{title}"?` },
				{ title },
			),
		["l/U6iS"]: () =>
			intl.formatMessage({
				id: "l/U6iS",
				defaultMessage: "Open in other tab",
			}),
		["Pswssl"]: () =>
			intl.formatMessage({ id: "Pswssl", defaultMessage: "Confirmation" }),
		["jXzYxr"]: ({ title }: { title: string }) =>
			intl.formatMessage(
				{ id: "jXzYxr", defaultMessage: `Do you wish to borrow "{title}"?` },
				{ title },
			),
		["0cfEAN"]: () =>
			intl.formatMessage({ id: "0cfEAN", defaultMessage: "Volume Title" }),
		["aD09Do"]: () =>
			intl.formatMessage({
				id: "aD09Do",
				defaultMessage: "The Great Gatsby",
			}),
		["3kESYm"]: () =>
			intl.formatMessage({ id: "3kESYm", defaultMessage: "Volume Author" }),
		["7iInTF"]: () =>
			intl.formatMessage({
				id: "7iInTF",
				defaultMessage: "F. Scott Fitzgerald",
			}),
		["Kdc67U"]: () =>
			intl.formatMessage({ id: "Kdc67U", defaultMessage: "Publisher" }),
		["20IX1q"]: () =>
			intl.formatMessage({
				id: "20IX1q",
				defaultMessage: "Alma Classics",
			}),
		["oR7LVU"]: () =>
			intl.formatMessage({
				id: "oR7LVU",
				defaultMessage: "Publication Date",
			}),
		["idkGk/"]: () =>
			intl.formatMessage({
				id: "idkGk/",
				defaultMessage: "Pick a date",
			}),
		["O70sde"]: () =>
			intl.formatMessage({ id: "O70sde", defaultMessage: "Genre" }),
		["a/NIGu"]: () =>
			intl.formatMessage({ id: "a/NIGu", defaultMessage: "Tragedy" }),
		["y1Z3or"]: () =>
			intl.formatMessage({ id: "y1Z3or", defaultMessage: "Language" }),
		["eVlu1R"]: () =>
			intl.formatMessage({
				id: "eVlu1R",
				defaultMessage: "Select language",
			}),
		["YXUQIi"]: () =>
			intl.formatMessage({ id: "YXUQIi", defaultMessage: "ISBN" }),
		["ljmOHb"]: () =>
			intl.formatMessage({
				id: "ljmOHb",
				defaultMessage: "Update Book Details",
			}),
		["r/k1xh"]: () =>
			intl.formatMessage({
				id: "r/k1xh",
				defaultMessage:
					"Make changes to the details of this book here. Click save when you're done.",
			}),
		["jvo0vs"]: () =>
			intl.formatMessage({ id: "jvo0vs", defaultMessage: "Save" }),
		["tzgO/H"]: () =>
			intl.formatMessage({ id: "tzgO/H", defaultMessage: "Add a New Book" }),
		["bTUCkl"]: () =>
			intl.formatMessage({
				id: "bTUCkl",
				defaultMessage:
					"Add the details of the book here. Click upload when you're done.",
			}),
		["VzzYJk"]: () =>
			intl.formatMessage({ id: "VzzYJk", defaultMessage: "Create" }),
		["br61pm"]: ({ author }: { author: string }) =>
			intl.formatMessage(
				{ id: "br61pm", defaultMessage: "By {author}" },
				{ author },
			),
		["S1xMcR"]: ({ date, lang }: { date: string; lang: string }) =>
			intl.formatMessage(
				{ id: "S1xMcR", defaultMessage: "Published: {date} | {lang}" },
				{ date, lang },
			),
		["U0QrR1"]: ({ genre }: { genre: string }) =>
			intl.formatMessage(
				{ id: "U0QrR1", defaultMessage: "Genre: {genre}" },
				{ genre },
			),
		["rqygQ8"]: ({ publisher }: { publisher: string }) =>
			intl.formatMessage(
				{ id: "rqygQ8", defaultMessage: "Published by {publisher}" },
				{ publisher },
			),
		["rTUFJj"]: ({ isbn }: { isbn: string }) =>
			intl.formatMessage(
				{ id: "rTUFJj", defaultMessage: "ISBN: {isbn}" },
				{ isbn },
			),
		["25WwxF"]: () =>
			intl.formatMessage({
				id: "25WwxF",
				defaultMessage: "Don't have an account?",
			}),
		["CN7+xa"]: () =>
			intl.formatMessage({ id: "CN7+xa", defaultMessage: "Sign up here" }),
		["k9XuYY"]: () =>
			intl.formatMessage({ id: "k9XuYY", defaultMessage: "Your username" }),
		["aohCSR"]: () =>
			intl.formatMessage({
				id: "aohCSR",
				defaultMessage: "This is your public display name.",
			}),
		["5sg7KC"]: () =>
			intl.formatMessage({ id: "5sg7KC", defaultMessage: "Password" }),
		["/aWpsO"]: () =>
			intl.formatMessage({ id: "/aWpsO", defaultMessage: "Your password" }),
		["xsQkIU"]: () =>
			intl.formatMessage({
				id: "xsQkIU",
				defaultMessage: "This is your password.",
			}),
		["55vTH+"]: () =>
			intl.formatMessage({ id: "55vTH+", defaultMessage: "User ID" }),
		["JCIgkj"]: () =>
			intl.formatMessage({ id: "JCIgkj", defaultMessage: "Username" }),
		["QlsDcr"]: () =>
			intl.formatMessage({ id: "QlsDcr", defaultMessage: "Action" }),
		["t/TuwD"]: () =>
			intl.formatMessage({ id: "t/TuwD", defaultMessage: "Audit Logs" }),
		["m1czzY"]: () =>
			intl.formatMessage({ id: "m1czzY", defaultMessage: "Event" }),
		["eF7TQV"]: () =>
			intl.formatMessage({ id: "eF7TQV", defaultMessage: "What happened?" }),
		["P7PLVj"]: () =>
			intl.formatMessage({ id: "P7PLVj", defaultMessage: "Date" }),
		["btC50m"]: () =>
			intl.formatMessage({ id: "btC50m", defaultMessage: "audit log" }),
		["ttBFjN"]: () =>
			intl.formatMessage({ id: "ttBFjN", defaultMessage: "Log an event" }),
		["xDDxzU"]: () =>
			intl.formatMessage({
				id: "xDDxzU",
				defaultMessage:
					"Describe the event here. Click upload when you're done.",
			}),
		["IFPQiA"]: () =>
			intl.formatMessage({ id: "IFPQiA", defaultMessage: "Borrowed" }),
		["wm96Jx"]: () =>
			intl.formatMessage({ id: "wm96Jx", defaultMessage: "Returned" }),
		["sI/NFi"]: () =>
			intl.formatMessage({ id: "sI/NFi", defaultMessage: "Reserved" }),
		["jY+f2f"]: () =>
			intl.formatMessage({ id: "jY+f2f", defaultMessage: "Fulfilled" }),
		["Q1xfqF"]: () =>
			intl.formatMessage({ id: "Q1xfqF", defaultMessage: "Outstanding" }),
		["u/vOPu"]: () =>
			intl.formatMessage({ id: "u/vOPu", defaultMessage: "Paid" }),
		["x61Ey6"]: () =>
			intl.formatMessage({ id: "x61Ey6", defaultMessage: "admin" }),
		["vzfNEJ"]: () =>
			intl.formatMessage({ id: "vzfNEJ", defaultMessage: "libadmin" }),
		["cyhrRT"]: () =>
			intl.formatMessage({ id: "cyhrRT", defaultMessage: "librarian" }),
		["v8f8hL"]: () =>
			intl.formatMessage({ id: "v8f8hL", defaultMessage: "member" }),
		["yk4PT9"]: () =>
			intl.formatMessage({ id: "yk4PT9", defaultMessage: "Full name" }),
		["bY5h3E"]: () =>
			intl.formatMessage({ id: "bY5h3E", defaultMessage: "Preferred name" }),
		["KxPY7j"]: () =>
			intl.formatMessage({ id: "KxPY7j", defaultMessage: "Date of creation" }),
		["9a9+ww"]: () =>
			intl.formatMessage({ id: "9a9+ww", defaultMessage: "Title" }),
		["tWkQ2J"]: () =>
			intl.formatMessage({ id: "tWkQ2J", defaultMessage: "Author" }),
		["6ruzVm"]: () =>
			intl.formatMessage({ id: "6ruzVm", defaultMessage: "Publication date" }),
		["nZi7wU"]: () =>
			intl.formatMessage({ id: "nZi7wU", defaultMessage: "Borrow date" }),
		["l3AfOI"]: () =>
			intl.formatMessage({ id: "l3AfOI", defaultMessage: "Due date" }),
		["n/Oz/R"]: () =>
			intl.formatMessage({ id: "n/Oz/R", defaultMessage: "Reservation date" }),
		["/0TOL5"]: () =>
			intl.formatMessage({ id: "/0TOL5", defaultMessage: "Amount" }),
	};
};
