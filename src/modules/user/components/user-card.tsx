import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DeleteBtn } from "@/modules";
import {
	CheckPermission,
	deleteUserThunk,
	useAppDispatch,
	useAppSelector,
} from "@/store";
import { UserEditBtn, UserUpdateRoleBtn } from ".";
import { DELETE_USER, UPDATE_USER, UPDATE_USER_ROLE } from "@/constants";

export const UserPersonCard: React.FC<{ userPerson: UserPerson }> = ({
	userPerson,
}) => {
	const dispatch = useAppDispatch();
	const canUpdateUser = useAppSelector((s) => CheckPermission(s, UPDATE_USER));
	const canUpdateUserRole = useAppSelector((s) =>
		CheckPermission(s, UPDATE_USER_ROLE),
	);
	const canDeleteUser = useAppSelector((s) => CheckPermission(s, DELETE_USER));

	const handleDelete = () => dispatch(deleteUserThunk(userPerson.id));

	return (
		<Card className="relative hover:shadow-md transition-shadow pr-10">
			<div className="absolute h-full right-0 top-1/2 -translate-y-1/2 flex flex-col justify-around">
				{canUpdateUser && <UserEditBtn userPerson={userPerson} />}
				{canUpdateUserRole && <UserUpdateRoleBtn user={userPerson} />}
				{canDeleteUser && <DeleteBtn handler={handleDelete} subject="user" />}
			</div>

			<CardHeader>
				<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
					{userPerson.person_attributes.full_name}
				</h4>
				<p className="text-sm text-muted-foreground">@{userPerson.username}</p>
			</CardHeader>

			<CardContent>
				{userPerson.email && (
					<p className="leading-7">Email: {userPerson.email}</p>
				)}
				<p className="leading-7">
					Preferred Name: {userPerson.person_attributes.preferred_name}
				</p>
				<p className="text-sm text-muted-foreground">
					User ID: {userPerson.id}
				</p>
			</CardContent>
		</Card>
	);
};

export default UserPersonCard;
