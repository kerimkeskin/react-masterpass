export const handleError = (error: any) => {
  const { response = {} } = error
  const { status, data } = response

  if (!status) return { error: 'Bağlantı Hatası' }

  if (Object.prototype.toString.call(data) === '[object Object]') {
    const { errors, message } = data
    return checkError(status, errors, message)
  } else {
    const { message } = error
    return checkError(null, null, message)
  }
}

const checkError = async (status: any, error: any, message: any) => {
  message === '' && (message = 'Teknik sebeplerden dolayı hata oluştu')

  if (Object.prototype.toString.call(error) === '[object Object]') {
    const keys = Object.keys(error)
    let errorContent = ''
    for (let i = 0; i < keys.length; i++) {
      const item = keys[i]
      const errorItem = error[item]
      errorContent = errorContent + errorItem + '\n'
      if (i === keys.length - 1) {
        return { error: errorContent }
      }
    }
  }

  if (typeof message === 'string') return { error: message }

  if (typeof error === 'string') return { error }

  if (status === 500) return { error: 'server_error' }

  return { error: 'Teknik sebeplerden dolayı hata oluştu' }
}
