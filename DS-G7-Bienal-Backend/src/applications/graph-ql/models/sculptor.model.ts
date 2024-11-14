import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { UserObjectType } from './user.model';

@ObjectType('SculptorObjectType')
@InputType('SculptorInputType')
export class SculptorObjectType {
  @Field(() => Number)
  userId: number;

  @Field(() => UserObjectType)
  user: UserObjectType;

  @Field(() => String, { nullable: true })
  obrasPrevias?: string;

  @Field(() => String, { nullable: true })
  biografia?: string;

  @Field(() => String, { nullable: true })
  qr?: string;
}
