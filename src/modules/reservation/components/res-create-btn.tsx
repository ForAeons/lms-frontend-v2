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
import { BookRoutes, ResRoutes, reservationApi } from "@/api";
import { useMediaQuery } from "@/hooks";
import { CreateBtn } from "@/modules";
import { ResCreateForm } from ".";

export const ResCreateDialog: React.FC = () => {
  const translate = useTranslations();
  const reservation = translate.reservation();
  const createRes = translate.createRes();
  const createResDescription = translate.selectUserAndBook();

  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();
  const createResMutation = useMutation({
    mutationKey: [ResRoutes.BASE, ResRoutes.BOOK.ROUTE, "new"],
    mutationFn: reservationApi.CreateResByBook,
    onSuccess: (data) => {
      setOpen(false);
      const loan = data!.data;
      queryClient.invalidateQueries({ queryKey: [ResRoutes.BASE] });
      queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
      toast.success(translate.Success(), {
        description: translate.createResSuccessDesc({
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
            <CreateBtn subject={reservation} />
          </div>
        </DialogTrigger>
        <DialogContent className="max-h-[75dvh] p-0">
          <ScrollArea className="max-h-[70dvh]">
            <div className="p-6">
              <DialogHeader>
                <DialogTitle>{createRes}</DialogTitle>
                <DialogDescription>{createResDescription}</DialogDescription>
              </DialogHeader>
              <ResCreateForm onSubmit={createResMutation.mutate} />
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
          <CreateBtn subject={reservation} />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{createRes}</DrawerTitle>
          <DrawerDescription>{createResDescription}</DrawerDescription>
        </DrawerHeader>
        <div className="p-3">
          <ResCreateForm
            onSubmit={createResMutation.mutate}
            disabled={createResMutation.isPending}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
