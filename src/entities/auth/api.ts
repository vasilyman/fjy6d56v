import type { GetTokensRequestDTO } from './type';

class AuthService {
  getTokens({ username, password }: GetTokensRequestDTO): Promise<string> {
    return new Promise((res) => {
      console.log(`Wait token for ${username} ${password}`);
      setTimeout(() => {
        res(username + password);
      }, 500);
    });
  }
}

export default new AuthService();
