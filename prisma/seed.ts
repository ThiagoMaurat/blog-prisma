import { prisma } from "@/lib/prisma";

async function main() {
  await prisma.role.create({
    data: {
      name: "admin",
      id: "1",
    },
  });

  await prisma.role.create({
    data: {
      name: "reader",
      id: "2",
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
