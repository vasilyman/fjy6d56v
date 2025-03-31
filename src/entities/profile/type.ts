export type TProfile = {
  id: string;
  username: string;
  about?: string;
  firstname?: string;
  lastname?: string;
};

export type TUpdateProfileDTO = Partial<TProfile>;
