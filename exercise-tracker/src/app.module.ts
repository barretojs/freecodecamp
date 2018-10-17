import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseTrackerModule } from './exercise-tracker/exercise-tracker.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ExerciseTrackerModule,
    MongooseModule.forRoot(
      'mongodb://adm:admadm00@ds027748.mlab.com:27748/exercise-tracker'
    )
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
