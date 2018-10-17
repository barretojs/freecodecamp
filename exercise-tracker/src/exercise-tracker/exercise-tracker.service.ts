import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { Exercise } from './interfaces/exercise.interface';
import { UserDto } from './DTOs/user.dto';
import { ExerciseDto } from './DTOs/exercise.dto';
import { QueryDto } from './DTOs/query.dto';

@Injectable()
export class ExerciseTrackerService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Exercise') private readonly exerciseModel: Model<Exercise>
  ) {}

  async addExercise(body: ExerciseDto) {
    try {
      const user = await this.userModel.findById(body.userId);
      if (user) {
        let exercise: any = {
          description: body.description,
          duration: body.duration
        };

        if (isNaN(body.duration)) {
          return 'Invalid Duration';
        }

        if (body.date) {
          exercise.date = new Date(body.date);
        } else {
          exercise.date = new Date();
          exercise.date.setHours(0, 0, 0);
        }

        if (exercise.date == 'Invalid Date') {
          return 'Invalid Date';
        }

        this.userModel
          .findByIdAndUpdate(body.userId, {
            $push: { log: exercise }
          })
          .exec();

        exercise.userId = body.userId;
        const result = await this.exerciseModel.create(exercise);
        return {
          username: user.username,
          userId: result.userId,
          description: result.description,
          duration: result.duration,
          date: result.date.toUTCString()
        };
      }
    } catch (err) {
      return 'unknown userId';
    }
  }

  async addUser(body: UserDto): Promise<User | string> {
    const user = await this.userModel.find({ username: body.username });

    if (user.length) {
      return 'username already taken';
    }

    return this.userModel.create(body);
  }

  async logExercise(query: QueryDto) {
    try {
      const logQuery: any = { _id: query.userId };
      const limit = query.limit || 0;
      let count = 0;
      let filter = [];
      let to: any = new Date('3000-01-01'),
        from: any = new Date('1900-01-01');
      if (query.from) {
        from = new Date(query.from);
      }
      if (query.to) {
        to = new Date(query.to);
      }

      if (from == 'Invalid Date' || to == 'Invalid Date') {
        return 'Invalid Date';
      }

      if (isNaN(limit)) {
        return 'Invalid Limit';
      }

      let resp = await this.userModel.findById(logQuery._id);

      // resp.log.forEach((exercise: any) => {
      //   console.log(exercise);
      //   if (
      //     !(exercise.date >= from && exercise.date <= to) ||
      //     (count > limit && limit !== 0)
      //   ) {
      //     resp.log.splice(resp.log.indexOf(<never>exercise), 1);
      //   } else {
      //     exercise.date = exercise.date.toUTCString();
      //     count++;
      //   }
      // });

      for (let exercise of resp.log) {
        if (
          (<any>exercise).date >= from &&
          (<any>exercise).date <= to &&
          (count < limit || limit === 0)
        ) {
          (<any>exercise).date = (<any>exercise).date.toUTCString();
          filter.push(exercise);
          count++;
        }
      }

      return {
        _id: resp._id,
        username: resp.username,
        count: count,
        log: filter
      };
    } catch (err) {
      return 'unknown userId';
    }
  }
}
