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
      }
    })
    res.json(response.successWithData(data))
  } catch (error) {
    console.log(error)
  }
}