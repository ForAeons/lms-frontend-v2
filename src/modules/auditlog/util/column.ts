import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { IntlShape } from "react-intl";

export const getAuditLogColumns = (intl: IntlShape): ColumnDef<AuditLog>[] => {
	return [
		{
			accessorKey: "user_id",
			header: intl.formatMessage({
				id: "55vTH+",
				defaultMessage: "User ID",
			}),
		},
		{
			accessorKey: "user.username",
			header: intl.formatMessage({
				id: "JCIgkj",
				defaultMessage: "Username",
			}),
		},
		{
			accessorKey: "action",
			header: intl.formatMessage({
				id: "QlsDcr",
				defaultMessage: "Action",
			}),
		},
		{
			accessorKey: "date",
			header: intl.formatMessage({
				id: "P7PLVj",
				defaultMessage: "Date",
			}),
			cell: ({ row }) => {
				return format(row.getValue("date"), "P");
			},
		},
	];
};
