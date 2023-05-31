import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Expense } from './entities/expense.entity';

@ApiTags('Expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Post()
  @ApiOperation({ summary: 'Create expense' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 200,
    description: 'The created expense',
    type: Expense,
  })
  create(@Body() createExpenseDto: CreateExpenseDto) {
    return this.expensesService.create(createExpenseDto);
  }

  @Get()
  @ApiOperation({ summary: 'List expenses' })
  @ApiResponse({
    status: 200,
    description: 'Expenses matched by filter',
    type: [Expense],
  })
  findAll() {
    return this.expensesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Find an expense by ID',
  })
  @ApiResponse({ status: 404, description: 'Expense not found.' })
  @ApiResponse({ status: 200, type: Expense })
  findOne(@Param('id') id: string) {
    return this.expensesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an expense by ID' })
  @ApiResponse({
    status: 200,
    type: Expense,
    description: 'The updated expense',
  })
  update(@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {
    return this.expensesService.update(+id, updateExpenseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an expense by ID' })
  remove(@Param('id') id: string) {
    return this.expensesService.remove(+id);
  }
}
