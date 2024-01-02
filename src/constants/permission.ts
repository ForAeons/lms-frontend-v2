import { createIntl } from "react-intl";

export const MANAGE_ALL = "manageall";
export const MANAGE_BOOK_RECORDS = "managebookrecords";
export const CREATE_USER = "createuser";
export const DELETE_USER = "deleteuser";
export const UPDATE_USER = "updateuser";
export const UPDATE_USER_ROLE = "updaterole";
export const DELETE_BOOK = "deletebook";
export const UPDATE_BOOK = "updatebook";
export const CREATE_BOOK = "createbook";
export const READ_AUDIT_LOG = "readauditlog";
export const CREATE_AUDIT_LOG = "createauditlog";

export const PERMISSIONS = [
	MANAGE_ALL,
	MANAGE_BOOK_RECORDS,
	CREATE_USER,
	DELETE_USER,
	UPDATE_USER,
	UPDATE_USER_ROLE,
	DELETE_BOOK,
	UPDATE_BOOK,
	CREATE_BOOK,
	READ_AUDIT_LOG,
	CREATE_AUDIT_LOG,
];

// This dead code is used to generate the intl IDs for the roles when running npm run extract
const Intl = createIntl({ locale: "en", messages: {} });
Intl.formatMessage({ id: "x61Ey6", defaultMessage: "admin" });
Intl.formatMessage({ id: "vzfNEJ", defaultMessage: "libadmin" });
Intl.formatMessage({ id: "cyhrRT", defaultMessage: "librarian" });
Intl.formatMessage({ id: "v8f8hL", defaultMessage: "member" });

// Perhaps move this as a response from the server in the future
export const AdminRole = {
	id: 1,
	label: "Admin",
	intlID: "x61Ey6",
};

export const LibAdminRole = {
	id: 2,
	label: "Library Admin",
	intlID: "vzfNEJ",
};

export const LibrarianRole = {
	id: 3,
	label: "Librarian",
	intlID: "cyhrRT",
};

export const MemberRole = {
	id: 4,
	label: "Member",
	intlID: "v8f8hL",
};
