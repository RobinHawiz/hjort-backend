import Database from "better-sqlite3";
import dotenv from "dotenv";
dotenv.config();

// Connect
const db = new Database(process.env.DATABASE);

// -----Create tables-----

// Create table admin_user
db.exec("drop table if exists admin_user");

db.exec(`CREATE TABLE admin_user(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        passwordHash TEXT NOT NULL,
        email TEXT NOT NULL,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL
        )`);

// Create table reservation
db.exec("drop table if exists reservation");

db.exec(`CREATE TABLE reservation(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        first_name TEXT NOT NULL,
        last_name TEXT NOT NULL,
        phone_number TEXT NOT NULL,
        email TEXT NOT NULL,
        message TEXT NOT NULL,
        guest_amount INTEGER NOT NULL,
        reservation_date TEXT NOT NULL
        )`);

// Create table course_menu
db.exec("drop table if exists course_menu");

db.exec(`CREATE TABLE course_menu(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        price_tot INTEGER NOT NULL
        )`);

// Create table course
db.exec("drop table if exists course");

db.exec(`CREATE TABLE course(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        course_menu_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        type TEXT NOT NULL,
        FOREIGN KEY(course_menu_id) REFERENCES course_menu(id)
        ON DELETE CASCADE 
        )`);

// Create table drink_menu
db.exec("drop table if exists drink_menu");

db.exec(`CREATE TABLE drink_menu(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        subtitle TEXT NOT NULL,
        price_tot INTEGER NOT NULL
        )`);

// Create table drink
db.exec("drop table if exists drink");

db.exec(`CREATE TABLE drink(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        drink_menu_id INTEGER NOT NULL,
        name TEXT NOT NULL,
        FOREIGN KEY(drink_menu_id) REFERENCES drink_menu(id)
        ON DELETE CASCADE 
        )`);

// -----Insert course_menu and drink_menu data-----

db.exec(`INSERT INTO course_menu(title, price_tot)
                          values('Avsmakningsmeny', 3500)`);

db.exec(`INSERT INTO drink_menu(title, subtitle, price_tot)
                         values('Vinlista', 'Alkoholfritt dryckespaket', 1050)`);

db.exec(`INSERT INTO drink_menu(title, subtitle, price_tot)
                         values('', 'Vinpaket', 2450)`);

console.log("Installation was successful...");
