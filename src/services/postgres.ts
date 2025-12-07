// PostgreSQL Client Configuration
// Uses Railway DATABASE_URL environment variable

export function getPostgresConnection() {
  const connectionString = import.meta.env.VITE_DATABASE_URL || import.meta.env.DATABASE_URL;

  if (!connectionString) {
    console.warn(
      'DATABASE_URL or VITE_DATABASE_URL not configured. Running in demo mode.',
    );
    return null;
  }

  // Parse connection string for safe display (hide password)
  try {
    const url = new URL(connectionString);
    console.log(
      `Connected to PostgreSQL: ${url.hostname}:${url.port || 5432}/${url.pathname.slice(1)}`,
    );
  } catch (e) {
    console.error('Invalid DATABASE_URL format:', e);
  }

  return connectionString;
}

// Example usage in services
export async function executeDatabaseQuery(query: string, params?: unknown[]) {
  const connectionString = getPostgresConnection();

  if (!connectionString) {
    throw new Error('Database not configured');
  }

  try {
    // Example: Using built-in fetch API with Postgres REST API
    // Or implement with pg library: import { Pool } from 'pg'
    // const pool = new Pool({ connectionString });
    // return await pool.query(query, params);

    console.log('Query execution placeholder - implement with pg library or REST API');
    return null;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}
