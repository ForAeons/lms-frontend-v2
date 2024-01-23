import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useTranslations } from "@/components/language-provider";
import { format } from "date-fns";

export const AuditlogTable: React.FC<{ logs: AuditLogDetailed[] }> = ({ logs }) => {
  const translate = useTranslations();
  const userID = translate.userID();
  const username = translate.Username();
  const action = translate.Action();
  const date = translate.Date();

  return (
    <Table>
      <TableHeader className="whitespace-nowrap">
        <TableRow>
          <TableHead >{userID}</TableHead>
          <TableHead >{username}</TableHead>
          <TableHead >{action}</TableHead>
          <TableHead className="text-right ">{date}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {
          logs.map((log) => {
            return (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.user_id}</TableCell>
                <TableCell>{log.user.username}</TableCell>
                <TableCell className="min-w-[300px]">{log.action}</TableCell>
                <TableCell className="text-right">{format(log.date, "P")}</TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>

  );
}