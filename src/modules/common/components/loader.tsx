import React from "react";
import { Loader2Icon } from "lucide-react";
import { LG_ICON_SIZE } from "@/constants";

export const LoaderPage: React.FC = () => {
	return (
		<div className="w-full h-full min-h-[80vh] relative">
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2">
				<Loader2Icon size={LG_ICON_SIZE} className="animate-spin" />
			</div>
		</div>
	);
};

export default LoaderPage;
