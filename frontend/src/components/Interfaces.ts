//a list of interfaces for static typing

export interface PostInterface {
    category: number;
    colour_scheme: string;
    created_at: string;
    description: string;
    front_image: string;
    id: number;
    likes: number;
    title: string;
  }
  
  export interface SettingsInterface {
    id: number;
    name: string;
    value: string;
  }
  export interface CategoryInterface {
    id: number;
    category_name : string;
  }
  
  export interface GalleryImageInterface {
    id: number;
    image: string;
  }
  
  export interface AvatarInterface {
    id: number;
    avatar: string;
  }
