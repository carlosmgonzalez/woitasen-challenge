import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import {
  createOrderSchema,
  type CreateOrderFormInput,
  type CreateOrderFormOutput,
} from "@repo/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { API_URL } from "@/utils/constants";
import { DialogContentForm } from "./dialog-content-form";

interface Props {
  setOrderStatusFilter: (value: string) => void;
}

export function DialogNewOrder({ setOrderStatusFilter }: Props) {
  const form = useForm<CreateOrderFormInput, undefined, CreateOrderFormOutput>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      customerName: "",
      item: "",
      quantity: 1,
      status: "PENDING",
    },
  });

  const postOrder = async (orderData: CreateOrderFormOutput) => {
    await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: postOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  const onSubmit = (values: CreateOrderFormOutput) => {
    mutation.mutate(values);
    form.reset();
    setOrderStatusFilter("ALL");
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New order</Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        aria-describedby="Digalo for create a new order"
      >
        <DialogHeader>
          <DialogTitle>Create a new order</DialogTitle>
        </DialogHeader>
        <DialogContentForm
          form={form}
          onSubmit={onSubmit}
          buttonTitle="Create"
          isPending={mutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
