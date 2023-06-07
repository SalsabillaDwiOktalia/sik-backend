const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const response = require('../helper/ResponsHandler')

exports.inputTugas_kepalabiro = async (req,res) => {
  try {
    const data = req.body
    await prisma.master_tugas.create({
      data: {
        ...data,
        id_unit_kerja: Number(data.id_unit_kerja),
        id_jabatan_pimpinan_unit: Number(data.id_jabatan_pimpinan_unit),
        deadline: new Date(req.body.deadline)
      }
    }).then(async result => {
      const dataHistory = {
        id_tugas: result.id_tugas,
        keterangan: data.ket_revisi
      }
      await prisma.history_status.create({
        data: dataHistory
      })
      res.json(response.commonSuccess())
    })
  } catch (error) {
    console.log(error)
  }

}

exports.getTugas_kepalabiro = async (req,res) =>{
  try {
   const data = await prisma.$queryRawUnsafe(`SELECT * FROM master_tugas
      INNER JOIN jabatan_karyawan ON master_tugas.id_jabatan_pimpinan_unit = jabatan_karyawan.id_jabatan_karyawan
      INNER JOIN unit_kerja ON master_tugas.id_unit_kerja = unit_kerja.id_unit_kerja
      WHERE jabatan_karyawan.id_karyawan='${req.params.id}'
    `)
    // console.log(data)
    res.json(response.successWithData(data))
  } catch (error) {
    console.log(error)
    res.json(response.serverError())
  }
}