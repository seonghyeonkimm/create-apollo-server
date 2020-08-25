import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const newProduct = await prisma.product.create({
    data: {
      name: 'createProduct',
      options: {
        create: [{ name: 'option 1' }],
      },
      tags: {
        create: [{ name: 'tag 1' }],
      },
    },
    include: {
      tags: true,
      options: true,
    },
  });

  console.log('########################');
  console.log('newProduct: ', newProduct);

  const updateProduct = await prisma.product.update({
    where: { id: newProduct.id },
    data: {
      name: 'updateProduct',
    },
    include: {
      tags: true,
      options: true,
    },
  });

  console.log('########################');
  console.log('updateProduct: ', updateProduct);

  await prisma.productTag.deleteMany({});
  await prisma.productOption.deleteMany({});
  await prisma.product.deleteMany({});
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
