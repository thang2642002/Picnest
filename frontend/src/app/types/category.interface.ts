export interface ICategory {
  categories_id: string;
  name: string;
  slug: string;
  menu_id: string;
}

export interface CategoryPayload {
  name: string;
  slug: string;
  menu_id: string;
}
