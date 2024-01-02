import React from "react";
import { useIntl } from "react-intl";
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
import { useMediaQuery } from "@/hooks";
import { updateUserRoleThunk, useAppDispatch } from "@/store";
import { LG_ICON_SIZE } from "@/constants";
import { UserUpdateRoleForm } from ".";

const Btn: React.FC = () => {
	const intl = useIntl();
	const changeRole = intl.formatMessage({
		id: "9EZXpi",
		defaultMessage: "Change role",
	});

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
					<p>{changeRole}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};

export const UserUpdateRoleBtn: React.FC<{ user: User }> = ({ user }) => {
	const isDesktop = useMediaQuery("(min-width: 1024px)");
	const dispatch = useAppDispatch();

	const intl = useIntl();
	const updateUserRole = intl.formatMessage({
		id: "izivwa",
		defaultMessage: "Update user role",
	});
	const updateUserRoleDescription = intl.formatMessage({
		id: "M+yZJ8",
		defaultMessage: "Change the role of this user",
	});
	const updateAction = intl.formatMessage({
		id: "BWpuKl",
		defaultMessage: "Update",
	});

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
