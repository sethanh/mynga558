import * as _ from 'lodash'

export const checkEmail = (value: string) => value && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/g.test(value) ? 1 : 0
export const requiredTrim = (value: string) => value && _.startsWith(value, ' ') || _.endsWith(value, ' ') ? 0 : 1
export const minLenght8 = (value: string) => value && value.length >= 8 ? 1 : 0
export const isPhoneNumber = (value: string) => value && /([0-9\s\-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/g.test(value) ? 1 : 0
export const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{1,3})+$/
export const removeFromArray = (original: Array<Object>, remove: Array<Object>) => {
  // @ts-ignore
  return original.filter(value => !remove.includes(value?._id))
}