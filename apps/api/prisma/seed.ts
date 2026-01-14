import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const board = await prisma.board.create({
    data: {
      name: 'Demo Board'
    }
  });

  await prisma.column.createMany({
    data: [
      { name: 'To Do', position: 1, boardId: board.id },
      { name: 'In Progress', position: 2, boardId: board.id },
      { name: 'Done', position: 3, boardId: board.id }
    ]
  });

  const firstColumn = await prisma.column.findFirst({
    where: { boardId: board.id, position: 1 }
  });

  if (firstColumn) {
    await prisma.card.createMany({
      data: [
        { title: 'Set up project', description: 'Initialize monorepo', position: 1, columnId: firstColumn.id },
        { title: 'Build UI skeleton', description: null, position: 2, columnId: firstColumn.id }
      ]
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
