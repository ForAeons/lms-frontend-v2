import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const auditLogColumns: ColumnDef<AuditLog>[] = [
	{
		accessorKey: "user_id",
		header: "User ID",
	},
	{
		accessorKey: "user.username",
		header: "Username",
	},
	{
		accessorKey: "action",
		header: "Action",
	},
	{
		accessorKey: "date",
		header: "Date",
		cell: ({ row }) => {
			return format(row.getValue("date"), "P");
		},
	},
];
