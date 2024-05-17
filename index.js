const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

app.get(`/users`, async (req, res) => {
  try{
    const users = await prisma.users.findMany()
    res.json(users)
  } catch (error){
    res(500).json(`Error: can't return any users.`)
  }

})

app.get(`/users/:id`, async (req, res) => {
  const {id} = req.params
  try{
    const user = await prisma.users.findUnique({
      where:{
        id: Number(id)
      }
    })
    res.json(user)
  } catch (error){
    res.status(400).json(`User with ID ${id} does not exist.`)
  }
})

app.post(`/users`, async (req, res) => {
  const {name, email} = req.body
  try{
    const newUser = await prisma.users.create({
      data: {
        name: name,
        email: email
      }
    })
    res.json(newUser)
  } catch (error){
    res.status(500).json(`User not created`)
  }
})

app.put(`/users/:id`, async (req, res) => {
  const {id} = req.params
  const {name, email} = req.body
  try{
    const updatedUser = await prisma.users.update({
      where:{
        id: Number(id)
      },
      data: {
        name: name,
        email: email
      }
    })
    res.json(updatedUser)
  } catch (error){
    res.status(400).json(`User with ID ${id} does not exist.` )
  }
})

app.delete(`/users/:id`, async (req, res) => {
  const {id} = req.params
  try{
    const deletedUser = await prisma.users.delete({
      where:{
        id: Number(id)
      }
    })
    res.json(`User with ID ${id} has been deleted.`)
  } catch (error){
    res.status(400).json(`User with ID ${id} does not exist.` )
  }
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
