import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserObjectType } from './user.model';

@ObjectType('TokenObjectType')
@InputType('TokenInputType')
export class TokenObjectType {
  @Field(() => String, { nullable: true })
  token?: string;

  @Field(() => Date, { nullable: true })
  expiresAt?: Date;

  @Field(() => UserObjectType, { nullable: true })
  user?: UserObjectType;
}

@ObjectType('TokenAllObjectType')
@InputType('TokenAllInputType')
export class TokenAllObjectType extends TokenObjectType {
  @Field(() => Number)
  id: number;
}
