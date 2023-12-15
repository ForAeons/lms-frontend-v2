import React from "react";
import { Separator } from "@/components/ui/separator";
import { useAppSelector } from "@/store";
import { UserCreateDialog, UserPersonCard, UserSearchBar } from "..";
import { ScrollArea } from "@/components/ui/scroll-area";

const ManageUserPage: React.FC = () => {
	const userState = useAppSelector((s) => s.user.users);
	return (
		<ScrollArea className="h-[calc(100vh-104px)]">
			<div className="w-full relative flex flex-col gap-3 pr-3">
				<div className="sticky top-0 z-50 bg-background flex justify-between">
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

export default ManageUserPage;
