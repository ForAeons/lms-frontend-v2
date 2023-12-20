import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DeleteBtn } from "@/modules";
import { deleteUserThunk, useAppDispatch } from "@/store";
import { UserEditDialog } from ".";

export const UserPersonCard: React.FC<{ userPerson: UserPerson }> = ({
	userPerson,
}) => {
	const dispatch = useAppDispatch();
	const handleDelete = () => dispatch(deleteUserThunk(userPerson.id));
	return (
		<Card className="relative border-none hover:shadow-md transition-shadow pr-10">
			<div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col items-end">
				<DeleteBtn handler={handleDelete} subject="user" />
				<UserEditDialog userPerson={userPerson} />
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
				<p className="leading-7">
					Language: {userPerson.person_attributes.language_preference}
				</p>
				<p className="text-sm text-muted-foreground">
					User ID: {userPerson.id}
				</p>
			</CardContent>
		</Card>
	);
};

export default UserPersonCard;
