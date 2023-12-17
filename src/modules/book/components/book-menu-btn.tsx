import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { LG_ICON_SIZE } from "@/constants";

export const BookMenuBtn: React.FC<{ book: Book }> = ({ book }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="ghost"
					className="absolute m-0 p-2 rounded-full right-2"
				>
					<MoreVerticalIcon size={LG_ICON_SIZE} />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="min-w-fit">
				<DropdownMenuItem>
					<Button variant="destructive" className="m-0 p-2 rounded-full">
						<TrashIcon size={LG_ICON_SIZE} />
					</Button>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Button className="m-0 p-2 rounded-full">
						<PencilIcon size={LG_ICON_SIZE} />
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
