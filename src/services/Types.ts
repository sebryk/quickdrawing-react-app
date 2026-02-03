export interface IImageData {
   results: IImage[];
}

export interface IImage {
   id: string;
   alt_description: string;
   urls: {
      thumb: string;
      regular: string;
   };
   user: {
      name: string;
      links: {
         html: string;
      };
   };
}

export interface QueryParams extends Record<string, string | number> {
   query: string;
   page: number;
   count: number;
}
