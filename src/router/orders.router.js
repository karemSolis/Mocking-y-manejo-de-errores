import { Router } from "express";
import { getOrders, getOrdersById, createOrder, resolveOrder } from "../controllers/orders.controller.js";



const ordersRouter = Router();

ordersRouter.get("/", getOrders);
ordersRouter.post("/", createOrder);
ordersRouter.get("/:oid", getOrdersById);
ordersRouter.get("/:oid", resolveOrder);

export default ordersRouter;
