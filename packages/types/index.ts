import * as z from "zod";

export const createOrderSchema = z
  .object({
    customerName: z.string().min(3).trim(),
    item: z.string().min(3).trim(),
    quantity: z.coerce.number().int().positive().min(1),
    status: z.enum(["PENDING", "COMPLETED", "CANCELLED"]),
  })
  .strict();
export type CreateOrder = z.infer<typeof createOrderSchema>;
export type CreateOrderFormInput = z.input<typeof createOrderSchema>;
export type CreateOrderFormOutput = z.output<typeof createOrderSchema>;

export const updateOrderSchema = createOrderSchema.partial();
export type UpdateOrder = z.infer<typeof updateOrderSchema>;

export const paginationOrderSchema = z.object({
  page: z.coerce
    .number()
    .positive("Page must be a positive number.")
    .default(1),
  limit: z.coerce
    .number()
    .positive("Limit must be a positive number.")
    .default(10),
  status: z.enum(["PENDING", "COMPLETED", "CANCELLED", "ALL"]).default("ALL"),
});
export type PaginationOrder = z.infer<typeof paginationOrderSchema>;

export interface GetOrdersData {
  orders: Order[];
  pagination: Pagination;
}

export interface Order {
  id: string;
  customerName: string;
  item: string;
  quantity: number;
  status: "COMPLETED" | "CANCELLED" | "PENDING";
  createdAt: Date;
}

export interface Pagination {
  page: number;
  limit: number;
  totalPages: number;
  totalOrders: number;
}
