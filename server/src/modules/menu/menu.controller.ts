import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { getMenuItems, getMenuItemById } from './menu.service';
import { ApiResponse } from '../../utils/ApiResponse';

export const getAllMenu = asyncHandler(async (req: Request, res: Response) => {
  const { page, limit, category, search, isAvailable, branchId, isFeatured } = req.query;

  const result = await getMenuItems({
    page: page ? parseInt(page as string, 10) : undefined,
    limit: limit ? parseInt(limit as string, 10) : undefined,
    category: category as string,
    search: search as string,
    isAvailable: isAvailable ? isAvailable === 'true' : undefined,
    branchId: branchId as string,
    isFeatured: isFeatured ? isFeatured === 'true' : undefined,
  });

  res.json(ApiResponse.success(result, 'Menu items fetched successfully'));
});

export const getMenuById = asyncHandler(async (req: Request, res: Response) => {
  const item = await getMenuItemById(req.params.id as string);
  if (!item) {
    res.status(404);
    throw new Error('Menu item not found');
  }
  res.json(ApiResponse.success(item, 'Menu item fetched successfully'));
});
