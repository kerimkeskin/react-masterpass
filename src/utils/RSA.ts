let rsaInstance: any = null

const initializeRSA = async () => {
  if (typeof window === 'undefined') {
    return null
  }

  if (rsaInstance) {
    return rsaInstance
  }

  try {
    const { RSAKey } = await import('./mfs-client.min.js')
    rsaInstance = new RSAKey()
    rsaInstance.setPublic(
      'F619C53A37BAB059C583DA9AC4E2920FFC9D57E00885E82F7A0863DEAC43CE06374E45A1417DAC907C6CAC0AF1DDF1D7152192FED7A1D9255C97BC27E420E0742B95ED3C53C62995F42CB6EEDB7B1FBDD3E4F4A4AA935650DA81E763CA7074690032F6A6AF72802CC50394C2AFA5C9450A990E6F969A38571C8BC9E381125D2BEEC348AF919D7374FF10DC3E0B4367566CE929AD6EA323A475A677EB41C20B42D44E82E8A53DD52334D927394FCADF09',
      '03',
    )
    return rsaInstance
  } catch (error) {
    console.error('RSA initialization failed:', error)
    return null
  }
}

const encrypt = async (text: string): Promise<string> => {
  if (typeof window === 'undefined') {
    return text
  }

  const rsa = await initializeRSA()
  if (!rsa) {
    console.error('RSA instance not available')
    return text
  }

  try {
    return rsa.encrypt(text)
  } catch (error) {
    console.error('RSA encryption failed:', error)
    return text
  }
}

export const RSA = {
  encrypt,
}
