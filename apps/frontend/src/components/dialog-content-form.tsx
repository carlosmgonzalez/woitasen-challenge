import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { UseFormReturn } from "react-hook-form";
import type { CreateOrderFormInput, CreateOrderFormOutput } from "@repo/types";
import { LoaderCircle } from "lucide-react";

interface Props {
  form: UseFormReturn<CreateOrderFormInput, undefined, CreateOrderFormOutput>;
  onSubmit: (values: CreateOrderFormOutput) => void;
  buttonTitle: string;
  isPending: boolean;
}

export function DialogContentForm({
  form,
  onSubmit,
  buttonTitle,
  isPending,
}: Props) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Costumer name</FormLabel>
                  <FormControl>
                    <Input placeholder="Carlos Gonzalez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="item"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item name</FormLabel>
                  <FormControl>
                    <Input placeholder="Socks" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="2"
                      type="text"
                      inputMode="numeric"
                      value={
                        typeof field.value === "string" ||
                        typeof field.value === "number"
                          ? field.value
                          : ""
                      }
                      onChange={(event) => {
                        const next = event.target.value;
                        if (next === "" || /^\d+$/.test(next)) {
                          field.onChange(next === "" ? "" : next);
                        }
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select status order" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Status Order</SelectLabel>
                          <SelectItem value="PENDING">PENDING</SelectItem>
                          <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                          <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit">
            {isPending ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <p>{buttonTitle}</p>
            )}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
}
