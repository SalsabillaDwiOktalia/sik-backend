const bcrypt = require('bcrypt')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const response = require('../helper/ResponsHandler')

exports.login = async(req, res) => {
  try {
    const cekUsername = await prisma.users.findUnique({
      where: {
        username: req.body.username
      },
      include: {
        karyawan: {
          include: {
            jabatan_karyawan: true
          }
        }
      }
    })
    if (cekUsername){
      if(bcrypt.compareSync(req.body.password, cekUsername.password)){
        delete cekUsername.password
        res.json(response.successWithData(cekUsername))
      } else {
        res.json(response.commonError('Password Salah'))
      }
    }else(
      res.json(response.commonError('username tidak terdaftar'))
    )
  } catch (error) {
    res.json(response.serverError())
  }
}

exports.register = async (req, res) => {
  try {
    const cekUsername = await prisma.users.findUnique({
      where: {
        username: req.body.username
      }
    })
    if (cekUsername){
      res.json(response.commonError('Username Telah Terdaftar'))
    }else{
      bcrypt.hash(req.body.password,10, async(err,hash) => {
        await prisma.users.create({data:{
          ...req.body,
          password:hash,
          id_karyawan: Number(req.body.id_karyawan)
        }})
  
        res.json(response.commonSuccess('Berhasil Registrasi'))
      })
    }
  } catch (error) {
    res.json(response.serverError())
  }
}

// export function cekRole(req, res) {
//   console.log('register')
// }