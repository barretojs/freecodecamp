import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { ExerciseTrackerService } from './exercise-tracker.service';
import { UserDto } from './DTOs/user.dto';
import { ExerciseDto } from './DTOs/exercise.dto';
import { QueryDto } from './DTOs/query.dto';

@Controller('api/exercise')
export class ExerciseTrackerController {
  constructor(
    private readonly exerciseTrackerService: ExerciseTrackerService
  ) {}

  @Post('add')
  async addExercise(@Body() body: ExerciseDto) {
    return this.exerciseTrackerService.addExercise(body);
  }

  @Post('new-user')
  async addUser(@Body() body: UserDto) {
    return this.exerciseTrackerService.addUser(body);
  }

  @Get('log')
  async logExercise(@Query() query: QueryDto) {
    return this.exerciseTrackerService.logExercise(query);
  }
}
