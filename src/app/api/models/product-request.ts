/* tslint:disable */
/* eslint-disable */
export interface ProductRequest {
  brand: string;
  count: number;
  description: string;
  discountPercentage?: number;
  images?: Array<Blob>;
  name: string;
  price: number;
  subCategoryId: string;
  type: string;
}
