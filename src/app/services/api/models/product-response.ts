/* tslint:disable */
/* eslint-disable */
import { BrandResponse } from './brand-response';
import { CategoryResponse } from './category-response';
import { SubCategoryResponse } from './sub-category-response';
export interface ProductResponse {
  brand?: BrandResponse;
  category?: CategoryResponse;
  count?: number;
  description?: string;
  discountPercentage?: number;
  id?: string;
  imageUrls?: Array<string>;
  name?: string;
  price?: number;
  subCategory?: SubCategoryResponse;
  type?: string;
}
