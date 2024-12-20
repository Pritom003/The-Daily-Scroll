
export  type TAuthor=
    {
        AuthorName: string;
        email: string;
        role: string;
      };

export type TBlog= {
  title: string;
  content: string;
  author?: TAuthor;
  isPublished: boolean;
}
