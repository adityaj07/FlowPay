import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FC } from "react";

interface ConfirmDialogueProps {
  confirmTrigger: string | JSX.Element;
  confirmHeading?: string;
  confirmDesc?: string;
  buttons: JSX.Element[];
}

const ConfirmDialogue: FC<ConfirmDialogueProps> = ({
  confirmTrigger,
  confirmHeading,
  confirmDesc,
  buttons,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">{confirmTrigger}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{confirmHeading}</DialogTitle>
          <DialogDescription>{confirmDesc}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-4 w-[80%] mx-auto mt-3 md:w-full md:mt-0 md:mx-0 md:gap-2">
          {buttons.map((Button) => Button)}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialogue;
