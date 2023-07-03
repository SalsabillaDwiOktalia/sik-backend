const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const path = require('path')

BigInt.prototype.toJSON = function() {       
  return this.toString()
}

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use('/lampiran', express.static(path.join(__dirname, 'statics/lampiran')))

app.use('/users', require('./routes/users'))
app.use('/jabatan', require('./routes/jabatan'))
app.use('/unit_kerja', require('./routes/unit_kerja'))
app.use('/status', require('./routes/status'))
app.use('/karyawan', require('./routes/karyawan'))
app.use('/jabatan_karyawan', require('./routes/jabatan_karyawan'))
app.use('/tugas_pimpinanunit', require('./routes/tugas_pimpinanunit'))
app.use('/kontrak', require('./routes/kontrak'))

app.listen(port, ()=> {
  console.log ('server started')
})