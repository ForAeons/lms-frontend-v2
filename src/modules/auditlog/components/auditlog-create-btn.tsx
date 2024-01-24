import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
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
import { useTranslations } from "@/components/language-provider";
import { CreateBtn } from "@/modules";
import { AuditlogFormValues } from "@/schema";
import { useMediaQuery } from "@/hooks";
import { AuditLogRoutes, auditlogApi } from "@/api";
import { AuditLogForm } from ".";

export const LogCreateBtn: React.FC = () => {
  const translate = useTranslations();
  const auditLogText = translate.auditLog();
  const logAnEvent = translate.logAnEvent();
  const logAnEventDescription = translate.logEventDesc();
  const createAction = translate.Create();

  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();
  const createLogMutation = useMutation({
    mutationKey: [AuditLogRoutes.BASE],
    mutationFn: auditlogApi.CreateLog,
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: [AuditLogRoutes.BASE] });
      toast.success(translate.Success(), {
        description: translate.createLogDesc(),
      });
    },
  });

  const defaultValues = { action: "", date: new Date() };
  const onSubmit = (values: AuditlogFormValues) => {
    createLogMutation.mutate({ ...values, date: values.date.toISOString() });
  };

  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div>
            <CreateBtn subject={auditLogText} />
          </div>
        </DialogTrigger>
        <DialogContent className="max-h-[75dvh] p-0">
          <ScrollArea className="max-h-[70dvh]">
            <div className="p-6">
              <DialogHeader>
                <DialogTitle>{logAnEvent}</DialogTitle>
                <DialogDescription>{logAnEventDescription}</DialogDescription>
              </DialogHeader>
              <AuditLogForm
                defaultValues={defaultValues}
                onSubmit={onSubmit}
                action={createAction}
                disabled={createLogMutation.isPending}
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
          <CreateBtn subject={auditLogText} />
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{logAnEvent}</DrawerTitle>
          <DrawerDescription>{logAnEventDescription}</DrawerDescription>
        </DrawerHeader>
        <div className="p-3">
          <AuditLogForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            action={createAction}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
