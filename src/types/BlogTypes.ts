export type BlogType = {
  title: string;
  description: string;
  image?: Blob;
  author: string;
  publish_date: string;
  categories: number[];
  email: string;
};
