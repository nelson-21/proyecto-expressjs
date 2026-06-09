const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('Password123!', 10);

  const users = [
    {
      name: 'Administrador',
      email: 'admin@ejemplo.com',
      password: hashedPassword,
      role: 'ADMIN'
    },
    {
      name: 'Usuario 1',
      email: 'usuario1@ejemplo.com',
      password: hashedPassword,
      role: 'USER'
    },
    {
      name: 'Usuario 2',
      email: 'usuario2@ejemplo.com',
      password: hashedPassword,
      role: 'USER'
    }
  ];

  const createdUsers = {};

  for (const user of users) {
    createdUsers[user.email] = await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        password: user.password,
        role: user.role
      },
      create: user
    });
  }

  await prisma.appointment.deleteMany();
  await prisma.timeBlock.deleteMany();

  const timeBlocksData = [
    {
      startTime: new Date('2026-06-01T09:00:00.000-06:00'),
      endTime: new Date('2026-06-01T10:00:00.000-06:00')
    },
    {
      startTime: new Date('2026-06-01T10:00:00.000-06:00'),
      endTime: new Date('2026-06-01T11:00:00.000-06:00')
    },
    {
      startTime: new Date('2026-06-02T14:00:00.000-06:00'),
      endTime: new Date('2026-06-02T15:00:00.000-06:00')
    },
    {
      startTime: new Date('2026-06-03T08:30:00.000-06:00'),
      endTime: new Date('2026-06-03T09:30:00.000-06:00')
    }
  ];

  const timeBlocks = [];

  for (const timeBlock of timeBlocksData) {
    const createdTimeBlock = await prisma.timeBlock.create({
      data: timeBlock
    });

    timeBlocks.push(createdTimeBlock);
  }

  const appointments = [
    {
      date: timeBlocks[0].startTime,
      userEmail: 'usuario1@ejemplo.com',
      timeBlockIndex: 0
    },
    {
      date: timeBlocks[1].startTime,
      userEmail: 'usuario2@ejemplo.com',
      timeBlockIndex: 1
    },
    {
      date: timeBlocks[2].startTime,
      userEmail: 'usuario1@ejemplo.com',
      timeBlockIndex: 2
    }
  ];

  for (const appointment of appointments) {
    await prisma.appointment.create({
      data: {
        date: appointment.date,
        user: {
          connect: { id: createdUsers[appointment.userEmail].id }
        },
        timeBlock: {
          connect: { id: timeBlocks[appointment.timeBlockIndex].id }
        }
      }
    });
  }

  console.log('Seed completado: usuarios, bloques de tiempo y citas creados.');
  console.log('Password demo para todos los usuarios: Password123!');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
