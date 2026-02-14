# URL Shortener Service

Production-ready URL shortening service with Express.js, PostgreSQL, and Cloudflare Tunnel support.

## Features

- ✅ Short URL generation with collision detection
- ✅ Click tracking
- ✅ Link management (list, stats, delete)
- ✅ XSS protection
- ✅ CORS support
- ✅ TypeScript
- ✅ Cloudflare Tunnel ready

## Prerequisites

- Node.js v18+
- PostgreSQL v12+
- (Optional) Cloudflare Tunnel for public access

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/hikmetgulsesli/url-shortener.git
   cd url-shortener
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and update:
   ```env
   DATABASE_URL=postgresql://your_user:your_password@localhost:5432/your_db
   PORT=3510
   BASE_URL=https://link.setrox.com.tr  # or http://localhost:3510 for local
   ```

4. **Initialize the database**
   ```sql
   CREATE TABLE short_links (
       id SERIAL PRIMARY KEY,
       code VARCHAR(20) UNIQUE NOT NULL,
       url TEXT NOT NULL,
       clicks INTEGER DEFAULT 0,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   CREATE INDEX idx_code ON short_links(code);
   ```

5. **Build and run**
   ```bash
   npm run build
   npm start
   ```

## Development

```bash
npm run dev
```

## Deployment

### Systemd Service

1. Copy `url-shortener.service` to `/etc/systemd/system/`
2. Update paths in the service file
3. Enable and start:
   ```bash
   sudo systemctl enable url-shortener
   sudo systemctl start url-shortener
   ```

### Cloudflare Tunnel

1. Update `cloudflared.yml`:
   - Set your credentials file path
   - Configure your hostname

2. Run the tunnel:
   ```bash
   cloudflared tunnel --config cloudflared.yml run
   ```

## Security Notes

- ✅ `.env` is excluded from git
- ✅ Frontend sanitizes user input (XSS protection)
- ✅ CORS enabled for API access
- ✅ PostgreSQL injection protection via parameterized queries
- ⚠️ Consider adding rate limiting for production use

## API Endpoints

- `POST /api/shorten` - Create short URL
- `GET /api/links` - List recent links (50 max)
- `GET /api/stats/:code` - Get link statistics
- `DELETE /api/links/:code` - Delete a link
- `GET /:code` - Redirect to original URL

## License

MIT
