import axios from 'axios';
import type { AuthResult, GetTokensRequestDTO, SignUpBody } from './type';

class AuthService {
  getTokens({ username, password }: GetTokensRequestDTO): Promise<string> {
    return axios
      .post<AuthResult>(
        '/signin',
        {
          email: username,
          password,
        },
        {
          baseURL: process.env.REACT_APP_API_BASE,
        }
      )
      .then((res) => res.data.token);
  }
  signUp({ email, password }: Omit<SignUpBody, 'commandId'>): Promise<string> {
    const commandId = process.env.REACT_APP_COMMAND_ID;
    return axios
      .post<AuthResult>(
        '/signup',
        {
          email,
          password,
          commandId,
        },
        {
          baseURL: process.env.REACT_APP_API_BASE,
        }
      )
      .then((res) => res.data.token);
  }
}

export default new AuthService();
