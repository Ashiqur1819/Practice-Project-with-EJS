const express = require("express")
const path = require("path")
const userSchema = require("./models/user")

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")


app.get("/", (req, res) => {
    res.render("index")
})

app.get("/read", async(req, res) => {

    const users = await userSchema.find()
    res.render("read", {users})
})

app.post("/create", async(req, res) => {

    const {name, email, image} = req.body

    const createdUser = await userSchema.create({
        name,
        email,
        image
    })

    res.redirect("/read")
})

app.listen(3000)