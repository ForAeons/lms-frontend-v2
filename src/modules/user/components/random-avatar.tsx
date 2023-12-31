import React from "react";
import Avatar from "boring-avatars";
import { useMediaQuery } from "@/hooks";

export const RandomAvatar: React.FC<{ user: User }> = ({ user }) => {
	const isDesktop = useMediaQuery("(min-width: 1024px)");
	return (
		<Avatar
			size={isDesktop ? 160 : 80}
			name={user.username}
			variant="beam"
			colors={["#585D5D", "#E06F72", "#E7A17A", "#E4B17D", "#D1CBC0"]}
		/>
	);
};
