import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "../components/ui/button";
import { X } from "lucide-react";
import { API_URL } from "@/utils/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createOrderSchema,
  type CreateOrderFormInput,
  type CreateOrderFormOutput,
  type Order,
} from "@repo/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DialogContentForm } from "./dialog-content-form";

export function DialogRowTable({ order }: { order: Order }) {
  const deleteOrder = async (id: string) => {
    await fetch(`${API_URL}/orders/${id}`, { method: "DELETE" });
  };

  const queryClient = useQueryClient();

  const mutationDeleteOrder = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const form = useForm<CreateOrderFormInput, undefined, CreateOrderFormOutput>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      customerName: order.customerName,
      item: order.item,
      quantity: order.quantity,
      status: order.status,
    },
  });

  const updateOrder = async (orderData: CreateOrderFormOutput) => {
    await fetch(`${API_URL}/orders/${order.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
  };

  const mutationUpdateOrder = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const onSubmit = (values: CreateOrderFormOutput) => {
    mutationUpdateOrder.mutate(values);
  };

  return (
    <Dialog key={order.id}>
      <DialogTrigger asChild>
        <TableRow>
          <TableCell>{order.id}</TableCell>
          <TableCell>{order.customerName}</TableCell>
          <TableCell>{order.item}</TableCell>
          <TableCell>{order.quantity}</TableCell>
          <TableCell>{order.status}</TableCell>
          <TableCell>
            <Button
              onClick={() => {
                mutationDeleteOrder.mutate(order.id);
              }}
              size="icon-sm"
              variant="ghost"
            >
              <X />
            </Button>
          </TableCell>
        </TableRow>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Order information</DialogTitle>
          <DialogDescription>
            {new Date(order.createdAt).toLocaleDateString("en-EN", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </DialogDescription>
        </DialogHeader>
        <DialogContentForm
          form={form}
          onSubmit={onSubmit}
          buttonTitle="Save"
          isPending={mutationUpdateOrder.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
