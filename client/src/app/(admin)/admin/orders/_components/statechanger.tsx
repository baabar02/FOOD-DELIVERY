"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { orderStatusType } from "../enum";

type NewType = orderStatusType;

type PropsType = {
  saveChangeAction: () => Promise<void>;
  statusHandlerAction: (_orderStatus: NewType) => void;
  orderStatus: orderStatusType;
  selectedOrderIds: string[];
};

export function StateChanger({
  saveChangeAction,
  statusHandlerAction,
  orderStatus,
  selectedOrderIds,
}: PropsType) {
  const handleSave = async () => {
    try {
      await saveChangeAction();
    } catch (error) {
      console.error("Failed to save changes:", error);
      alert("Failed to save changes. Please try again.");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild disabled={selectedOrderIds.length === 0}>
        <Button variant="secondary">Change delivery state</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change delivery state</DialogTitle>
        </DialogHeader>
        <div className="flex my-6 justify-evenly">
          <Button
            variant={
              orderStatus === orderStatusType.PENDING ? "default" : "outline"
            }
            onClick={() => statusHandlerAction(orderStatusType.PENDING)}
            aria-selected={orderStatus === orderStatusType.PENDING}
          >
            {orderStatusType.PENDING}
          </Button>
          <Button
            variant={
              orderStatus === orderStatusType.DELIVERED ? "default" : "outline"
            }
            onClick={() => statusHandlerAction(orderStatusType.DELIVERED)}
            aria-selected={orderStatus === orderStatusType.DELIVERED}
          >
            {orderStatusType.DELIVERED}
          </Button>
          <Button
            variant={
              orderStatus === orderStatusType.CANCELLED ? "default" : "outline"
            }
            onClick={() => statusHandlerAction(orderStatusType.CANCELLED)}
            aria-selected={orderStatus === orderStatusType.CANCELLED}
          >
            {orderStatusType.CANCELLED}
          </Button>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={handleSave}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
