const express = require('express')
const notesController = express.Router()
const Note = require('./note')

notesController
  .post('/', async (req, res, next) => {
    const note = await Note.create(req.body)
    res.status(200).send(note)
  })

notesController
  .put('/:id', async (req, res, next) => {
    const note = await Note.findByIdAndUpdate(req.params.id, { $set: req.body }, { $upsert: true, new: true })
    res.status(200).send(note)
  })

notesController
  .get('/', async (req, res, next) => {
    const notes = await Note.find()
    res.status(200).send(notes)
  })

  module.exports = notesController