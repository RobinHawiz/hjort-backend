import BetterSqlite3 from "better-sqlite3";
import Database from "better-sqlite3";
import path from "path";

/**
 * Connects to a SQLite database.
 *
 * @returns A SQLite database connection
 * @throws If the database connection failed
 */
export function connectToSQLiteDb(): BetterSqlite3.Database {
  try {
    const dbConnection = new Database(
      path.resolve(__dirname, "../db/hjort.db"),
      { verbose: console.log }
    );
    // enable FK constraints for this connection
    dbConnection.pragma("foreign_keys = ON");
    return dbConnection;
  } catch (err) {
    console.error("Database connection failed:", err);
    throw err;
  }
}
