import { Loader2Icon } from "lucide-react";
import React from "react";

export const LoaderPage: React.FC = () => {
	return (
		<div className="w-full h-full relative">
			<div className="absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2">
				<Loader2Icon size={24} className="animate-spin" />
			</div>
		</div>
	);
};

export default LoaderPage;
