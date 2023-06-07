const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const response = require('../helper/ResponsHandler')

exports.inputTugas_pimpinanunit = async (req,res) => {
  try {
    const data = JSON.parse(req.body.data) 
    const dataInput = {
        ...data,
        id_kepala_biro: Number(data.id_kepala_biro),
        id_jabatan_pimpinan_unit: Number(data.id_jabatan_pimpinan_unit),
        deadline: new Date(data.deadline),
        lampiran: req.file ? req.file.filename : null
      }
    await prisma.master_tugas.create({
      data: dataInput
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

exports.getTugas_pimpinanunit = async (req,res) =>{
  try {
   const data = await prisma.$queryRawUnsafe(`SELECT * FROM master_tugas
      INNER JOIN jabatan_karyawan ON master_tugas.id_jabatan_pimpinan_unit = jabatan_karyawan.id_jabatan_karyawan
      INNER JOIN jabatan_karyawan as kepala_biro ON master_tugas.id_kepala_biro = kepala_biro.id_jabatan_karyawan
      INNER JOIN unit_kerja ON unit_kerja.id_unit_kerja = kepala_biro.unit_kerja
      WHERE jabatan_karyawan.id_karyawan='${req.params.id}'
    `)
    // console.log(data)
    res.json(response.successWithData(data))
  } catch (error) {
    console.log(error)
    res.json(response.serverError())
  }
}

exports.getTugasForKepalaBiro = async (req,res) =>{
  try {
   const data = await prisma.$queryRawUnsafe(`SELECT master_tugas.*, unit_kerja.nama_unit_kerja, pemberiTugas.nama_karyawan as pimpinanUnit FROM master_tugas
      INNER JOIN jabatan_karyawan ON master_tugas.id_kepala_biro = jabatan_karyawan.id_jabatan_karyawan
      INNER JOIN jabatan_karyawan as pu ON master_tugas.id_jabatan_pimpinan_unit  = pu.id_jabatan_karyawan
      INNER JOIN karyawan as pemberiTugas ON pemberiTugas.id_karyawan = pu.id_karyawan
      INNER JOIN unit_kerja ON unit_kerja.id_unit_kerja = jabatan_karyawan.unit_kerja
      WHERE jabatan_karyawan.id_karyawan='${req.params.id}'
    `)
    // console.log(data)
    res.json(response.successWithData(data))
  } catch (error) {
    console.log(error)
    res.json(response.serverError())
  }
}

exports.updateTugas = async (req, res) => {
  try {
    const data = JSON.parse(req.body.data)
    const idTugas = Number(req.params.id)
    const statusTugas = Number(data.status)

    const dataMaster = {
      file_hasil: null,
      status: statusTugas,
      ket_revisi: data.ket_revisi
    }

    const dataStatus = {
      hasil_tugas: null,
      id_tugas: idTugas,
      status_tugas: statusTugas,
      keterangan: data.ket_revisi
    }

    if (req.file) {
      const namaFile = req.file.filename
      dataMaster.file_hasil = namaFile
      dataStatus.hasil_tugas = namaFile
    }

    await prisma.master_tugas.update({
      where: {
        id_tugas: idTugas
      },
      data: dataMaster
    })
    await prisma.history_status.create({
      data: dataStatus
    })
    res.json(response.commonSuccess('Berhasil'))
  } catch (error) {
    console.log(error)
    res.json(response.serverError())
  }
}

exports.tugasSelesai = async (req, res) => {
  try {
    const idTugas = Number(req.params.id)
    const statusTugas = 3

    const dataMaster = {
      status: statusTugas
    }

    const dataStatus = {
      id_tugas: idTugas,
      status_tugas: statusTugas
    }

    await prisma.master_tugas.update({
      where: {
        id_tugas: idTugas
      },
      data: dataMaster
    })
    await prisma.history_status.create({
      data: dataStatus
    })
    res.json(response.commonSuccess('Berhasil'))
  } catch (error) {
    console.log(error)
    res.json(response.serverError())
  }
}