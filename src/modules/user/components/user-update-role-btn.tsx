import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UserCogIcon } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/components/language-provider";
import { UserRoutes, userApi } from "@/api";
import { LG_ICON_SIZE } from "@/constants";
import { useMediaQuery } from "@/hooks";
import { UserUpdateRoleForm } from ".";

const Btn: React.FC = () => {
	const translate = useTranslations();
	const changeRole = translate.changeRole();

	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
					>
						<UserCogIcon className="text-primary" size={LG_ICON_SIZE} />
						<span className="sr-only">{changeRole}</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>{changeRole}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export const UserUpdateRoleBtn: React.FC<{ user: User }> = ({ user }) => {
	const translate = useTranslations();
	const updateUserRole = translate.updateUserRole();
	const updateUserRoleDescription = translate.updateUserRoleDesc();
	const updateAction = translate.Update();

	const queryClient = useQueryClient();
	const updateRoleMutation = useMutation({
		mutationKey: [UserRoutes.BASE, UserRoutes.UDPATE_ROLE.BASE, user.id],
		mutationFn: (roleID: number) => userApi.ChangeRole(user.id, roleID),
		onSuccess: (data) => {
			const user = data!.data;
			queryClient.invalidateQueries({ queryKey: [UserRoutes.BASE] });
			toast.success(translate.Success(), {
				description: translate.updateUserRoleSuccessDesc({
					username: user.username,
				}),
			});
		},
	});

	const onSubmit = (values: RoleUpdate) => {
		updateRoleMutation.mutate(values.role_id);
	};

	const isDesktop = useMediaQuery("(min-width: 1024px)");

	if (isDesktop) {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<div>
						<Btn />
					</div>
				</DialogTrigger>
				<DialogContent className="max-h-[75vh] p-0">
					<ScrollArea className="max-h-[70vh]">
						<div className="p-6">
							<DialogHeader>
								<DialogTitle>{updateUserRole}</DialogTitle>
								<DialogDescription>
									{updateUserRoleDescription}
								</DialogDescription>
							</DialogHeader>
							<UserUpdateRoleForm onSubmit={onSubmit} action={updateAction} />
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
					<Btn />
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{updateUserRole}</DrawerTitle>
					<DrawerDescription>{updateUserRoleDescription}</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<UserUpdateRoleForm onSubmit={onSubmit} action={updateAction} />
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
