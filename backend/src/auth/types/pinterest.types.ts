export type PinterestTokenResponse = {
   access_token: string;
   refresh_token?: string;
   token_type: string;
   scope?: string;
   expires_in?: number;
};

export type PinterestUserResponse = {
   id?: string;
   username?: string;
   account_type?: string;
   profile_image?: string;
};

export type PinterestPinMediaImageVariant = {
   url?: string;
   width?: number;
   height?: number;
};

export type PinterestPinMedia = {
   images?: Record<string, PinterestPinMediaImageVariant>;
   image_cover_url?: string;
};

export type PinterestPinResponse = {
   id: string;
   title?: string | null;
   description?: string | null;
   link?: string | null;
   created_at?: string | null;
   media?: PinterestPinMedia | null;
   [key: string]: unknown;
};

export type PinterestPinsListResponse = {
   items?: PinterestPinResponse[];
   bookmark?: string | null;
};
