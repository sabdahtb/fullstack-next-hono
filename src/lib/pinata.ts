import { PinataSDK } from 'pinata'

export const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT,
  pinataGateway: process.env.NEXT_PUBLIC_PINATA_GATEWAY,
})

export async function getPinataurl(cid: string) {
  const expires = 7 * 24 * 60 * 60
  const url = await pinata.gateways.createSignedURL({ cid, expires })

  return url
}
