import React from "react";
import { motion } from "framer-motion";
import { ChevronsRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LG_ICON_SIZE } from "@/constants";

export const DraggableNavButton: React.FC = () => {
	const [isDragging, setIsDragging] = React.useState(false);

	const handleDragStart = () => {
		setIsDragging(true);
	};

	const handleDragEnd = () => {
		setIsDragging(false);
	};

	const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (isDragging) e.stopPropagation();
	};

	return (
		<motion.div
			drag="y"
			dragConstraints={{ top: 0, bottom: window.innerHeight - 40 }}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onClick={handleClick}
		>
			<Button className="rounded-xl p-2 m-0 transition-opacity opacity-20 hover:opacity-70">
				<ChevronsRightIcon size={LG_ICON_SIZE} />
			</Button>
		</motion.div>
	);
};

export default DraggableNavButton;
