'use server'

import * as z from 'zod'
import { AuthError } from 'next-auth'
import { getPinataurl, pinata } from '@/lib/pinata'

const UploadSchema = z.object({
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => file instanceof File, {
      message: 'Please upload a valid image file.',
    }),
})

export const uploadImage = async (values: z.infer<typeof UploadSchema>) => {
  const validatedFields = UploadSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      error: 'Invalid fields!',
      message: validatedFields.error.flatten().fieldErrors,
    }
  }

  try {
    const groupId = process.env.NEXT_PUBLIC_PINATA_GROUP ?? ''
    const upload = await pinata.upload.file(values.image).group(groupId)

    if (upload.cid) {
      const imageUrl = await getPinataurl(upload.cid)
      return { success: 'Success upload image', cid: upload.cid, imageUrl }
    }

    return { success: 'Success upload image' }
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CallbackRouteError':
          return { error: 'Invalid credentials!' }
        default:
          return { error: 'Something went wrong!' }
      }
    }

    throw error
  }
}
