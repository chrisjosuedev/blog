const express = require('express')
const path = require('path')
const app = express()
const port = 3000

require('./db')

const Blog = require('./models/Blogs')

// View Engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.urlencoded({
  extended: false
}))

app.get('/', async (req, res) => {

  const blogs = await Blog.find()

  res.render('home', {infoBlogs: blogs})
})

app.get('/contact', (req, res) => {
  res.render('contact')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/compose', (req, res) => {
  res.render('compose')
})

app.post('/compose', async (req, res) => {
  const { title, description } = req.body

  const newBlog = new Blog ({
    title: title,
    description: description
  })


  const blogSaved = await newBlog.save()
    .catch(err => console.log(err))

  res.redirect('/')

})

app.get('/post/:id', async (req, res) => {
  const { id } = req.params

  try {
    const postFound = await Blog.findById(id)
    res.render('post', {postSelected: postFound})
  } catch(err) {
    console.log(err)
    res.render('404')
  }

})

// Public
app.use(express.static(path.join(__dirname, 'public')))

// Page Doesn't Exist
app.use( (req, res) => {
  res.status(404).render('404');
});

app.listen(port, ()=> {
  console.log('On Port ' + port)
})