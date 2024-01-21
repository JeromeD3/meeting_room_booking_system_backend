import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class InvokeRecordInterceptor implements NestInterceptor {
  private readonly logger = new Logger(InvokeRecordInterceptor.name);

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();

    const userAgent = request.headers['user-agent'];

    const { ip, method, path } = request;

    /**
     * 访问的 ip、user agent、请请求的 controller
     */
    this.logger.debug(
      `请求方法：${method} 、路径：${path} 、IP：${ip}、Agent： ${userAgent}、请求函数：${
        context.getClass().name
      }｜ ${context.getHandler().name} invoked...`,
    );

    /**
     * 当前登录用户
     */
    this.logger.debug(
      `当前登录用户ID: ${request.user?.userId}, 用户名：${request.user?.username}`,
    );

    const now = Date.now();

    /**
     * method，接口耗时、响应内容
     */
    return next.handle().pipe(
      tap((res) => {
        this.logger.debug(
          `方法：${method}、路径： ${path}、IP： ${ip}、Agent： ${userAgent} 、状态码: ${
            response.statusCode
          }: ${Date.now() - now}ms`,
        );
        this.logger.debug(`响应内容: ${JSON.stringify(res)}`);
      }),
    );
  }
}
