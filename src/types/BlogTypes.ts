export interface BlogType {
  title: string;
  description: string;
  image: Blob;
  author: string;
  publish_date: Date;
  categories: number[];
  email: string;
}
