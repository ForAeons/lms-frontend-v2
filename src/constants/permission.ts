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

// Perhaps move this as a response from the server in the future
export const AdminRole = {
	id: 1,
	label: "Admin",
};

export const LibAdminRole = {
	id: 2,
	label: "Library Admin",
};

export const LibrarianRole = {
	id: 3,
	label: "Librarian",
};

export const MemberRole = {
	id: 4,
	label: "Member",
};
