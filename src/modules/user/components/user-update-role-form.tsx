import React from "react";
import { FormattedMessage } from "react-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { UserRoleSchema } from "@/schema";
import { ROLE_SELECT_OPTIONS } from "@/constants";
import { useTranslations } from "@/hooks";

export const UserUpdateRoleForm: React.FC<{
	onSubmit: UnaryHandler<z.infer<typeof UserRoleSchema>>;
	action: string;
}> = ({ onSubmit, action }) => {
	const translate = useTranslations();
	const roleSelection = translate.roleSelection();
	const selectRolePlaceholder = translate.selectRolePlaceholder();

	const form = useForm<z.infer<typeof UserRoleSchema>>({
		resolver: zodResolver(UserRoleSchema),
	});

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
				<FormField
					control={form.control}
					name="role_id"
					render={({ field }) => (
						<FormItem>
							<FormLabel>{roleSelection}</FormLabel>
							<Select
								onValueChange={(v) => field.onChange(Number(v))}
								defaultValue={String(field.value)}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder={selectRolePlaceholder} />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{ROLE_SELECT_OPTIONS.map((opt) => {
										return (
											<SelectItem key={opt.id} value={String(opt.id)}>
												<FormattedMessage
													id={opt.intlID}
													defaultMessage={opt.label}
												/>
											</SelectItem>
										);
									})}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<DialogFooter>
					<Button type="submit">{action}</Button>
				</DialogFooter>
			</form>
		</Form>
	);
};
