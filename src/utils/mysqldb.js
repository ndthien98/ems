const mysql = require('mysql');

const MYSQL_URL = process.env.MYSQL_URL

const pool = mysql.createPool(MYSQL_URL);

const logMySQLQuerry = (sql, params) => {
  console.log('SQL: ',
    mysql.format(sql, params)
      .replace(/\r?\n|\r/g, ' ') // xoá dấu xuống dòng
      .split(' ').filter(e => e !== '').join(' ')); // loại bỏ khoảng trắng thừa kiểu như này 'SELECT     * FROM     WHERE   ' 
}

pool.query('SELECT * FROM 1==1'); // test connection 
pool.on('connection', function (connection) {
  console.log('Connected to mysql db ' + MYSQL_URL);
});


/**
 * Get Connecttion
 */
const getConnection = async () => new Promise((resolve, reject) => {
  pool.getConnection((err, connection) => {
    if (err) {
      return reject(err);
    }
    return resolve(connection);
  });
});

/**
 * Begin Transaction
 */
const beginTransaction = async () => {
  const connection = await getConnection();
  return new Promise((resolve, reject) => {
    connection.beginTransaction((err) => {
      if (err) {
        connection.release();
        return reject(err);
      }
      return resolve(connection);
    });
  });
};

/**
 * Rollback Transaction
 */
const rollbackTransaction = async transaction => new Promise((resolve, reject) => {
  console.log('rollback')
  transaction.rollback((err) => {
    transaction.release();
    if (err) {
      console.log('err while rollback',err)
      return reject(err);
    }
    return resolve();
  });
});

/**
 * Commit Transaction
 */
const commitTransaction = async transaction => new Promise((resolve, reject) => {
  transaction.commit(async (errCommit) => {
    if (errCommit) {
      console.log('errCommit',errCommit)
      try {
        await rollbackTransaction(transaction);
      } catch (errorRollback) {
        console.log('errorRollback',errorRollback)
        return reject(Object.assign(errCommit, { errorRollback }));
      }
      return reject(errCommit);
    }
    transaction.release();
    return resolve();
  });
});

/**
 *
 * @param {string} sql
 * @param {array} params
 */
const queryMulti = async (sql, params, transaction) => {
  logMySQLQuerry(sql, params);
  return new Promise((resolve, reject) => {
    if (!transaction)
      pool.query(sql, params, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    else {
      transaction.query(sql, params, (error, results) => {
        if (error) {
          transaction.rollback((err) => {
            console.log('rollback in commit')
            transaction.release();
            if (err) {
              console.log('err while rollback in commit',err)
              // return reject(err);
            }
            // return resolve();
          });
          return reject(error);
        }
        return resolve(results);
      });
    }
  });
};

/**
 *
 * @param {string} sql
 * @param {array} params
 */
const queryOne = async (sql, params, transaction) => {
  const results = await queryMulti(sql, params, transaction);
  return results[0];
};

/**
 *
 * @param {string} sql
 * @param {array} params
 */
const queryNone = async (sql, params, transaction) => {
  logMySQLQuerry(sql, params);
  return new Promise((resolve, reject) => {
    if (!transaction) {
      pool.query(sql, params, (error, results) => {
        if (error) {
          return reject(error);
        }
        return resolve(results);
      });
    } else {
      transaction.query(sql, params, (error, results) => {
        if (error) {
          transaction.rollback((err) => {
            console.log('rollback in commit')
            transaction.release();
            if (err) {
              console.log('err while rollback in commit',err)
              // return reject(err);
            }
            // return resolve();
          });
          return reject(error);
        }
        return resolve(results);
      });
    }
  });
};

module.exports = {
  queryNone,
  queryOne,
  queryMulti,
  beginTransaction,
  commitTransaction,
  rollbackTransaction
}
