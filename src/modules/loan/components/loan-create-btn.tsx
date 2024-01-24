import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { BookRoutes, LoanRoutes, loanApi } from "@/api";
import { useMediaQuery } from "@/hooks";
import { CreateBtn } from "@/modules";
import { LoanCreateForm } from ".";

export const LoanCreateBtn: React.FC = () => {
  const translate = useTranslations();
  const loan = translate.loan();
  const createLoan = translate.createLoan();
  const createLoanDescription = translate.selectUserAndBook();

  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();
  const createLoanMutation = useMutation({
    mutationKey: [LoanRoutes.BASE, LoanRoutes.BOOK.ROUTE, "new"],
    mutationFn: loanApi.CreateLoanByBook,
    onSuccess: (data) => {
      setOpen(false);
      const loan = data!.data;
      queryClient.invalidateQueries({ queryKey: [LoanRoutes.BASE] });
      queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
      toast.success(translate.Success(), {
        description: translate.createLoanDesc({
          title: loan.book.title,
          username: loan.user.username,
        }),
      });
    },
  });

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>
            <CreateBtn subject={loan} />
          </div>
        </DialogTrigger>
        <DialogContent className="max-h-[75dvh] p-0">
          <ScrollArea className="max-h-[70dvh]">
            <div className="p-6">
              <DialogHeader>
                <DialogTitle>{createLoan}</DialogTitle>
                <DialogDescription>{createLoanDescription}</DialogDescription>
              </DialogHeader>
              <LoanCreateForm
                onSubmit={createLoanMutation.mutate}
                disabled={createLoanMutation.isPending}
              />
            </div>
            <ScrollBar />
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
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
          <LoanCreateForm
            onSubmit={createLoanMutation.mutate}
            disabled={createLoanMutation.isPending}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
