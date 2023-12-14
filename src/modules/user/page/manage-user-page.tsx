import React from "react";
import UserSearchBar from "../components/user-search-bar";
import { useAppSelector } from "@/store";

const ManageUserPage: React.FC = () => {
	const userState = useAppSelector((s) => s.user.users);
	return (
		<div className="w-full">
			ManageUserPage
			<UserSearchBar />
			{userState.map((u) => {
				return <div key={u.username}>{u.username}</div>;
			})}
		</div>
	);
};

export default ManageUserPage;
