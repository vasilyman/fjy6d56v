import type { GetTokensRequestDTO, SignUpBody } from './type';
import { client } from 'src/app/apollo';
import { gql } from '@apollo/client';
import { Mutation } from 'src/app/apollo/type';
import { ErrorCode, ServerErrors } from '../apiError/type';
import { GraphQLFormattedError } from 'graphql';

const signinMutation = gql`
  mutation Mutation($username: String!, $password: String!) {
    profile {
      signin(email: $username, password: $password) {
        token
      }
    }
  }
`;

const signupMutation = gql`
  mutation Signup($email: String!, $password: String!, $commandId: String!) {
    profile {
      signup(email: $email, password: $password, commandId: $commandId) {
        token
      }
    }
  }
`;

class AuthService {
  async getTokens({ username, password }: GetTokensRequestDTO): Promise<string> {
    try {
      const { data } = await client.mutate<Pick<Mutation, 'profile'>, GetTokensRequestDTO>({
        mutation: signinMutation,
        variables: { username, password },
      });

      return data.profile.signin.token;
    } catch (error) {
      if ('graphQLErrors' in error) {
        const err: ServerErrors = {
          errors: (error.graphQLErrors ?? []).map((error: GraphQLFormattedError) => ({
            extensions: {
              code: error.extensions.code as ErrorCode,
            },
            message: error.message,
            stack: error.extensions.stacktrace.toString(),
          })),
        };
        return Promise.reject(err);
      } else {
        return Promise.reject(error);
      }
    }
  }
  async signUp({ email, password }: Omit<SignUpBody, 'commandId'>): Promise<string> {
    const commandId = process.env.REACT_APP_COMMAND_ID;
    try {
      const { data } = await client.mutate<Pick<Mutation, 'profile'>, SignUpBody>({
        mutation: signupMutation,
        variables: { email, password, commandId },
      });

      return data.profile.signin.token;
    } catch (error) {
      console.dir(error);
      if ('graphQLErrors' in error) {
        const err: ServerErrors = {
          errors: (error.graphQLErrors ?? []).map((error: GraphQLFormattedError) => ({
            extensions: {
              code: error.extensions.code as ErrorCode,
            },
            message: error.message,
            stack: error.extensions.stacktrace.toString(),
          })),
        };
        return Promise.reject(err);
      } else {
        return Promise.reject(error);
      }
    }
  }
}

export default new AuthService();
