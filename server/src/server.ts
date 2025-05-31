import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orders.js";
import paymentRoutes from "./routes/payments.js";
import { main } from "./seed.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  main();
  console.log(`Server running on port ${PORT}`);
});
