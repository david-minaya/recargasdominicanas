import { Page } from '../interfaces/page';

export function page(page: Page, count: number, data: any) {
  return {
    index: page.index,
    size: page.size,
    pages: Math.ceil(count / page.size),
    count: count,
    data: data
  }
}
