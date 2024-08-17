import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [];

  findAll() {
    return this.users;
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id) || null;
  }

  create(user) {
    const newUser = { id: Date.now().toString(), ...user };
    this.users.push(newUser);
    return newUser;
  }

  removeItem(id: string): any {
    const index = this.users.findIndex((user) => user.id === id);
    if (index > -1) {
      return this.users.splice(index, 1)[0];
    }
    return null;
  }
}
