import {
  CourseEntity,
  CoursePayload,
  CourseMenuPayload,
  CourseMenuEntity,
  CourseUpdatePayload,
} from "../../models/courseMenuEntity";
import { CourseMenuRepo } from "./courseMenuRepo";

export class SQLiteCourseMenuRepo implements CourseMenuRepo {
  constructor(
    private readonly dbConnection: import("better-sqlite3").Database
  ) {}

  async findAllCourseMenus(): Promise<Array<CourseMenuEntity>> {
    const rows = this.dbConnection
      .prepare(
        `select id, title, price_tot as priceTot from course_menu 
         order by id ASC`
      )
      .all() as Array<CourseMenuEntity>;
    return rows;
  }

  async updateCourseMenu(
    id: string,
    payload: CourseMenuPayload
  ): Promise<void> {
    try {
      const statement = this.dbConnection.prepare(
        `update course_menu 
         set title = @title, price_tot = @priceTot
         where id = @id`
      );
      statement.run({ ...payload, id });
      return Promise.resolve();
    } catch (error) {
      console.error("Database insertion error:", error);
      throw error;
    }
  }

  async existsCourseMenu(id: string): Promise<boolean> {
    try {
      const statement = this.dbConnection.prepare(
        `select * from course_menu where id = @id`
      );
      const row = !!statement.get({ id });
      return Promise.resolve(row);
    } catch (error) {
      console.error("Database lookup error:", error);
      throw error;
    }
  }

  async findAllCoursesByMenuId(
    courseMenuId: string
  ): Promise<Array<CourseEntity>> {
    const rows = this.dbConnection
      .prepare(
        `select id, course_menu_id as courseMenuId, name, type from course 
         where course_menu_id = @courseMenuId
         order by id ASC`
      )
      .all({ courseMenuId }) as Array<CourseEntity>;
    return rows;
  }

  async insertCourse(payload: CoursePayload): Promise<void> {
    try {
      const statement = this.dbConnection
        .prepare(`insert into course (course_menu_id, name, type)
                  values(@courseMenuId, @name, @type)`);
      statement.run(payload);
      return Promise.resolve();
    } catch (error) {
      console.error("Database insertion error:", error);
      throw error;
    }
  }

  async updateCourse(id: string, payload: CourseUpdatePayload): Promise<void> {
    try {
      const statement = this.dbConnection.prepare(
        `update course 
         set name = @name, type = @type
         where id = @id`
      );
      statement.run({ ...payload, id });
      return Promise.resolve();
    } catch (error) {
      console.error("Database update error:", error);
      throw error;
    }
  }
  async deleteCourseById(id: string): Promise<void> {
    try {
      const statement = this.dbConnection.prepare(
        `delete from course where id = @id`
      );
      statement.run({ id });
      return Promise.resolve();
    } catch (error) {
      console.error("Database deletion error:", error);
      throw error;
    }
  }
  async existsCourse(id: string): Promise<boolean> {
    try {
      const statement = this.dbConnection.prepare(
        `select * from course where id = @id`
      );
      const row = !!statement.get({ id });
      return Promise.resolve(row);
    } catch (error) {
      console.error("Database lookup error:", error);
      throw error;
    }
  }
}
