// const express = require('express')
// const path = require('path')

import express from 'express'
import path from 'path'
import { DatabaseSync } from 'node:sqlite'
import multer from 'multer'
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import dotenv from 'dotenv'

dotenv.config()

const bucketAccessKey = process.env.ACCESS_KEY
const bucketSecretAccessKey = process.env.SECRET_ACCESS_KEY
const bucketRegion = process.env.BUCKET_REGION
const bucketName = process.env.BUCKET_NAME

const s3 = new S3Client({
    credentials: {
        accessKeyId: bucketAccessKey,
        secretAccessKey: bucketSecretAccessKey
    },
    region: bucketRegion,
})


const app = express()
const upload = multer()
const db = new DatabaseSync('test.db')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(import.meta.dirname, 'public')));
app.set('view engine', 'ejs')
app.set('views', './views')

const data = {
    files: {
    }
}

app.get("/", (req, res) => {

    data.files = updateDatabase()

    res.render('index', data)
})

app.post("/", upload.single("file"), async (req, res) => {
    console.log(req.file)
    let randomImageName = crypto.randomUUID()

    const command = new PutObjectCommand({
        Bucket: bucketName,
        Key: randomImageName,
        Body: req.file.buffer,
        ContentType: req.file.mimetype
    })

    await s3.send(command).then(() => {

        db.exec(`INSERT INTO files (id,name) VALUES ('${randomImageName}','${req.file.originalname}')`)

        data.files = updateDatabase()

        console.log(data)
        console.log("Uploaded New File")

    })
    res.render('index', data)
})

app.delete("/", async (req, res) => {
    const id = req.query.id


    const command = new DeleteObjectCommand({
        Bucket: bucketName,
        Key: id
    })

    await s3.send(command).then(() => {
        db.exec(`DELETE FROM files WHERE id = '${id}'`)
        data.files = updateDatabase()

        console.log(data)
        console.log("Deleted a file")
    })





    res.status(204).send()
})


app.listen(3000, () => {
    console.log("The server is live at http://localhost:3000")
})

function updateDatabase() {
    let files = db.prepare('SELECT * FROM files;').all()
    return files
}