import { Router } from "express";
import {
  createOrderSchema,
  paginationOrderSchema,
  updateOrderSchema,
} from "@repo/types";
import {
  validateBodySchema,
  validateQuerySchema,
  validateUUID,
} from "../middlewares/validations.js";
import { catchAsync } from "../middlewares/error.handler.js";
import {
  createOrder,
  deleteOrder,
  getOrderById,
  getOrders,
  updateOrder,
} from "../controllers/order.controller.js";

const router: Router = Router();

router.get(
  "/",
  validateQuerySchema(paginationOrderSchema),
  catchAsync(getOrders),
);

router.post(
  "/",
  validateBodySchema(createOrderSchema),
  catchAsync(createOrder),
);

router.get("/:id", validateUUID, catchAsync(getOrderById));

router.put(
  "/:id",
  [validateUUID, validateBodySchema(updateOrderSchema)],
  catchAsync(updateOrder),
);

router.delete("/:id", validateUUID, catchAsync(deleteOrder));

export default router;
