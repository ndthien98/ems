const repo = require('../../repo')

module.exports = {
  getAllAccount: async (req, res, next) => {
    const { limit, offset, page, size } = req.pagination
    const accounts = await repo.account.getAll(limit, offset)
    const totalData = await repo.account.count()
    res.send_list(accounts, { totalData, totalPage: Math.ceil(totalData / limit), page, size })
  },
  getCurrentAccount: async (req, res, next) => {
    const account = await repo.account.getByID(req.auth.accountID)
    delete account.password
    res.send_obj(account)
  },
  updateCurrentAccount: async (req, res, next) => {
    const { accountID } = req.auth
    const { email, phone } = req.body
    await repo.account.updateByID(email, phone, accountID)
    res.send_ok()
  }
}