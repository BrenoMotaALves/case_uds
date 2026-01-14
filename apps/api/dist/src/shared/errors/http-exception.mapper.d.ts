import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class HttpExceptionMapper implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost): void;
}
