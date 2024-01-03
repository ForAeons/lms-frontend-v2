import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { IntlWrapper } from "@/components/language-provider";
import { TranslationKey } from "@/util";

export const AuditLogColumns = [
	{
		accessorKey: "user_id",
		header: "User ID",
		intlID: "userID",
	},
	{
		accessorKey: "user.username",
		header: "Username",
		intlID: "Username",
	},
	{
		accessorKey: "action",
		header: "Action",
		intlID: "Action",
	},
	{
		accessorKey: "date",
		header: "Date",
		intlID: "Date",
		cell: ({ row }) => {
			return format(row.getValue("date"), "P");
		},
	},
] satisfies ColumnDef<AuditLog>[];

export const getTranslatedColumns = (): ColumnDef<AuditLog>[] => {
	return AuditLogColumns.map((column) => {
		return {
			...column,
			header: (
				IntlWrapper.translator[column.intlID as TranslationKey] as () => string
			)(),
		};
	});
};
