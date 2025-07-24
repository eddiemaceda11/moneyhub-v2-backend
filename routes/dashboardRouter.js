const { Router } = require('express');
const dashboardSinkingFundsRouter = Router();
const { pool } = require('../db/pool.js');

/* BUDGETS */

// Get All funds
dashboardSinkingFundsRouter.get('/sinking-funds', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM "SinkingFund"');

    if (rows.length === 0) {
      res.status(200).json({ message: 'No funds were found' });
    }

    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error || error.message });
  }
});

// Get fund by id
dashboardSinkingFundsRouter.get('/sinking-funds/:id', async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({ error: 'An id is required.' });
  }

  try {
    const { rows } = await pool.query(
      'SELECT * FROM "SinkingFund" WHERE id = $1',
      [id]
    );

    if (rows.length === 0) {
      res
        .status(200)
        .json({ message: `No results found for a fund with the id ${id}` });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error || error.message });
  }
});

// Create new fund
dashboardSinkingFundsRouter.post('/sinking-funds', async (req, res) => {
  const {
    id,
    userId,
    name,
    targetAmount,
    currentAmount,
    monthlyContribution,
    //targetDate,
    categoryIcon,
    isArchived,
    //createdAt,
    //updatedAt,
  } = req.body;

  if (!id) {
    res.status(400).json({ message: 'An id is required' });
  }

  if (!userId) {
    res.status(400).json({ message: 'A user id is required' });
  }

  if (!name) {
    res.status(400).json({ message: 'A name for the fund is required' });
  }

  if (!targetAmount) {
    res
      .status(400)
      .json({ message: 'A target amount for the fund is required' });
  }

  try {
    const fundCreated = await pool.query(
      'INSERT INTO "SinkingFund" Values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
      [
        id,
        userId,
        name,
        targetAmount,
        currentAmount,
        monthlyContribution,
        new Date(),
        categoryIcon,
        isArchived,
        new Date(),
        new Date(),
      ]
    );

    console.log(fundCreated);
    res.status(200).json({ message: 'Fund created', id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || err });
  }
});

// Edit fund
dashboardSinkingFundsRouter.put('/sinking-funds', async (req, res) => {});

// Delete Fund
dashboardSinkingFundsRouter.delete('/sinking-funds', async (req, res) => {
  const id = req.body.id;

  const deletedFund = await pool.query(
    'DELETE FROM "SinkingFund" WHERE id = $1',
    [id]
  );
  console.log(deletedFund);

  res.status(200).json({ message: 'Fund Deleted', id });
});

module.exports = { dashboardSinkingFundsRouter };

//////
// app.get('/dashboard/transactions', async (req, res) => {
//   try {
//     const { rows } = await pool.query(
//       'SELECT * FROM "Transaction" ORDER BY "date" DESC LIMIT 4'
//     );

//     if (rows.length === 0) {
//       res.status(404).json({ message: 'No transactions found' });
//     }

//     res.json(rows);
//   } catch (err) {
//     console.error('Error fetching transactions: ', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.get('/dashboard/budgets', async (req, res) => {
//   const { rows } = await pool.query('SELECT * FROM "Budgets"');

//   if (rows.length === 0) {
//     res.status(404).json({ message: 'No budgets found' });
//   }
// });
