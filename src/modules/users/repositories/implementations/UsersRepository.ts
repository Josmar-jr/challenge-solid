import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    // Complete aqui
    const userAlreadyExists = this.users.find((user) => user.id === id);

    if (!userAlreadyExists) {
      throw new Error("User does not exists");
    }

    return userAlreadyExists;
  }

  findByEmail(email: string): User | undefined {
    // Complete aqui
    const emailAlreadyExists = this.users.find((user) => user.email === email);

    return emailAlreadyExists;
  }

  turnAdmin(receivedUser: User): User {
    // Complete aqui
    const user = this.users.find((item) => item.id === receivedUser.id);

    Object.assign(user, {
      admin: true,
      updated_at: new Date(),
    });

    const index = this.users.findIndex((item) => item.id === user.id);

    this.users[index] = user;

    return user;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
