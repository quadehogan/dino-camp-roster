import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

// GET all campers
app.get('/api/campers', async (req, res) => {
  const result = await pool.query('SELECT * FROM campers ORDER BY id');
  res.json(result.rows);
});

// GET a single camper by id
app.get('/api/campers/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query('SELECT * FROM campers WHERE id = $1', [id]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Camper not found' });
  }
  res.json(result.rows[0]);
});

// PUT update a camper's username
app.put('/api/campers/:id', async (req, res) => {
  const { id } = req.params;
  const { username } = req.body;
  const result = await pool.query(
    'UPDATE campers SET username = $1 WHERE id = $2 RETURNING *',
    [username, id]
  );
  if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Camper not found' });
  }
  res.json(result.rows[0]);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
