import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { Translator } from "@/util";

export const getTranslatedColumns = (t: Translator): ColumnDef<AuditLog>[] => {
	return [
		{
			accessorKey: "user_id",
			header: t.userID(),
		},
		{
			accessorKey: "user.username",
			header: t.Username(),
		},
		{
			accessorKey: "action",
			header: t.Action(),
		},
		{
			accessorKey: "date",
			header: t.Date(),
			cell: ({ row }) => {
				return format(row.getValue("date"), "P");
			},
		},
	];
};
