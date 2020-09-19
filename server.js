const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const matter = require('gray-matter');
const hljs = require('highlight.js');
const mdih = require('markdown-it-highlightjs');
const md = require('markdown-it')({ html: true });
const mdEmoji = require('markdown-it-emoji/light');
const ejs = require('ejs');
const db = require('quick.db');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
md.use(mdEmoji)
md.use(mdih, {
  inline: true,
  register: {
      cypher: require('highlightjs-cypher')
    }
})


app.get('/blog/:article', (req, res) => {
  const file = matter.read(__dirname + '/views/markdown/' + req.params.article + '.md');
  let content = file.content
  let result = md.render(content);

  res.render("index", {
   post: result,
   title: file.data.title,
   desc: file.data.description,
   html: true
 })
})

app.get('/', (req, res) => {
  const file = matter.read(__dirname + '/views/markdown/index.md');
  let content = file.content
  let result = md.render(content);

  res.render("index", {
   post: result,
   title: file.data.title,
   desc: file.data.description,
   image: file.data.image,
   html: true
 })
})

app.get('/blog', (req, res) => {
  res.status(404).render('404', {
    statusCode: 404
  })
})


const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
