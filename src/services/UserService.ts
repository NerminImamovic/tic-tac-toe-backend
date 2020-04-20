import {
    registerUser,
    getPublicUser,
    getUserByPasswordAndEmail,
    getUserByToken,
    createAIUser,
} from '../db';

import { IUserService } from './interfaces/IUserService';

class UserService implements IUserService {

  public async registerUser(userInput: GQL.InputLogin): Promise<GQL.User> {
    return registerUser(userInput);
  }

  public async getPublicUser(id: string): Promise<GQL.PublicUser> {
    return getPublicUser(id);
  }

  public async getUserByPasswordAndEmail(input: GQL.InputLogin): Promise<GQL.User> {
    return getUserByPasswordAndEmail(input);
  }

  public async getUserByToken(token: string): Promise<GQL.User> {
    return getUserByToken(token);
  }

  public async createAIUser(): Promise<GQL.PublicUser> {
    return createAIUser();
  }

}

export { UserService };
