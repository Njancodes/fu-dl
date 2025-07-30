// const express = require('express')
// const path = require('path')

import express from 'express'
import path from 'path'

const app = express()

app.use(express.static(path.join(import.meta.dirname, 'public')));
app.set('view engine', 'ejs')
app.set('views','./views')

app.get("/",(req,res)=>{
    const data = {
        user:"Nijo",
        title:"Home Page",
        users:["Nijo","Jino","Niyo"]
    }

    res.render('index',data)
})

app.listen(3000, ()=>{
    console.log("The server is live at http://localhost:3000")
})