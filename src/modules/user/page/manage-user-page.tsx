import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAppSelector } from "@/store";
import { UserCreateDialog, UserPersonCard, UserSearchBar } from "..";

export const ManageUserPage: React.FC = () => {
	const userState = useAppSelector((s) => s.user.users);
	return (
		<ScrollArea className="h-[100vh] space-y-1 lg:space-y-4 py-4">
			<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3 px-3">
				<div className="col-span-full flex gap-3">
					<UserCreateDialog />
					<UserSearchBar />
				</div>
				{userState.map((u) => {
					return <UserPersonCard key={u.username} userPerson={u} />;
				})}
			</div>
		</ScrollArea>
	);
};
