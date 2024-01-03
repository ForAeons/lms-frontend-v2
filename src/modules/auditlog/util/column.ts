import { format } from "date-fns";
import { ColumnDef } from "@tanstack/react-table";
import { IntlWrapper } from "@/components/language-provider";

export const AuditLogColumns: ColumnDef<AuditLog>[] = [
	{
		accessorKey: "user_id",
		header: "User ID",
		intlID: "55vTH+",
	},
	{
		accessorKey: "user.username",
		header: "Username",
		intlID: "JCIgkj",
	},
	{
		accessorKey: "action",
		header: "Action",
		intlID: "QlsDcr",
	},
	{
		accessorKey: "date",
		header: "Date",
		intlID: "P7PLVj",
		cell: ({ row }) => {
			return format(row.getValue("date"), "P");
		},
	},
];

export const getTranslatedColumns = (): ColumnDef<AuditLog>[] => {
	return AuditLogColumns.map((column) => {
		return {
			...column,
			header: IntlWrapper.translator[column.intlID!](),
		};
	});
};
