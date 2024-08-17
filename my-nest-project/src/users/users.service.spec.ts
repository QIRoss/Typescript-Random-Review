import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all users', () => {
    const users = service.findAll();
    expect(users).toBeInstanceOf(Array);
  });

  it('should return a single user by ID', () => {
    const createdUser = service.create({ name: 'John Doe', age: 30 });
    const user = service.findOne(createdUser.id);
    expect(user).toBeDefined();
    expect(user?.name).toEqual('John Doe');
  });

  it('should return null for non-existent user', () => {
    const user = service.findOne('999');
    expect(user).toBeNull();
  });

  it('should create a new user', () => {
    const user = { name: 'Jane Doe', age: 25 };
    service.create(user);
    const users = service.findAll();
    expect(users).toContainEqual(expect.objectContaining(user));
  });
});
