import AsyncStorage from '@react-native-async-storage/async-storage'

enum STORAGE_KEY {
  TOKEN = 'token',
  USER = 'user',
  FIRST_RUN_APP = 'first_run_app',
  LANGUARE= 'Languare',
  CONNECT_GOOGLE= 'connect_google',
  PIN_SECURITY= 'pin_security'
}

export const setOAuthToken = async (value: string) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY.TOKEN, JSON.stringify(value))
  } catch (e) {
    console.log(e)
  }
}

export const getOAuthToken = async () => {
  try {
    const data: any = await AsyncStorage.getItem(STORAGE_KEY.TOKEN)
    return JSON.parse(data)
  } catch (e) {
    return null
  }
}

export const removeOAuthToken = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY.TOKEN)
  } catch (e) { console.log(e) }
}

export const setUserInfo = async (value: object) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY.USER, JSON.stringify(value))
  } catch (e) { console.log(e) }
}

export const getUserInfo = async () => {
  try {
    const data: any = await AsyncStorage.getItem(STORAGE_KEY.USER)
    return JSON.parse(data)
  } catch (e) {
    return null
  }
}

export const removeUserInfo = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY.USER)
  } catch (e) { console.log(e) }
}

export const setFirstRunApp = async () => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY.FIRST_RUN_APP, JSON.stringify(true))
  } catch (e) { console.log(e) }
}

export const getFirstRunApp = async () => {
  try {
    const data: any = await AsyncStorage.getItem(STORAGE_KEY.FIRST_RUN_APP)
    return data
  } catch (e) {
    return null
  }
}

export const setLanguare = async (value: string) => {
  try {
      await AsyncStorage.setItem(STORAGE_KEY.LANGUARE, JSON.stringify(value))
  } catch (e) { console.log(e) }
}

export const getLanguare = async () => {
  try {
      const data: any = await AsyncStorage.getItem(STORAGE_KEY.LANGUARE)
      return JSON.parse(data)
  } catch (e) {
      return null
  }
}

export const setConnectGoogle = async (value: boolean) => {
  try {
      await AsyncStorage.setItem(STORAGE_KEY.CONNECT_GOOGLE, JSON.stringify(value))
  } catch (e) { console.log(e) }
}

export const getConnectGoogle = async () => {
  try {
      const data: any = await AsyncStorage.getItem(STORAGE_KEY.CONNECT_GOOGLE)
      return JSON.parse(data)
  } catch (e) {
      return null
  }
}

export const setPinSecurity = async (value: boolean) => {
  try {
      await AsyncStorage.setItem(STORAGE_KEY.PIN_SECURITY, JSON.stringify(value))
  } catch (e) { console.log(e) }
}

export const getPinSecurity = async () => {
  try {
      const data: any = await AsyncStorage.getItem(STORAGE_KEY.PIN_SECURITY)
      return JSON.parse(data)
  } catch (e) {
      return null
  }
}