export interface Publicaciones {
  content: {
    id: number;
    createdAt: string;
    updatedAt: string;
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
      logo:string;
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
    title: string;
    content: string;
    eventDate: string;
    animal:{
      createdAt:string;
      updateAt:string;
      name:string;
      species:string;
      gender:string;
      ageMounths:number;
      size:string;
      color:string;
      status:string
    }[];
    images: {
      id: number;
      createdAt: string;
      updatedAt: string;
      imageUrl: string;
    }[];
  }[];
  page: {
    size: number;
    number: number;
    totalElements: number;
    totalPages: number;
  };
}
