import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	CircleOffIcon,
	MoreHorizontalIcon,
	QrCodeIcon,
	Trash2Icon,
	Undo2Icon,
} from "lucide-react";
import { BACKEND_BASE_URL, MD_ICON_SIZE } from "@/constants";
import {
	BookRoutes,
	BookcopyRoutes,
	LoanRoutes,
	ResRoutes,
	bookcopyApi,
} from "@/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "@/components/language-provider";

export const useTranslatedColumns = (): ColumnDef<BookCopy>[] => {
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

	return [
		{
			accessorKey: "id",
			header: () => <div className="w-fit">{t.ID()}</div>,
			cell: ({ row }) => <div className="w-[80px]">{row.original.id}</div>,
			size: 20,
		},
		{
			accessorKey: "status",
			header: () => <div className="w-full  s">{t.Status()}</div>,
			cell: ({ row }) => (
				<div className="flex-grow">{t[row.original.status]()}</div>
			),
		},
		{
			id: "actions",
			size: 10,
			cell: ({ row }) => {
				const copy = row.original;

				const qrCodeURL = `${BACKEND_BASE_URL}/${BookcopyRoutes.BASE}/${copy.id}/${BookcopyRoutes.QR_CODE.ROUTE}`;

				return (
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
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
				);
			},
		},
	];
};
