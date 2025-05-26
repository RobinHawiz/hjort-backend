import Database from "better-sqlite3";
import bcrypt from "bcrypt";

async function createAdminUser() {
  try {
    const db = new Database("db/hjort.db");
    const payload = {
      username: "example",
      passwordHash: "example",
      email: "example.example@email.com",
      firstName: "example",
      lastName: "example",
    };

    // Validate payload
    for (const key in payload) {
      if (!payload[key]) {
        console.error(
          "Invalid input, send username, passwordHash, email, firstName and lastName"
        );
        return;
      }
    }

    // Check if user exist
    const checkStatement = db.prepare(
      `select * from admin_user where username = @username`
    );
    const row = checkStatement.get({ username: payload.username });
    if (!!row) {
      console.error("User already exists!");
      return;
    }

    // Hash password
    payload.passwordHash = await bcrypt.hash(payload.passwordHash, 10);

    // Correct - save user
    const insertStatement =
      db.prepare(`insert into admin_user (username, passwordHash, email, first_name, last_name)
                  values(@username, @passwordHash, @email, @firstName, @lastName)`);
    insertStatement.run(payload);

    console.log("User created");
  } catch (error) {
    console.error("Database user insertion error:", error);
  }
}

createAdminUser();
