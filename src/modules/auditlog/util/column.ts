import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { IntlWrapper } from "@/components/language-provider";

export const getTranslatedColumns = (): ColumnDef<AuditLog>[] => {
	return [
		{
			accessorKey: "user_id",
			header: IntlWrapper.translator.userID(),
		},
		{
			accessorKey: "user.username",
			header: IntlWrapper.translator.Username(),
		},
		{
			accessorKey: "action",
			header: IntlWrapper.translator.Action(),
		},
		{
			accessorKey: "date",
			header: IntlWrapper.translator.Date(),
			cell: ({ row }) => {
				return format(row.getValue("date"), "P");
			},
		},
	];
};
