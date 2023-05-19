import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ActionItemService } from './action-item.service';

@Controller('action-item')
export class ActionItemController {
  constructor(private readonly actionItemService: ActionItemService) {}

  @Post()
  create(@Body() newData: any, @Query('user_id') user_id: number) {
    return this.actionItemService.create(newData, user_id);
  }


  @Get()
  findAll(@Query('user_id') user_id: number) {
    return this.actionItemService.findAll(user_id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.actionItemService.findOne(+id);
  }


  @Patch()
  update(@Body() newData: any) {
    return this.actionItemService.update(newData);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionItemService.remove(+id);
  }
}
