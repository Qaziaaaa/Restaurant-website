import { z } from 'zod';

export const createOrderSchema = z.object({
  body: z.object({
    deliveryAddress: z.object({
      street: z.string().min(3),
      city: z.string().min(2),
      state: z.string().min(2),
      zipCode: z.string().min(3),
      country: z.string().min(2),
    }),
    items: z
      .array(
        z.object({
          menuItem: z.string(),
          nameSnapshot: z.string(),
          quantity: z.number().min(1),
          priceSnapshot: z.number(),
          selectedAddons: z.array(z.object({ name: z.string(), price: z.number() })).optional(),
          selectedVariant: z.object({ name: z.string(), price: z.number() }).optional(),
          itemTotal: z.number().optional(),
        })
      )
      .optional(),
  }),
});
