export interface ExerciseDto {
  readonly userId: string;
  readonly description: string;
  readonly duration: number;
  readonly date?: Date;
}
