const defaultRes = (responseStatus, msg, withData = false, data) => {
  let res = {
    status: responseStatus,
    msg
  }
  if (withData) {
    res.data = data
  }
  return res
}
module.exports = {
  commonSuccess: (msg = 'berhasil memuat permintaan') => defaultRes(true, msg),
  successWithData: (data) => defaultRes(true, 'Berhasil Memuat', true, data),
  commonError: (msg = 'Gagal memuat') => defaultRes(false, msg),
  serverError: () => defaultRes(false, 'Terjadi Kesalahan')

}