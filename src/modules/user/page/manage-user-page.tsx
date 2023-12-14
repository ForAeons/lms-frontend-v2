import React from "react";
import { useAppSelector } from "@/store";
import { UserCreateDialog, UserPersonCard, UserSearchBar } from "..";
import { Separator } from "@/components/ui/separator";

const ManageUserPage: React.FC = () => {
	const userState = useAppSelector((s) => s.user.users);
	return (
		<div className="w-full flex flex-col gap-3">
			<div className="flex justify-between">
				<UserCreateDialog />
				<UserSearchBar />
			</div>
			<Separator />
			{userState.map((u) => {
				return <UserPersonCard key={u.username} userPerson={u} />;
			})}
		</div>
	);
};

export default ManageUserPage;
