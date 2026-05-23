import MenuItem, { IMenuItem } from '../../models/MenuItem';
import Category from '../../models/Category';
import mongoose from 'mongoose';

interface GetMenuParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  isAvailable?: boolean;
  branchId?: string;
  isFeatured?: boolean;
}

export const getMenuItems = async (params: GetMenuParams) => {
  const { page = 1, limit = 10, category, search, isAvailable, branchId, isFeatured } = params;

  const query: Record<string, any> = {};

  if (category) {
    query.category = category; // Assuming category is ObjectId passed as string
  }

  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  if (isAvailable !== undefined) {
    query.availability = isAvailable;
  }

  if (branchId) {
    query.branchAvailability = branchId;
  }

  if (isFeatured !== undefined) {
    query.featuredFlag = isFeatured;
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    MenuItem.find(query).skip(skip).limit(limit).populate('category', 'name slug').lean(),
    MenuItem.countDocuments(query),
  ]);

  return {
    items,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getMenuItemById = async (id: string) => {
  const item = await MenuItem.findById(id).populate('category', 'name slug').lean();
  return item;
};

export const createMenuItem = async (data: any) => {
  const item = await MenuItem.create(data);
  return item;
};

export const updateMenuItem = async (id: string, data: any) => {
  const item = await MenuItem.findByIdAndUpdate(id, data, { new: true });
  return item;
};

export const deleteMenuItem = async (id: string) => {
  await MenuItem.findByIdAndDelete(id);
};
