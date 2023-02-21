import { WsException } from '@nestjs/websockets';

enum WsExceptionType {
  BadRequest = 'BadRequest',
  Unauthorized = 'Unauthorized',
  Unknown = 'Unknown',

  NotFound = 'NotFound',
}

export class WsTypeException extends WsException {
  readonly type: WsExceptionType;

  constructor(type: WsExceptionType, message: string | object) {
    const error = {
      type,
      message,
    };
    super(error);
    this.type = type;
  }
}

export class WsBadRequestException extends WsTypeException {
  constructor(message: string | object) {
    super(WsExceptionType.BadRequest, message);
  }
}

export class WsUnauthorizedException extends WsTypeException {
  constructor(message: string | object) {
    super(WsExceptionType.Unauthorized, message);
  }
}

export class WsUnknownException extends WsTypeException {
  constructor(message: string | object) {
    super(WsExceptionType.Unknown, message);
  }
}

export class WsNotFoundException extends WsTypeException {
  constructor(message: string | object) {
    super(WsExceptionType.NotFound, message);
  }
}
