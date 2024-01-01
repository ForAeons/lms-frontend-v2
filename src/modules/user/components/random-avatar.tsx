import React from "react";
import Avatar from "boring-avatars";
import { useMediaQuery } from "@/hooks";
import { AVATAR_COLORS } from "@/constants";

export const RandomAvatar: React.FC<{ user: User }> = ({ user }) => {
	const isDesktop = useMediaQuery("(min-width: 1024px)");
	return (
		<Avatar
			size={isDesktop ? 160 : 80}
			name={user.username}
			variant="beam"
			colors={AVATAR_COLORS}
		/>
	);
};
