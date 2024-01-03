import React from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Drawer,
	DrawerContent,
	DrawerDescription,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useTranslations } from "@/components/language-provider";
import { CreateBtn } from "@/modules";
import { useMediaQuery } from "@/hooks";
import { LoanCreateForm } from ".";

export const LoanCreateBtn: React.FC = () => {
	const translate = useTranslations();
	const loan = translate.loan();
	const createLoan = translate.createLoan();
	const createLoanDescription = translate.selectUserAndBook();

	const isDesktop = useMediaQuery("(min-width: 1024px)");

	if (isDesktop) {
		return (
			<Dialog>
				<DialogTrigger asChild>
					<div>
						<CreateBtn subject={loan} />
					</div>
				</DialogTrigger>
				<DialogContent className="max-h-[75vh] p-0">
					<ScrollArea className="max-h-[70vh]">
						<div className="p-6">
							<DialogHeader>
								<DialogTitle>{createLoan}</DialogTitle>
								<DialogDescription>{createLoanDescription}</DialogDescription>
							</DialogHeader>
							<LoanCreateForm />
						</div>
						<ScrollBar />
					</ScrollArea>
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<div>
					<CreateBtn subject={loan} />
				</div>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{createLoan}</DrawerTitle>
					<DrawerDescription>{createLoanDescription}</DrawerDescription>
				</DrawerHeader>
				<div className="p-3">
					<LoanCreateForm />
				</div>
			</DrawerContent>
		</Drawer>
	);
};
