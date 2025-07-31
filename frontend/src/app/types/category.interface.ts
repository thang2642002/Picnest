export interface ICategory {
  categories_id: string;
  name: string;
  slug: string;
  slug_url?: string;
  menu_id: string;
}

export interface CategoryPayload {
  name: string;
  slug: string;
  slug_url?: string;
  menu_id: string;
}
