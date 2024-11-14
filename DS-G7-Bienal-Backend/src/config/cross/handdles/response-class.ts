import {
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { DataInterface, ResponseInterface } from '@interfaces';
import { DataObjectType, ResponseObjectType } from '@graph-ql';

export abstract class ResponseClass {
  protected success<T>(
    payload: T,
    data: DataInterface[] = [],
  ): ResponseInterface<T> {
    return { code: HttpStatus.OK, payload, data };
  }
  protected successGQL<T>(
    payload: T,
    data: DataObjectType[] = [],
    message?: string,
  ): ResponseObjectType<T> {
    return { code: HttpStatus.OK, payload, data, message };
  }
  protected create<T>(
    payload: T,
    data: DataInterface[] = [],
  ): ResponseInterface<T> {
    return { code: HttpStatus.CREATED, payload, data };
  }

  protected createGQL<T>(
    payload: T,
    data: DataObjectType[] = [],
  ): ResponseObjectType<T> {
    return { code: HttpStatus.CREATED, payload, data };
  }

  protected accepted<T>(
    payload: T,
    data: DataInterface[] = [],
  ): ResponseInterface<T> {
    return { code: HttpStatus.ACCEPTED, payload, data };
  }

  protected acceptedGQL<T>(
    payload: T,
    data: DataObjectType[] = [],
  ): ResponseObjectType<T> {
    return { code: HttpStatus.ACCEPTED, payload, data };
  }

  protected noContent<T>(data: DataInterface[] = []): ResponseInterface<T> {
    return {
      code: HttpStatus.NO_CONTENT,
      message: '',
      payload: undefined,
      data,
    };
  }

  protected noContentGQL<T>(
    data: DataObjectType[] = [],
  ): ResponseObjectType<T> {
    return {
      code: HttpStatus.NO_CONTENT,
      message: '',
      payload: undefined,
      data,
    };
  }

  protected badRequest<T>(
    payload: T,
    description = MESSAGE_DEFAULT[HttpStatus.BAD_REQUEST],
  ): never {
    throw new BadRequestException(payload, description);
  }

  protected unauthorized<T>(
    payload: T,
    description = MESSAGE_DEFAULT[HttpStatus.UNAUTHORIZED],
  ): never {
    throw new UnauthorizedException(payload, description);
  }

  protected notFound<T>(
    payload: T,
    description = MESSAGE_DEFAULT[HttpStatus.NOT_FOUND],
  ): never {
    throw new NotFoundException(payload, description);
  }

  protected forbidden<T>(
    payload: T,
    description = MESSAGE_DEFAULT[HttpStatus.FORBIDDEN],
  ): never {
    throw new ForbiddenException(payload, description);
  }

}
export const MESSAGE_DEFAULT = {
  100: 'Continue',
  101: 'Switching Protocols',
  102: 'Processing',
  103: 'Earlyhints',
  200: 'Success',
  201: 'Create',
  202: 'Accepted',
  203: 'Non Authoritative Information',
  204: 'No Content',
  205: 'Reset Content',
  206: 'Partial Content',
  300: 'Ambiguous',
  301: 'Moved Permanently',
  302: 'Found',
  303: 'See Other',
  304: 'Not Modified',
  307: 'Temporary Redirect',
  308: 'Permanent Redirect',
  400: 'Bad Request',
  401: 'Unauthorized',
  402: 'Payment Required',
  403: 'Forbiden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  407: 'Proxy Authentication Required',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  411: 'Length Required',
  412: 'Precondition Failed',
  413: 'Payload Too Large',
  414: 'URI Too Long',
  415: 'Unsupported Media Type',
  416: 'Requested Range Not Satisfiable',
  417: 'Expectation Failed',
  418: 'I Am a Teapot',
  421: 'Misdirected',
  422: 'Unprocessable Enntity',
  424: 'Failed Dependency',
  428: 'Precondition Required',
  429: 'Too Many Requests',
  500: 'Internnal Server Error',
  501: 'Not Implemented',
  502: 'Bad Geteway',
  503: 'Service Unavailable',
  504: 'Geteway Timeout',
  505: 'HTTP Version Not Supprted',
};
