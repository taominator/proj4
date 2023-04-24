const pool = require('../config/db.js');

class Employer {
  static async create(employer) {
    try {
      const { employer_name, employer_email, password } = employer;

      const result = await pool.query(
        'SELECT * FROM create_employer($1, $2, $3)',
        [employer_name, employer_email, password]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const result = await pool.query('SELECT * FROM find_all_employers()');

      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async findById(employer_id) {
    try {
      const result = await pool.query('SELECT * FROM find_employer_by_id($1)', [employer_id]);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const result = await pool.query('SELECT * FROM find_employer_by_email($1)', [email]);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id, employer) {
    try {
      const { employer_name, employer_email } = employer;

      const result = await pool.query(
        'SELECT * FROM update_employer($1, $2, $3)',
        [id, employer_name, employer_email]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const result = await pool.query('SELECT * FROM delete_employer($1)', [id]);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Employer;
