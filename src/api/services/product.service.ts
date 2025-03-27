import { sendDelete, sendGet, sendPatch, sendPost } from "../apiClient"
import { ConfigProductEndPoint } from "./contants"
import type { ICreateProduct, IUpdateProduct } from "@/interface/request/product"
import type { IProductListResponse, IProductResponse } from "@/interface/response/product"

// Create a new product
export const createProduct = async (payload: ICreateProduct): Promise<IProductResponse> => {
  const res = await sendPost(ConfigProductEndPoint.BASE, payload)
  return res
}

// Get all products
export const getAllProducts = async (params?: {
  page?: number
  take?: number
  search?: string
  categoryId?: string
  brandId?: string
  sellerId?: string
  isActive?: boolean
  isFeatured?: boolean
  minPrice?: number
  maxPrice?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}): Promise<IProductListResponse> => {
  const res = await sendGet(ConfigProductEndPoint.BASE, params)
  return res
}

// Get product by ID
export const getProductById = async (id: string): Promise<IProductResponse> => {
  const res = await sendGet(ConfigProductEndPoint.GET_BY_ID(id))
  return res
}

// Update product
export const updateProduct = async (id: string, payload: {
  name?: string;
  description?: string;
  imageUrl?: string;
  categoryId?: string;
  salePrice?: number | string;
  price?: number | string;
  stock?: number;
}): Promise<IProductResponse> => {
  const res = await sendPatch(ConfigProductEndPoint.UPDATE(id), payload)
  return res
}

// Delete product
export const deleteProduct = async (id: string): Promise<{ success: boolean }> => {
  const res = await sendDelete(ConfigProductEndPoint.DELETE(id))
  return res
}

