import { Field, InputType, ObjectType } from '@nestjs/graphql';

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
  phoneNumber?: string;

  @Field(() => String, { nullable: true })
  dni?: string;

  @Field(() => Date, { nullable: true })
  createdAt?: Date;

  @Field(() => Date, { nullable: true })
  updatedAt?: Date;
}

@ObjectType('UserAllObjectType')
@InputType('UserAllInputType')
export class UserAllObjectType extends UserObjectType {
  @Field(() => Number)
  id: number;
}