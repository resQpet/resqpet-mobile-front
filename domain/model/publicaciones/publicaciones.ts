export interface Publicaciones {
  content: {
    id: number;
    createdAt: string;
    updatedAt: string;
    title: string;
    content: string;
    eventDate: string;
    images: {
      id: number;
      createdAt: string;
      updatedAt: string;
      imageUrl: string;
    }[];
    foundation: {
      id: number;
      createdAt: string;
      updatedAt: string;
      name: string;
      foundedDate: string;
      email: string;
      phone: string;
      website: string;
      memberCount: number;
      status: string;
      locations: {
        id: number;
        createdAt: string;
        updatedAt: string;
        country: string;
        city: string;
        address: string;
      }[];
    };
  }[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}
