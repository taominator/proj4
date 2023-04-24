const pool = require('../config/db.js');

class Job {
  static async create(job) {
    try {
      const { job_title, job_description, job_employer_id } = job;

      const result = await pool.query(
        'SELECT * FROM create_job($1, $2, $3)',
        [job_title, job_description, job_employer_id]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findAll() {
    try {
      const result = await pool.query('SELECT * FROM find_all_jobs()');

      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async findEmployerJobs(id) {
    try {
      const result = await pool.query('SELECT * FROM find_employer_jobs($1)', [id]);

      return result.rows;
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM find_job_by_id($1)', [id]);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async update(id, job) {
    try {
      const { job_title, job_description, job_employer_id } = job;

      const result = await pool.query(
        'SELECT * FROM update_job($1, $2, $3, $4)',
        [id, job_title, job_description, job_employer_id]
      );

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const result = await pool.query('SELECT * FROM delete_job($1)', [id]);

      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }

  static async findAllWithEmployers() {
    try {
      const result = await pool.query('SELECT * FROM get_all_jobs_with_employers()');

      return result.rows;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Job;
