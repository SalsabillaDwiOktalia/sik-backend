const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const response = require('../helper/ResponsHandler')

exports.inputKaryawan = async (req,res) => {
  try {
    await prisma.karyawan.create({
      data:{
        ...req.body, 
        status: Number(req.body.status),
        tanggal_lahir: new Date(req.body.tanggal_lahir),
        tanggal_masuk_kerja: new Date(req.body.tanggal_masuk_kerja)
      }
    }) 
    res.json(response.commonSuccess())
  } catch (error) {
    console.log(error)
  }
  
}

exports.getKaryawan = async (req,res) =>{
  try {
    const data = await prisma.karyawan.findMany({
      include: {
        status_karyawan_statusTostatus: true,
        jabatan_karyawan: {
          include: {
            jabatan: true,
            unit_kerja_jabatan_karyawan_unit_kerjaTounit_kerja: true
          }
        }
      }
    })
    // console.log(data)
    res.json(response.successWithData(data))
  } catch (error) {
    console.log(error)
    res.json(response.serverError())
  }
}

exports.getbyid = async (req,res) =>{
  try {
    const data = await prisma.karyawan.findUnique({
      where:{
        id_karyawan: Number(req.params.id)
      },
      include:{
        status_karyawan_statusTostatus: true
      }
    })
    res.json(response.successWithData(data))
  } catch (error) {
    res.json(response.serverError())
  }
}

exports.editKaryawan = async (req,res) =>{
  console.log(req.body)
  await prisma.karyawan.update({
    where:{
      id_karyawan: Number(req.params.id)
    }, 
    data: {
      ...req.body,
      status: Number(req.body.status),
      tanggal_lahir: new Date(req.body.tanggal_lahir),
      tanggal_masuk_kerja: new Date(req.body.tanggal_masuk_kerja)
    }
  })
  res.json(response.commonSuccess())
}

exports.deleteKaryawan = async (req,res) =>{
  await prisma.karyawan.delete({
    where:{
      id_karyawan: Number(req.params.id)
    }
  })
  res.json(response.commonSuccess())
}

exports.getjabatan_Karyawan = async (req, res) => {
  const data = await prisma.karyawan.findUnique({
    where:{
      id_karyawan: Number(req.params.id)
    },
    include: {
      jabatan_karyawan:{
        include:{
          jabatan: true
        }
      }
    }
  })
  res.json (response.successWithData(data))
}

exports.getjabatan_Karyawan_by_level = async (req, res) => {
  try {
    const data = await prisma.$queryRawUnsafe(`SELECT * FROM jabatan_karyawan
      INNER JOIN jabatan ON jabatan.kode_jabatan = jabatan_karyawan.id_jabatan 
      INNER JOIN unit_kerja ON jabatan_karyawan.unit_kerja = unit_kerja.id_unit_kerja
      WHERE jabatan_karyawan.id_karyawan ='${req.params.id}' AND jabatan.level=1`);
    res.json (response.successWithData(data))
  } catch (error) {
    console.log(error)
    res.json(response.serverError())
  }
}