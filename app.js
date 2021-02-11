const express = require("express")
const { check, validationResult } = require("express-validator")
const app = express()
const PORT = process.env.PORT || 5000;
// load static files 
app.use(express.static("./views"))
app.use(express.urlencoded({ extended: true }))
// set ejs 
app.set("view engine", "ejs")

// routes 
app.get("/", (req, res) => {
    title = "Register"
    errors = []
    res.render("register", { title,errors,inputs:{} })

})

app.get("/login", (req, res) => {
    title = "User Login"
    res.render("login")
})
app.post("/register", [
    check('name').isLength({ min: 3 }).withMessage("Please Enter name more than 3 characters"),
    check('email').isEmail().withMessage("Please Enter Valid Email"),
    check('password').isLength({ min: 5 }).withMessage("Please Enter name more than 5 characters")
], (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        
        res.render("register", {  errors: errors.array() ,inputs: req.body })
    }
    else {
        res.send("Submited")

    }



})

// create server
app.listen(PORT, () => {
    console.log(`Server starts on ${PORT}`)
})