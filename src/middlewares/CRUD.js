const db = require('../utils/mysqldb')
const catchError = require('./catchError').catchError
const uuid = require('uuid').v4

const CRUD = (
  Router,
  _tableName,
  { GET, POST, PUT, DELETE } = { GET: false, POST: false, PUT: false, DELETE: false },
  middlewares = [],
  _primaryKeyName,
  _fieldNames = [],
  _isDeleleFieldName = 'is_delete') => {

  const toQuestionMark = () => '?';
  const addComma = (prev, curr) => `${prev},${curr}`;
  const addBackQuote = (e) => `\`${e}\``;
  const mapBodyToParams = (req) => _fieldNames.map(e => req.body[e])

  const tableName = addBackQuote(_tableName);
  const primaryKeyName = addBackQuote(_primaryKeyName);
  const isDeleleFieldName = addBackQuote(_isDeleleFieldName);
  const fieldNames = _fieldNames.map(addBackQuote).reduce(addComma);
  const questionMark = _fieldNames.map(toQuestionMark).reduce(addComma);

  if (GET) {
    Router.get('/', middlewares, catchError(async (req, res, next) => {
      const sql = `
      SELECT ${primaryKeyName},${fieldNames}, status
      FROM ${tableName}
      WHERE ${isDeleleFieldName} = 0
      LIMIT ? 
      OFFSET ?;`
      const countSql = `
      SELECT count(${primaryKeyName}) as total
      FROM ${tableName}
      WHERE ${isDeleleFieldName} = 0;`

      const { page, size } = req.query;
      const limit = parseInt(size) || 10;
      const offset = parseInt((page - 1) * size) || 0;
      const { total } = await db.queryOne(countSql);
      if (total / size + 1 < page) {
        res.status(400).send({
          status: 0,
          message: 'Vượt quá số trang tối đa'
        })
        return
      }
      const data = await db.queryMulti(sql, [limit, offset]);
      res.send({
        status: 1,
        metadata: {
          length: data.length,
          total
        },
        data,
      });
    }));

    Router.get('/:id', middlewares, catchError(async (req, res) => {
      const { id } = req.params;
      const sql = `
      SELECT ${fieldNames},${fieldNames}, status
      FROM ${tableName}
      WHERE ${isDeleleFieldName} = 0 
      AND ${primaryKeyName} = ?
      LIMIT 1;`
      const data = await db.queryOne(sql, [id]);
      data !== undefined
        ? res.send({
          status: 1,
          data,
        })
        : res.status(400).send({
          status: 0,
          message: 'Không tồn tại'
        })
        ;
    }));
  }
  if (POST) {
    Router.post('/', middlewares, catchError(async (req, res) => {
      const missingFields = _fieldNames.filter(e => req.body[e] === undefined)
      if (missingFields.length > 0) {
        res.status(400).send({
          status: 0,
          message: "Thiếu dữ liệu",
          missingFields: missingFields
        })
        return
      }
      const newID = uuid()
      const sql = `
        INSERT INTO ${tableName} (${primaryKeyName},${fieldNames})
        VALUES (?,${questionMark});`;
      await db.queryNone(sql, [newID, ...mapBodyToParams(req)]);
      res.send({
        status: 1,
        [_primaryKeyName]: newID
      })
    }));
  }
  if (PUT) {
    Router.put('/:id', middlewares, catchError(async (req, res) => {
      const sql = `
      UPDATE ${tableName}
      SET 
      ${_fieldNames
          .filter(e => req.body[e] !== undefined)
          .map(e => `${addBackQuote(e)} = ?`)
          .reduce(addComma)
        }
      WHERE ${primaryKeyName} = ? AND ${isDeleleFieldName} = 0;`;
      await db.queryNone(sql, [...mapBodyToParams(req).filter(e => e !== undefined), req.params.id]);
      res.send({
        status: 1,
      });
    }));
  }
  if (DELETE) {
    Router.delete('/:id', middlewares, catchError(async (req, res) => {
      const sql = `
      UPDATE ${tableName}
      SET 
        ${isDeleleFieldName} = 1
      WHERE ${primaryKeyName} = ?`;
      await db.queryNone(sql, req.params.id);
      res.send({
        status: 1,
      });
    }))
  }
};

module.exports = CRUD;