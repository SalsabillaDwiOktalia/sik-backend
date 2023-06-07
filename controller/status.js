const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const response = require('../helper/ResponsHandler')

exports.inputStatus = async (req,res) => {
   try {
    await prisma.status.create({
      data: {
        ...req.body,
        gaji_pokok: Number(req.body.gaji_pokok)
      }
      
    }) 
    res.json(response.commonSuccess())
  } catch (error) {
    console.log(error)
  }
  
}

exports.getStatus = async (req,res) =>{
  try {
    const data = await prisma.status.findMany({})
    res.json(response.successWithData(data))
  } catch (error) {
    res.json(response.serverError())
  }
}

exports.getbyid = async (req,res) =>{
  try {
    const data = await prisma.status.findUnique({
      where:{
        id_status:req.params.id
      }
    })
    res.json(response.successWithData(data))
  } catch (error) {
    res.json(response.serverError())
  }
}

exports.editStatus = async (req,res) =>{
  await prisma.status.update({
    where:{
      id_status: Number(req.params.id)
    }, 
    data:{
      ...req.body,
      gaji_pokok: Number(req.body.gaji_pokok)
    }
  })
  res.json(response.commonSuccess())
}

exports.deleteStatus = async (req,res) =>{
  await prisma.status.delete({
    where:{
      id_status: Number(req.params.id)
    }
  })
  res.json(response.commonSuccess())
}