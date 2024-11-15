import CryptoJS from 'crypto-js'
import { PersistStorage } from 'zustand/middleware'

export class EncryptedStorage implements PersistStorage<any> {
  private secretKey: string =
    process.env.NEXT_PUBLIC_PERSIST_SECRET ?? 'default_secret_key'

  getItem(key: string): any | undefined {
    const encryptedValue = localStorage.getItem(key)
    if (encryptedValue) {
      try {
        const decryptedBytes = CryptoJS.AES.decrypt(
          encryptedValue,
          this.secretKey
        )
        const decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8)
        return JSON.parse(decryptedValue)
      } catch (error) {
        return undefined
      }
    }
    return undefined
  }

  setItem(key: string, value: any): void {
    try {
      const jsonString = JSON.stringify(value)
      const encryptedValue = CryptoJS.AES.encrypt(
        jsonString,
        this.secretKey
      ).toString()
      localStorage.setItem(key, encryptedValue)
    } catch (error) {
      console.error('Failed to encrypt and store value', error)
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key)
  }
}
