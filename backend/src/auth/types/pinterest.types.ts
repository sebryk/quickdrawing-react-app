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
