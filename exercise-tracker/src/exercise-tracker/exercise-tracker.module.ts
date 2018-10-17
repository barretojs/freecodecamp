import { Module } from '@nestjs/common';
import { ExerciseTrackerController } from './exercise-tracker.controller';
import { ExerciseTrackerService } from './exercise-tracker.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { ExerciseSchema } from './schemas/exercise.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Exercise', schema: ExerciseSchema }
    ])
  ],
  controllers: [ExerciseTrackerController],
  providers: [ExerciseTrackerService]
})
export class ExerciseTrackerModule {}
