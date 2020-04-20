interface IUserService {
    getPublicUser(id: string): Promise<GQL.PublicUser>;
    getUserByPasswordAndEmail(input: GQL.InputLogin): Promise<GQL.User>;
    getUserByToken(token: string): Promise<GQL.User>;
    registerUser(userInput: GQL.InputLogin): Promise<GQL.User>;
    createAIUser(): Promise<GQL.PublicUser>;
}

export { IUserService };