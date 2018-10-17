import { Document } from 'mongoose';

export interface Exercise extends Document {
  userId: string;
  description: string;
  duration: number;
  date?: Date;
}
