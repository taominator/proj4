const pool = require('../config/db.js');

class Application {
  static async create(application) {
    try {
      const { a_student_id, a_job_id, application_status } = application;

      const result = await pool.query(
        'SELECT * FROM create_application($1, $2, $3)',
        [a_student_id, a_job_id, application_status]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const result = await pool.query('SELECT * FROM find_all_applications()');

      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async findStudentAll(studentId) {
    try {
      const result = await pool.query('SELECT * FROM get_student_applications($1)', [studentId]);

      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async findJobAll(jobId) {
    try {
      const result = await pool.query('SELECT * FROM find_job_all_applications($1)', [jobId]);

      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async findById(studentId, jobId) {
    try {
      const result = await pool.query('SELECT * FROM find_application_by_ids($1, $2)', [studentId, jobId]);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(studentId, jobId, application) {
    try {
      const { application_status } = application;

      const result = await pool.query(
        'SELECT * FROM update_application($1, $2, $3)',
        [studentId, jobId, application_status]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async delete(studentId, jobId) {
    try {
      const result = await pool.query('SELECT * FROM delete_application($1, $2)', [studentId, jobId]);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Application;
