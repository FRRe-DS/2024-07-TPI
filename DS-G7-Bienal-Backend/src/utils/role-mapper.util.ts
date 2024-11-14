import { Role as PrismaRole } from '@prisma/client';
import { Role as GraphQLRole } from '../applications/graph-ql/models/enumRole.model';

export function mapPrismaRoleToGraphQLRole(prismaRole: PrismaRole): GraphQLRole {
  switch (prismaRole) {
    case "ESCULTOR":
      return GraphQLRole.ESCULTOR;
    case "ADMIN":
      return GraphQLRole.ADMIN;
    case "VISITANTE":
      return GraphQLRole.VISITANTE;
    default:
      throw new Error(`Unknown role: ${prismaRole}`);
  }
}
