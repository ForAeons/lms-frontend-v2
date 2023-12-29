import React from "react";
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
import { LG_ICON_SIZE } from "@/constants";
import { useMediaQuery } from "@/hooks";
import { UserUpdateRoleForm } from ".";
import { updateUserRoleThunk, useAppDispatch } from "@/store";

const Btn: React.FC = () => {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						variant="ghost"
						className="hover:bg-transparent hover:opacity-50 transition-opacity"
					>
						<UserCogIcon className="text-primary" size={LG_ICON_SIZE} />
					</Button>
				</TooltipTrigger>
				<TooltipContent>
					<p>Change role</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export const UserUpdateRoleBtn: React.FC<{ user: User }> = ({ user }) => {
	const isDesktop = useMediaQuery("(min-width: 1024px)");
	const dispatch = useAppDispatch();

	const onSubmit = (values: RoleUpdate) => {
		dispatch(updateUserRoleThunk({ roleID: values.role_id, userID: user.id }));
	};

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
								<DialogTitle>Update user role</DialogTitle>
								<DialogDescription>
									{"Change the role of this user"}
								</DialogDescription>
							</DialogHeader>
							<UserUpdateRoleForm onSubmit={onSubmit} action="Change" />
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
					<DrawerTitle>Update user role</DrawerTitle>
					<DrawerDescription>Change the role of this user</DrawerDescription>
				</DrawerHeader>
				<DrawerFooter>
					<UserUpdateRoleForm onSubmit={onSubmit} action="Change" />
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};
