import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { SocketWithAuth } from '../games/games.types';
import {
  WsBadRequestException,
  WsNotFoundException,
  WsTypeException,
} from './ws-exceptions';

@Catch()
export class WsCatchAllFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const socket: SocketWithAuth = host.switchToWs().getClient();

    if (exception instanceof NotFoundException) {
      const exceptionData = exception.getResponse();

      const message =
        exceptionData['message'] ?? exceptionData ?? exception.name;

      const wsException = new WsNotFoundException(message);
      socket.emit('exception', wsException.getError());
      return;
    }

    if (exception instanceof BadRequestException) {
      const exceptionData = exception.getResponse();

      const message =
        exceptionData['message'] ?? exceptionData ?? exception.name;

      const wsException = new WsBadRequestException(message);
      socket.emit('exception', wsException.getError());
      return;
    }

    if (exception instanceof WsTypeException) {
      socket.emit('exception', exception.getError());
      return;
    }

    const wsException = new WsBadRequestException(exception.message);
    socket.emit('exception', wsException.getError());
  }
}
