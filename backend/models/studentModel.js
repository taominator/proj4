const pool = require('../config/db.js');

class Student {
  static async create(student) {
    try {
      const { student_name, student_email, student_major, password } = student;

      const result = await pool.query(
        'SELECT * FROM create_student($1, $2, $3, $4)',
        [student_name, student_email, student_major, password]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const result = await pool.query('SELECT * FROM find_all_students()');
      console.log(result);
      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM find_student_by_id($1)', [id]);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const result = await pool.query('SELECT * FROM find_student_by_email($1)', [email]);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id, student) {
    try {
      const { student_name, student_email, student_major } = student;

      const result = await pool.query(
        'SELECT * FROM update_student($1, $2, $3, $4)',
        [id, student_name, student_email, student_major]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const result = await pool.query('SELECT * FROM delete_student($1)', [id]);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Student;