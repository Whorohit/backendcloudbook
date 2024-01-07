import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
const BASE_URL=process.env.BASE_URL
const port = process.env.PORT|| 90;
const app = express();
app.use(express.urlencoded());
app.use(express.json());
app.use(cors());
mongoose.connect('mongodb+srv://ram211296:root@cluster0.yqlv4lb.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    year: Number,
    isbn: Number,
    des:String,
})
const book = mongoose.model('book', bookSchema)

app.post("/addbook", (req, res) => {
    console.log(req.body)
    const { title,author,year,isbn,desc } = req.body;
    const bookobj = new book({
        title,
        author,
        year,
        isbn,
        desc,
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
app.get("/:id", async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("ID parameter is required");
    }
    book.findById(id)
    .then(data => {
        if (!data) {
            return res.status(404).send("Book not found");
        }

        console.log("Found Book:", data);
        res.send(data);
    })
    .catch(error => {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    });
})
app.post("/delete", (req, res) => {
    const { id } = req.body
    book.deleteOne({ _id: id }).then(
        book.find({})
            .then(data => {
                console.log("Delete sucessfully")
                res.send(data);
            })
    )
})
    app.listen(port, (req, res) => {
        console.log(`the  server is running at ${port}`);
    })

