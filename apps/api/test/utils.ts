import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { AppModule } from '../src/app.module';

const prisma = new PrismaClient();

export async function createTestingApp(): Promise<INestApplication> {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule]
  }).compile();

  const app = moduleRef.createNestApplication();
  await app.init();
  return app;
}

export async function resetDatabase(): Promise<void> {
  await prisma.card.deleteMany();
  await prisma.column.deleteMany();
  await prisma.board.deleteMany();
}

export async function disconnectDatabase(): Promise<void> {
  await prisma.$disconnect();
}
