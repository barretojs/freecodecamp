export interface QueryDto {
  readonly userId: string;
  readonly from?: string;
  readonly to?: string;
  readonly limit?: number;
}
