import * as mongoose from 'mongoose';

export const ExerciseSchema = new mongoose.Schema({
  userId: String,
  description: String,
  duration: Number,
  date: Date
});
