import type { GetTokensRequestDTO } from './type';

class TokenService {
  getTokens({ username, password }: GetTokensRequestDTO): Promise<string> {
    return new Promise((res) => {
      console.log(`Wait token for ${username} ${password}`);
      setTimeout(() => {
        res(username + password);
      }, 500);
    });
  }
}

export default new TokenService();
