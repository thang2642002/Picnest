export interface IImage {
  image_id: string;
  url: string;
  title: string;
  categories_id: string;
}

export interface IImageUploadPayload {
  titles: string[];
  files: (File | null)[];
  categories_id: string;
}
