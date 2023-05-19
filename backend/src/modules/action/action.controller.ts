import { Controller, Get, Post, Body, Param, Delete, Query, Patch } from '@nestjs/common';
import { ActionService } from './action.service';
import { ActionModel } from './action.model';

@Controller('action')
export class ActionController {
  constructor(private readonly actionService: ActionService) { }

  @Post()
  create(@Body() newData: ActionModel, @Query('user_id') user_id: number) {
    return this.actionService.create(newData, user_id);
  }


  @Get()
  findAll(@Query('user_id') user_id: number) {
    return this.actionService.findAll(user_id);
  }


  @Get('dashboard')
  getForDashboard(@Query('user_id') user_id: number) {
    return this.actionService.getForDashboard(user_id);
  }


  @Get('done/:id')
  done(@Param('id') id: number) {
    return this.actionService.done(id);
  }


  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.actionService.findOne(id);
  }


  @Patch(':id')
  update(@Param('id') id: string, @Body() newData: any) {
    return this.actionService.update(+id, newData);
  }


  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.actionService.remove(+id);
  }
}
