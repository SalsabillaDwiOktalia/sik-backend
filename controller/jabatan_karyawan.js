const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const response = require('../helper/ResponsHandler')

exports.inputJabatan_Karyawan = async (req,res) => {
  try {
    await prisma.jabatan_karyawan.create({
      data:{
        ...req.body,
        id_karyawan: Number(req.body.id_karyawan),
        tgl_sk: new Date(req.body.tgl_sk),
        unit_kerja: Number(req.body.unit_kerja)
      }
    }) 
    res.json(response.commonSuccess())
  } catch (error) {
    console.log(error)
  }
  
}

// exports.getJabatanKaryawan = async (req,res) =>{
//   try {
//     const data = await prisma.jabatan.findMany({})
//     res.json(response.successWithData(data))
//   } catch (error) {
//     res.json(response.serverError())
//   }
// }

// exports.getbyid = async (req,res) =>{
//   try {
//     const data = await prisma.jabatan.findUnique({
//       where:{
//         kode_jabatan:req.params.kode
//       }
//     })
//     res.json(response.successWithData(data))
//   } catch (error) {
//     res.json(response.serverError())
//   }
// }

exports.editJabatan_Karyawan = async (req,res) =>{
  const tgl = new Date(req.body.tgl_sk)
  const a = tgl.toLocaleDateString().split('T')[0]
  // console.log(a)
  // console.log(new Date(req.body.tgl_sk))
  // // console.log(req.body.tgl_sk)
  await prisma.jabatan_karyawan.update({
    where:{
      id_jabatan_karyawan: Number(req.params.id)
    }, 
    data: {
      ...req.body,
      id_karyawan: Number(req.body.id_karyawan),
      tgl_sk: new Date(a),
      // tgl_sk: new Date(req.body.tgl_sk),
      unit_kerja: Number(req.body.unit_kerja),
      
    }
  })
  res.json(response.commonSuccess())
}

exports.deleteJabatan_Karyawan = async (req,res) =>{
  await prisma.jabatan_karyawan.delete({
    where:{
      id_jabatan_karyawan: Number(req.params.id)
    }
  })
  res.json(response.commonSuccess())
}

exports.getKepalaBiro = async (req,res) =>{
  const data = await prisma.$queryRawUnsafe(`SELECT * FROM jabatan_karyawan
    INNER JOIN jabatan ON jabatan.kode_jabatan = jabatan_karyawan.id_jabatan
    INNER JOIN karyawan ON karyawan.id_karyawan = jabatan_karyawan.id_karyawan
    INNER JOIN unit_kerja ON unit_kerja.id_unit_kerja = jabatan_karyawan.unit_kerja
    WHERE jabatan.level = 2
  `)
  res.json(response.successWithData(data))
}