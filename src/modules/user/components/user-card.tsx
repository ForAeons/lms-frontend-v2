import React from "react";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { UserDeleteBtn, UserEditDialog } from ".";

export const UserPersonCard: React.FC<{ userPerson: UserPerson }> = ({
	userPerson,
}) => {
	return (
		<Card>
			<CardHeader className="relative">
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
			<CardFooter className="flex justify-between gap-3">
				<UserEditDialog userPerson={userPerson} />
				<UserDeleteBtn userPerson={userPerson} />
			</CardFooter>
		</Card>
	);
};

export default UserPersonCard;
