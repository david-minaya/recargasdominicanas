export interface IPage<T> {
  index: number;
  page: number;
  size: number;
  pages: number;
  count: number;
  total: number;
  data: T[];
}
