import React from "react";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useTranslations } from "@/components/language-provider";
import { EditBtn } from "@/modules";
import { BookFormValues } from "@/schema";
import { BookRoutes, bookApi } from "@/api";
import { BookForm } from ".";

export const BookEditBtn: React.FC<{ book: Book }> = ({ book }) => {
  const translate = useTranslations();
  const updateBookDetails = translate.updateBookDetails();
  const updateBookDescription = translate.updateBookDesc();
  const saveAction = translate.Save();

  const defaultValues = {
    title: book.title,
    author: book.author,
    isbn: book.isbn,
    publisher: book.publisher,
    publication_date: new Date(book.publication_date),
    genre: book.genre,
    language: book.language,
  };

  const [open, setOpen] = React.useState(false);

  const queryClient = useQueryClient();
  const updateBookMutation = useMutation({
    mutationKey: [BookRoutes.BASE, book.id],
    mutationFn: bookApi.UpdateBook,
    onSuccess: (data) => {
      setOpen(false);

      const book = data!.data;
      queryClient.invalidateQueries({ queryKey: [BookRoutes.BASE] });
      queryClient.setQueryData([BookRoutes.BASE, book.id], book);

      toast.success(translate.Success(), {
        description: translate.updateBookSuccessDesc({ title: book.title }),
      });
    },
  });

  const onSubmit = (values: BookFormValues) => {
    updateBookMutation.mutate({
      ...values,
      id: book.id,
      publication_date: values.publication_date.toISOString(),
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <EditBtn />
        </div>
      </DialogTrigger>
      <DialogContent className="p-0">
        <ScrollArea className="max-h-[70dvh]">
          <div className="p-6">
            <DialogHeader>
              <DialogTitle>{updateBookDetails}</DialogTitle>
              <DialogDescription>{updateBookDescription}</DialogDescription>
            </DialogHeader>
            <BookForm
              defaultValues={defaultValues}
              onSubmit={onSubmit}
              action={saveAction}
              disabled={updateBookMutation.isPending}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
