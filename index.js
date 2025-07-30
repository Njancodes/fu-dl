// const express = require('express')
// const path = require('path')

import express from 'express'
import path from 'path'
import multer from 'multer'

const app = express()
const upload = multer()

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(import.meta.dirname, 'public')));
app.set('view engine', 'ejs')
app.set('views', './views')

const data = {
    files: {
    }
}

app.get("/", (req, res) => {
    res.render('index', data)
})

app.post("/", upload.single("file"), (req, res) => {
    console.log(req.file)
    let randomImageName = crypto.randomUUID()
    data.files[randomImageName] = req.file.originalname;
    res.render('index', data)
})



app.listen(3000, () => {
    console.log("The server is live at http://localhost:3000")
})