import React from "react";
import { motion } from "framer-motion";
import { CircleIcon } from "lucide-react";
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
			drag="x"
			dragConstraints={{ left: 0, right: window.innerWidth - 40 }}
			onDragStart={handleDragStart}
			onDragEnd={handleDragEnd}
			onClick={handleClick}
		>
			<Button className="rounded-xl p-2 m-0 transition-opacity opacity-20 hover:opacity-50">
				<CircleIcon size={LG_ICON_SIZE} />
			</Button>
		</motion.div>
	);
};

export default DraggableNavButton;
