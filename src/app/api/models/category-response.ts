/* tslint:disable */
/* eslint-disable */
import { SubCategoryResponse } from './sub-category-response';
export interface CategoryResponse {
  id?: string;
  name?: string;
  subCategories?: Array<SubCategoryResponse>;
}
