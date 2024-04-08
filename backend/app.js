const express = require('express')
const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const PORT = process.env.PORT || 9000
const connectDB = require('./config/db')
const donenv = require('dotenv').config()


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))

connectDB()

const songSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title']
    },
    artist: {
        type: String,
        required: [true, 'Please add the artist']
    },
    album: {
        type: String,
        required: [true, 'Please add the album']
    },
    genre: {
        type: String,
        required: [true, 'Please add genre']
    }
})

const Song = mongoose.model("Song", songSchema)

app.route("/")
.get(asyncHandler(async (req, res) => {
    const songs = await Song.find({})
    res.status(200).json(songs)
}))
.post(asyncHandler(async (req, res) => {
    const {title, artist, album, genre} = req.body
    if(!title || !artist || !album || !genre) {
        res.status(400)
        throw new Error("Please add all required fields!")
    }

    const song = await Song.create({title: req.body.title, artist: req.body.artist, album: req.body.album, genre: req.body.genre})
    res.status(200).json(song)
}));

app.route("/:id")
.put(asyncHandler(async (req, res) => {
    const song = await Song.findById(req.params.id)
    if(!song) {
        res.status(400)
        throw new Error('Song not found')
    }
    const updatedSong = await Song.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedSong)
}))
.delete(asyncHandler(async (req, res) => {
    const song = await Song.findById(req.params.id)
    if(!song) {
        res.status(400)
        throw new Error('Song not found')
    }

    const deletedSong = await Song.findByIdAndDelete(req.params.id)
    res.status(200).json(deletedSong)
}));



app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`)
})