interface AuditLog {
	id: number;
	user_id: number;
	action: string;
	date: string;
}

interface AuditLogDetailed extends AuditLog {
	user: UserPerson;
}

type AuditLogCreate = Omit<AuditLog, "id" | "user_id">;
