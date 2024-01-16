import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
const BASE_URL = process.env.BASE_URL
const port = process.env.PORT || 90;
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
    year: {
        type: String,
        
    },
    isbn: Number,
    desc: String,
})
const book = mongoose.model('book', bookSchema)

app.post("/addbook", async (req, res) => {
    console.log(req.body)
    const { title, author, year, isbn, desc } = req.body;
    try {
        const bookobj = new book({
            title,
            author,
            year,
            isbn,
            desc,
        })
        console.log(bookobj);
        const dta = await bookobj.save();
        if (dta) {
            
            res.send({ message: "sucessfully added data" ,dta:dta })
        }
        else {
            res.status(500).send({ message: "Internal Server Error" });
        }

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }

})
app.get("/", async (req, res) => {

try {
    const data= await book.find({})
    if(data)
    {
      res.send(data)
    }
    else
    {
        res.status(500).send("NO data");
    }
    

    
} catch (error) {
    console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    
}

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

