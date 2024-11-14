import { registerEnumType } from '@nestjs/graphql';

export enum Role {
  ESCULTOR = 'ESCULTOR',
  ADMIN = 'ADMIN',
  VISITANTE = 'VISITANTE',
}

registerEnumType(Role, {
  name: 'Role',
});
