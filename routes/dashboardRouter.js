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
  // Values needed -
});

// Edit fund
dashboardSinkingFundsRouter.put('/sinking-funds', async (req, res) => {});

// Delete Fund
dashboardSinkingFundsRouter.delete('/sinking-funds', async (req, res) => {});

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
