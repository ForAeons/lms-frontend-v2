import React from "react";
import {
  CircleOffIcon,
  MoreHorizontalIcon,
  QrCodeIcon,
  Trash2Icon,
  Undo2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  BookRoutes,
  BookcopyRoutes,
  LoanRoutes,
  ResRoutes,
  bookcopyApi,
} from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BACKEND_BASE_URL, MD_ICON_SIZE } from "@/constants";
import { useTranslations } from "@/components/language-provider";

export const BookCopyTable: React.FC<{ copies: BookCopy[] }> = ({ copies }) => {
  const t = useTranslations();

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationKey: [BookcopyRoutes.BASE, "delete"],
    mutationFn: bookcopyApi.DeleteBookcopy,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [BookcopyRoutes.BASE] });
      queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
      toast.success(t.Success());
    },
  });

  const returnBookMutation = useMutation({
    mutationKey: [
      BookcopyRoutes.BASE,
      "return",
      LoanRoutes.BASE,
      LoanRoutes.RETURN.ROUTE,
    ],
    mutationFn: bookcopyApi.ReturnBookcopy,
    onSuccess: (data) => {
      const loan = data!.data;
      queryClient.invalidateQueries({ queryKey: [LoanRoutes.BASE] });
      queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
      toast.success(t.Success(), {
        description: t.returnLoanSuccessDesc({
          title: loan.book.title,
        }),
      });
    },
  });

  const cancelResMutation = useMutation({
    mutationKey: [
      BookcopyRoutes.BASE,
      "cancel",
      ResRoutes.BASE,
      ResRoutes.CANCEL.ROUTE,
    ],
    mutationFn: bookcopyApi.CancelBookcopy,
    onSuccess: (data) => {
      const loan = data!.data;
      queryClient.invalidateQueries({ queryKey: [ResRoutes.BASE] });
      queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
      toast.success(t.Success(), {
        description: t.cancelResSuccessDesc({
          title: loan.book.title,
        }),
      });
    },
  });

  return (
    <Table>
      <TableHeader className="whitespace-nowrap">
        <TableRow>
          <TableHead className="w-[30px]">{t.ID()}</TableHead>
          <TableHead >{t.Status()}</TableHead>
          <TableHead className="text-right">{t.Actions()}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="">
        {
          copies.map((copy) => {
            const qrCodeURL = `${BACKEND_BASE_URL}/api/v1/${BookcopyRoutes.BASE}/${copy.id}/${BookcopyRoutes.QR_CODE.ROUTE}`;

            return (
              <TableRow key={copy.id}>
                <TableCell className="font-medium">{copy.id}</TableCell>
                <TableCell>{t[copy.status]()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        className="h-8 w-8 p-0 rounded-full justify-self-end"
                      >
                        <span className="sr-only">{t.openMenu()}</span>
                        <MoreHorizontalIcon size={MD_ICON_SIZE} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>{t.Actions()}</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Button
                          variant="ghost"
                          asChild
                          className="w-full flex gap-3 justify-start"
                        >
                          <a
                            href={qrCodeURL}
                            type="download"
                            className="hover:opacity-70 transition-opacity"
                          >
                            <QrCodeIcon size={MD_ICON_SIZE} />
                            {t.downloadQRCode()}
                          </a>
                        </Button>
                      </DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        <Button
                          variant="ghost"
                          onClick={() => deleteMutation.mutate({ bookcopyID: copy.id })}
                          disabled={
                            copy.status !== "available" || deleteMutation.isPending
                          }
                          className="w-full flex gap-3 justify-start"
                        >
                          <Trash2Icon size={MD_ICON_SIZE} />
                          {t.Delete()}
                        </Button>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <Button
                          variant="ghost"
                          onClick={() =>
                            returnBookMutation.mutate({ bookcopyID: copy.id })
                          }
                          disabled={
                            copy.status !== "loaned" || returnBookMutation.isPending
                          }
                          className="w-full flex gap-3 justify-start"
                        >
                          <Undo2Icon size={MD_ICON_SIZE} />
                          {t.Return()}
                        </Button>
                      </DropdownMenuItem>

                      <DropdownMenuItem>
                        <Button
                          variant="ghost"
                          onClick={() =>
                            cancelResMutation.mutate({ bookcopyID: copy.id })
                          }
                          disabled={
                            copy.status !== "reserved" || cancelResMutation.isPending
                          }
                          className="w-full flex gap-3 justify-start"
                        >
                          <CircleOffIcon size={MD_ICON_SIZE} />
                          {t.Cancel()}
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )
          })
        }
      </TableBody>
    </Table>

  );
}