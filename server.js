const express = require('express')
const cors = require('cors')
const app = express()
const PhoneBook = require('./Model/PhoneBook')
app.use(express.json())
app.use(cors())
const PORT = 8080

const mongoose = require('mongoose')

const DB = 'mongodb+srv://sinhala:sinhala@sinhalacrud.ztowpuu.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(DB, {
    useNewUrlParser: true,
     useUnifiedTopology: true,
}).then(() =>{
    console.log('Database connected..')
})

//add
app.post('/add-phone', async(req,res) => {
    const phoneNumber = new PhoneBook(req.body)
    try{
        await phoneNumber.save()
        res.status(201).json({
            status: 'Success',
            data : {
                phoneNumber
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})
//get
app.get('/get-phone', async (req,res) => {
    const phoneNumbers = await PhoneBook.find({})
    try{
        res.status(200).json({
            status : 'Success',
            data : {
                phoneNumbers
            }
        })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})
//update
app.patch('/update-phone/:id', async (req,res) => {
    const updatedPhone = await PhoneBook.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators : true
      })
    try{
        res.status(200).json({
            status : 'Success',
            data : {
              updatedPhone
            }
          })
    }catch(err){
        console.log(err)
    }
})
//delete

app.delete('/delete-phone/:id', async(req,res) => {
    await PhoneBook.findByIdAndDelete(req.params.id)
    
    try{
      res.status(204).json({
          status : 'Success',
          data : {}
      })
    }catch(err){
        res.status(500).json({
            status: 'Failed',
            message : err
        })
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}...`)
})