import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import CryptoJS from 'crypto-js'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function encryptString(data: string): string {
  const secret = process.env.NEXT_PUBLIC_PASSWORD_SECRET ?? 'default_secret_key'
  return CryptoJS.AES.encrypt(data, secret).toString()
}

export function decryptString(encryptedData: string): string {
  const secret = process.env.NEXT_PUBLIC_PASSWORD_SECRET ?? 'default_secret_key'
  const bytes = CryptoJS.AES.decrypt(encryptedData, secret)
  return bytes.toString(CryptoJS.enc.Utf8)
}

export function timestampNow() {
  const todayDate = new Date()
  const today = todayDate.getTime()

  return today
}

export function timestampExp(day: number) {
  const expiredDate = new Date()
  expiredDate.setDate(expiredDate.getDate() + day)

  const expired = expiredDate.getTime()
  return expired
}

export function reloadSession() {
  const event = new Event('visibilitychange')
  document.dispatchEvent(event)
}
