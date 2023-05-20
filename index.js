import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import CircularJSON from 'circular-json'
const port = 90;
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://ram211296:root@cluster0.sxaydjt.mongodb.net/booklist?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    year: Number,
    isbn: Number
})
const book = mongoose.model('book', bookSchema)

app.post("/addbook", (req, res) => {
    console.log(req.body)
    const { title,author,year,isbn } = req.body;
    const bookobj = new book({
        title,
        author,
        year,
        isbn 
    })
    bookobj.save().then(() => {
        console.log("send data")

    })
})
app.get("/", async (req, res) => {
  
    book.find({})
        .then(data => {
            console.log("Database Courses:")
            res.send(data);
        })


})
app.post("/delete", (req, res) => {
    const { id } = req.body
    book.deleteOne({ _id: id }).then(
        book.find({})
            .then(data => {
                console.log("Database Courses:")
                res.send(data);
            })
    )
})
app.get("/id", async (req, res) => {
 const { id } = req.body
 book.find({_id:id})
 .then(data => {
     console.log("Database Courses:")
     console.log(data)
     res.send(data);
 })

})
    app.listen(port, (req, res) => {
        console.log(`the  server is running at ${port}`);
    })

