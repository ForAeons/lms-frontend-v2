import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useTranslations } from "@/components/language-provider";
import { CreateBtn } from "@/modules";
import { BookCreateNewForm, BookCreateExistingForm } from ".";

export const BookCreateBtn: React.FC = () => {
  const translate = useTranslations();
  const bookText = translate.book();
  const addNewBook = translate.addNewBook();
  const addCopiesOfBook = translate.addCopiesOfBook();

  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div>
          <CreateBtn subject={bookText} />
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[75dvh] p-0">
        <ScrollArea className="max-h-[70dvh]">
          <Tabs defaultValue="new">
            <div className="mx-6 mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="new">{addNewBook}</TabsTrigger>
                <TabsTrigger value="existing">{addCopiesOfBook}</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="new">
              <BookCreateNewForm setOpen={setOpen} />
            </TabsContent>

            <TabsContent value="existing">
              <BookCreateExistingForm setOpen={setOpen} />
            </TabsContent>
          </Tabs>
          <ScrollBar />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
