import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

export const CreateExpenseSchema = z.object({
  description: z.string().min(1).max(255),
  amount: z.number().min(0),
  date: z.coerce.date(),
});

export class CreateExpenseDto extends createZodDto(CreateExpenseSchema) {}
