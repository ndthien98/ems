const { lstatSync, readdirSync } = require('fs')
const { join } = require('path')

const isDirectory = e => lstatSync(e.dirname).isDirectory()
const getAllRouters = source =>
  readdirSync(source)
    .map(name => ({
      name: name,
      dirname: join(source, name)
    }))
    .filter(isDirectory)
    .map(e => ({
      route: require(`./${e.name}`),
      path: `/${e.name}`
    }))
console.log(__dirname)
const allRouters = getAllRouters(__dirname)

allRouters.map(e => {
  console.log(`Router: ${e.path}`)
})

module.exports = allRouters