import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import orderRouter from "./routes/order.router.js";
import { errorHandler } from "./middlewares/error.handler.js";

export const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Servidor with Express is working");
});

app.use("/api/orders", orderRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
