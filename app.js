const express = require('express');
// const { PrismaClient } = require('@prisma/client');

const app = express();
// const prisma = new PrismaClient();
const { prisma } = require('./prismaClient');
app.use(express.json());

app.get('/', async (req, res) => {
  const transactions = await prisma.transaction.findMany({});

  console.log(transactions);
  res.end();
});

app.listen(3010, () => {
  console.log('Server running on PORT 3010');
});
