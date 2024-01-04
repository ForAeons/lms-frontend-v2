import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTranslations } from "@/components/language-provider";
import { ResRoutes, reservationApi } from "@/api";
import { useMediaQuery } from "@/hooks";
import { CreateBtn } from "@/modules";
import { ResCreateForm } from ".";

export const ResCreateDialog: React.FC = () => {
	const translate = useTranslations();
	const reservation = translate.reservation();
	const createRes = translate.createRes();
	const createResDescription = translate.selectUserAndBook();

	const queryClient = useQueryClient();
	const createResMutation = useMutation({
		mutationKey: [ResRoutes.BASE, "new"],
		mutationFn: reservationApi.CreateRes,
		onSuccess: (data) => {
			const loan = data!.data;
			queryClient.invalidateQueries({ queryKey: [ResRoutes.BASE] });
			toast.success(translate.Success(), {
				description: translate.createResSuccessDesc({
					title: loan.book.title,
					username: loan.user.username,
				}),
			});
		},
	});

	const isDesktop = useMediaQuery("(min-width: 1024px)");

	if (isDesktop) {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<div>
						<CreateBtn subject={reservation} />
					</div>
				</DialogTrigger>
				<DialogContent className="max-h-[75vh] p-0">
					<ScrollArea className="max-h-[70vh]">
						<div className="p-6">
							<DialogHeader>
								<DialogTitle>{createRes}</DialogTitle>
								<DialogDescription>{createResDescription}</DialogDescription>
							</DialogHeader>
							<ResCreateForm onSubmit={createResMutation.mutate} />
						</div>
						<ScrollBar />
					</ScrollArea>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<div>
					<CreateBtn subject={reservation} />
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{createRes}</DrawerTitle>
					<DrawerDescription>{createResDescription}</DrawerDescription>
				</DrawerHeader>
				<div className="p-3">
					<ResCreateForm onSubmit={createResMutation.mutate} />
				</div>
			</DrawerContent>
		</Drawer>
	);
};
