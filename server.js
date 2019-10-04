const express = require('express')
const path = require('path')
const ReactDOMServer = require('react-dom/server')
// const App = require('./src')

const app = express()

// console.log(app);

const env = process.env.NODE_ENV

// if (env === 'production') {
//   app.get('*.js', (req, res, next) => {
//     const vendorUrlRegex = /vendor.*.js/
//     if (vendorUrlRegex.test(req.url)) {
//       res.setHeader('Cache-Control', 'private, max-age=31536000')
//     }
//     next()
//   })
// }

app.get('*.pdf', (req, res) => {
  console.log("pdf", __dirname, req.url)
  res.sendFile(path.join(__dirname, `pdf/${req.url}`), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.use(express.static(path.join(__dirname, 'dist')))

app.get('/*', (req, res) => {
  // const html = ReactDOMServer.renderToString(App)
  // res.render(html)
  res.sendFile(path.join(__dirname, 'dist/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(process.argv[2] || 8080)
console.log('Server is running on the port 8080')
