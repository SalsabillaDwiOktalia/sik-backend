const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const response = require('../helper/ResponsHandler')
const dateHelper = require('../helper/DateHelper')

exports.inputKontrak = async (req,res) =>{
  try {

      await prisma.kontrak.create({
        data: {
          ...req.body,
          id_karyawan: Number(req.body.id_karyawan),
          tgl_kontrak: dateHelper.addOneDay(req.body.tgl_kontrak),
          tgl_habis_kontrak: dateHelper.addOneDay(req.body.tgl_habis_kontrak)
        }
      })
      res.json(response.commonSuccess())

  } catch (error) {
    console.log(error)
  }
  
}

exports.getKontrak =async (req, res) => {
  try {
    const data = await prisma.kontrak.findMany({
      include: {
        karyawan: true
      },
      where: {
        status: 1
      }
    })
    res.json(response.successWithData(data))
  } catch (error) {
    console.log(error)
  }
}

exports.getPerpanjangkontrak = async (req, res) => {
  try {
    const data = req.body
    await prisma.kontrak.update({
      data:{
        status: 0 
      },where: {
        id_kontrak: Number(data.id_kontrak)
      }
    })
    delete data.id_kontrak
    await prisma.kontrak.create ({
      data : {
        ...data,
        id_karyawan : Number(data.id_karyawan),
        tanggal_masuk_kerja: dateHelper.addOneDay(data.tanggal_masuk_kerja),
        tgl_kontrak: dateHelper.addOneDay(data.tgl_kontrak),
        tgl_habis_kontrak: dateHelper.addOneDay(data.tgl_habis_kontrak),
        status: 1,
        jenis_kontrak: 2
      }
    })
    await prisma.karyawan.update({
      data: {
        gaji_pokok: {
          increment: 100000
        }
      },
      where: {
        id_karyawan: Number(data.id_karyawan)
      }
    })
    res.json(response.commonSuccess())
  } catch (error){
    console.log(error)
  }
}

exports.getPensiun = async (req, res) => {
  try {
    const data = req.body
    await prisma.kontrak.update({
      data:{
        status: 0 
      },
      where: {
        id_kontrak: Number(data.id_kontrak)
      },
      tanggal_masuk_kerja: true
    })
    delete data.id_kontrak
    delete data.uang_penghargaan
    delete data.uang_pesangon
    await prisma.kontrak.create ({
      data : {
        ...data,
        id_karyawan : Number(data.id_karyawan),
        tgl_kontrak: dateHelper.addOneDay(data.tgl_kontrak),
        tgl_habis_kontrak: dateHelper.addOneDay(data.tgl_habis_kontrak),
        status: 1,
        jenis_kontrak: 3
      }
    })
    res.json(response.commonSuccess())
  } catch (error){
    console.log(error)
  }
}