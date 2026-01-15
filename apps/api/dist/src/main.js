"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
const http_exception_mapper_1 = require("./shared/errors/http-exception.mapper");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true
    }));
    app.useGlobalFilters(new http_exception_mapper_1.HttpExceptionMapperFilter());
    if (process.env.NODE_ENV !== 'production') {
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Mini Kanban API')
            .setDescription('API REST para gerenciamento de Boards, Columns e Cards')
            .setVersion('1.0.0')
            .addTag('health')
            .addTag('boards')
            .addTag('columns')
            .addTag('cards')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup('docs', app, document);
    }
    const port = process.env.PORT ? Number(process.env.PORT) : 3000;
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map