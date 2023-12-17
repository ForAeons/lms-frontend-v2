import React from "react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/store";
import { UserCreateDialog, UserPersonCard, UserSearchBar } from "..";

export const ManageUserPage: React.FC = () => {
	const userState = useAppSelector((s) => s.user.users);
	return (
		<ScrollArea className="h-[100vh] space-y-1 lg:space-y-4 py-4">
			<div className="w-full relative flex flex-col gap-3 px-3">
				<div className="sticky top-0 z-10 bg-background flex justify-between">
					<UserCreateDialog />
					<UserSearchBar />
				</div>
				<Separator />
				{userState.map((u) => {
					return <UserPersonCard key={u.username} userPerson={u} />;
				})}
			</div>
		</ScrollArea>
	);
};
