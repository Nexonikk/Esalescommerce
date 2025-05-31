import { Request, Response } from "express";
import * as productService from "../services/product.service.js";

export const getAllProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getProductById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
