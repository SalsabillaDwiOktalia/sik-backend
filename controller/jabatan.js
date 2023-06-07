const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const response = require('../helper/ResponsHandler')

exports.inputJabatan = async (req,res) =>{
  try {
    const cekKodeJabatan =  await prisma.jabatan.findUnique({
      where: {
        kode_jabatan: req.body.kode_jabatan
      }
    })
    if (cekKodeJabatan) {
      res.json(response.commonError('kode telah digunakan'))
    } else {
      await prisma.jabatan.create({
        data: {
          ...req.body,
          tunjangan_jabatan: Number(req.body.tunjangan_jabatan)
        }
      })
      res.json(response.commonSuccess())
    }
  } catch (error) {
    console.log(error)
  }
  
}

exports.getJabatan = async (req,res) =>{
  try {
    const data = await prisma.jabatan.findMany({})
    res.json(response.successWithData(data))
  } catch (error) {
    res.json(response.serverError())
  }
}

exports.jabatanNotExist = async (req,res) =>{
  try {
    const data = await prisma.$queryRaw`SELECT * FROM jabatan WHERE kode_jabatan NOT IN (SELECT id_jabatan FROM jabatan_karyawan WHERE id_karyawan=${req.params.id})`
    res.json(response.successWithData(data))
  } catch (error) {
    res.json(response.serverError())
  }
}

exports.getbyid = async (req,res) =>{
  try {
    const data = await prisma.jabatan.findUnique({
      where:{
        kode_jabatan:req.params.kode
      }
    })
    res.json(response.successWithData(data))
  } catch (error) {
    res.json(response.serverError())
  }
}

exports.editJabatan = async (req,res) =>{
  await prisma.jabatan.update({
    where:{
      kode_jabatan:req.params.kode
    }, 
    data: req.body
  })
  res.json(response.commonSuccess())
}

exports.deleteJabatan = async (req,res) =>{
  await prisma.jabatan.delete({
    where:{
      kode_jabatan:req.params.kode
    }
  })
  res.json(response.commonSuccess())
}