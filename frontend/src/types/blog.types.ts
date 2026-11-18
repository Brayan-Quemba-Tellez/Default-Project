export interface BlogPost {
  id: string;
  author_id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  category: string;
  tags: string[];
  featured_image?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
  updated_at?: string;
}

export interface BlogPostCreatePayload {
  title: string;
  excerpt?: string;
  content: string;
  category: string;
  tags?: string[];
  featured_image?: string;
  is_published?: boolean;
}

export interface BlogPostUpdatePayload extends Partial<BlogPostCreatePayload> {}
