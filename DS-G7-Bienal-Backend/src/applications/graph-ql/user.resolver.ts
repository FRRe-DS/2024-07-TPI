import { Query, Resolver } from '@nestjs/graphql';
import { UserAllObjectType } from './models/user.model';
import { UserRepository } from '@prisma';
import GraphQLJSON from 'graphql-type-json';

@Resolver(() => UserAllObjectType)
export class UserResolver {
  constructor(private readonly userRepository: UserRepository) {}

  //@Query(() => [UserAllObjectType])
  //async users(): Promise<UserAllObjectType[]> {
    //return this.userRepository.findAll();
  //}

  @Query(() => GraphQLJSON)
  exampleQuery(): any {
    return { key: "value" };
  }
  
}
