const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const response = require('../helper/ResponsHandler')

exports.inputUnit_Kerja = async (req,res) => {
  try {
    await prisma.unit_kerja.create({
      data: req.body
    }) 
    res.json(response.commonSuccess())
  } catch (error) {
    console.log(error)
  }
  
}

exports.getUnit_Kerja = async (req,res) =>{
  try {
    const data = await prisma.unit_kerja.findMany({})
    res.json(response.successWithData(data))
  } catch (error) {
    res.json(response.serverError())
  }
}

exports.getbyid = async (req,res) =>{
  try {
    const data = await prisma.unit_kerja.findUnique({
      where:{
        id_unit_kerja:req.params.id
      }
    })
    res.json(response.successWithData(data))
  } catch (error) {
    res.json(response.serverError())
  }
}

exports.editUnit_Kerja = async (req,res) =>{
  await prisma.unit_kerja.update({
    where:{
      id_unit_kerja: Number(req.params.id)
    }, 
    data: req.body
  })
  res.json(response.commonSuccess())
}

exports.deleteUnit_Kerja = async (req,res) =>{
  await prisma.unit_kerja.delete({
    where:{
      id_unit_kerja: Number(req.params.id)
    }
  })
  res.json(response.commonSuccess())
}