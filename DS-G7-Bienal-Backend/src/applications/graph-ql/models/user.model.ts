import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { SculptorObjectType } from './sculptor.model';
import { Role } from './enumRole.model';
import { TokenAllObjectType } from './token.model';

@ObjectType('UserObjectType')
@InputType('UserInputType')
export class UserObjectType {
  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => String, { nullable: true })
  lastname?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  dni?: string;

  @Field(() => Role, { nullable: true })
  role?: Role;

  @Field(() => SculptorObjectType, { nullable: true })
  sculptor?: SculptorObjectType;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;

  @Field(() => [TokenAllObjectType], { nullable: true })
  tokens?: TokenAllObjectType[];
}

@ObjectType('UserAllObjectType')
@InputType('UserAllInputType')
export class UserAllObjectType extends UserObjectType {
  @Field(() => Number)
  id: number;
}
