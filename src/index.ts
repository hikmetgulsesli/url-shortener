import express, { Request, Response } from 'express';
import path from 'path';
import { nanoid } from 'nanoid';
import pool from './db';

const app = express();
const PORT = process.env.PORT || 3510;
const BASE_URL = process.env.BASE_URL || 'http://localhost:3510';

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// POST /api/shorten - Create short URL
app.post('/api/shorten', async (req: Request, res: Response) => {
  try {
    const { url } = req.body;
    
    if (!url || typeof url !== 'string') {
      return res.status(400).json({ error: 'URL is required' });
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    const code = nanoid(6);
    
    const result = await pool.query(
      'INSERT INTO short_links (code, url) VALUES ($1, $2) RETURNING code',
      [code, url]
    );

    const shortUrl = `${BASE_URL}/${result.rows[0].code}`;
    res.json({ code: result.rows[0].code, shortUrl });
  } catch (error) {
    console.error('Error creating short URL:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/links - List recent links
app.get('/api/links', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      'SELECT id, code, url, clicks, created_at FROM short_links ORDER BY created_at DESC LIMIT 50'
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching links:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/stats/:code - Get link stats
app.get('/api/stats/:code', async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    
    const result = await pool.query(
      'SELECT code, url, clicks, created_at FROM short_links WHERE code = $1',
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/links/:code - Delete link
app.delete('/api/links/:code', async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    
    const result = await pool.query(
      'DELETE FROM short_links WHERE code = $1 RETURNING code',
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Link not found' });
    }

    res.json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error('Error deleting link:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /:code - Redirect to original URL
app.get('/:code', async (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    
    // Skip API routes
    if (code.startsWith('api/') || code === 'api') {
      return res.status(404).send('Not found');
    }

    const result = await pool.query(
      'UPDATE short_links SET clicks = clicks + 1 WHERE code = $1 RETURNING url',
      [code]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('<h1>404 - Link not found</h1>');
    }

    res.redirect(302, result.rows[0].url);
  } catch (error) {
    console.error('Error redirecting:', error);
    res.status(500).send('Internal server error');
  }
});

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`URL Shortener service running on port ${PORT}`);
});
