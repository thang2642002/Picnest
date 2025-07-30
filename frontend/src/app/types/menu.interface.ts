import { ICategory } from "@/types/category.interface";

export interface IMenu {
  menu_id: string;
  name: string;
  slug: string;
}

export interface MenuPayload {
  name: string;
  slug: string;
}

export interface IMenuWithCategories extends IMenu {
  categories?: ICategory[];
}
