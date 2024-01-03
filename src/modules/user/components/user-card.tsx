import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DeleteBtn } from "@/modules";
import {
	CheckPermission,
	deleteUserThunk,
	useAppDispatch,
	useAppSelector,
} from "@/store";
import { DELETE_USER, UPDATE_USER, UPDATE_USER_ROLE } from "@/constants";
import { useTranslations } from "@/hooks";
import { RandomAvatar, UserEditBtn, UserUpdateRoleBtn } from ".";

export const UserPersonCard: React.FC<{ userPerson: UserPerson }> = ({
	userPerson,
}) => {
	const translate = useTranslations();
	const dispatch = useAppDispatch();
	const canUpdateUser = useAppSelector((s) => CheckPermission(s, UPDATE_USER));
	const canUpdateUserRole = useAppSelector((s) =>
		CheckPermission(s, UPDATE_USER_ROLE),
	);
	const canDeleteUser = useAppSelector((s) => CheckPermission(s, DELETE_USER));

	const handleDelete = () => dispatch(deleteUserThunk(userPerson.id));

	const userText = translate.user();

	return (
		<Card className="relative flex flex-col lg:flex-row hover:shadow-md transition-shadow pr-10">
			<div className="absolute h-full right-0 top-1/2 -translate-y-1/2 flex flex-col justify-around items-center">
				{canUpdateUser && <UserEditBtn userPerson={userPerson} />}
				{canUpdateUserRole && <UserUpdateRoleBtn user={userPerson} />}
				{canDeleteUser && (
					<DeleteBtn handler={handleDelete} subject={userText} />
				)}
			</div>

			<CardHeader className="p-6 pb-0 pr-6 lg:pb-6 lg:pr-0">
				<RandomAvatar user={userPerson} />
			</CardHeader>

			<CardContent className="p-6">
				<h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
					{userPerson.person_attributes.preferred_name ??
						userPerson.person_attributes.full_name}
				</h4>
				<p className="text-sm text-muted-foreground">@{userPerson.username}</p>
			</CardContent>
		</Card>
	);
};

export default UserPersonCard;
