import type { CreateOrder, PaginationOrder, UpdateOrder } from "@repo/types";
import { count, desc, eq } from "drizzle-orm";
import type { Request, Response } from "express";
import { db } from "../db/client.js";
import { order } from "../db/schema.js";

export const getOrders = async (_: Request, res: Response) => {
  const { page, limit, status } = res.locals.query as PaginationOrder;

  const whereCondition =
    status === "ALL" ? undefined : eq(order.status, status);

  const orders = await db.query.order.findMany({
    where: whereCondition,
    limit: limit,
    offset: (page - 1) * limit,
    orderBy: desc(order.createdAt),
  });

  const totalOrdersResult = await db
    .select({ count: count() })
    .from(order)
    .where(whereCondition);

  const totalOrders = totalOrdersResult[0]?.count || 0;
  const totalPages = Math.ceil(totalOrders / limit);

  return res.status(200).json({
    orders,
    pagination: {
      page,
      limit,
      totalPages,
      totalOrders,
    },
  });
};

export const createOrder = async (req: Request, res: Response) => {
  const data = req.body as CreateOrder;

  const orders = await db
    .insert(order)
    .values({
      customerName: data.customerName,
      item: data.item,
      quantity: data.quantity,
      status: data.status,
    })
    .returning();

  const newOrder = orders[0];

  return res.status(201).json(newOrder);
};

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const orderFound = await db.query.order.findFirst({
    where: eq(order.id, id!),
  });

  if (!orderFound) {
    return res.status(404).json({ message: `Order with id ${id} not found` });
  }

  return res.status(200).json(orderFound);
};

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body as UpdateOrder;

  const updatedOrder = await db
    .update(order)
    .set(data)
    .where(eq(order.id, id!))
    .returning();

  if (!updatedOrder[0]) {
    return res.status(404).json({ message: `Order with id ${id} not found` });
  }

  return res.status(200).json(updatedOrder[0]);
};

export const deleteOrder = async (req: Request, res: Response) => {
  const { id } = req.params;

  const deletedOrder = await db
    .delete(order)
    .where(eq(order.id, id!))
    .returning();

  if (!deletedOrder[0]) {
    return res.status(404).json({ message: `Order with id ${id} not found` });
  }

  return res
    .status(200)
    .json({ message: `Order with id ${id} was deleted successfully` });
};
