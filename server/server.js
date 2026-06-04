import express from 'express';
import cors from 'cors';
import db from './db.js';

const app = express();

app.use(cors());
app.use(express.json());

/* 查詢全部 */
app.get('/products', (req, res) => {
  db.all(
    'SELECT * FROM products ORDER BY id DESC',
    [],
    (err, rows) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(rows);
      }
    }
  );
});

/* 新增 */
app.post('/products', (req, res) => {
  const { name, category, price } = req.body;

  db.run(
    'INSERT INTO products(name, category, price) VALUES (?, ?, ?)',
    [name, category, price],
    function (err) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({
          id: this.lastID,
          name,
          category,
          price,
        });
      }
    }
  );
});

/* 刪除 */
app.delete('/products/:id', (req, res) => {
  db.run(
    'DELETE FROM products WHERE id=?',
    [req.params.id],
    function (err) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json({ success: true });
      }
    }
  );
});

app.listen(3001, () => {
  console.log('Server running at http://localhost:3001');
});