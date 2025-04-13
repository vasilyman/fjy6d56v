export type GetTokensRequestDTO = { username: string; password: string };

export type SignUpBody = {
  email: string;
  password: string;
  commandId: string;
};

export type AuthResult = {
  token: string;
};
