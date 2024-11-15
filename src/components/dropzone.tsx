'use client'

import { cn } from '@/lib/utils'
import { ImageUp, Trash2 } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Button } from './ui/button'
import { Controller, useFormContext } from 'react-hook-form'

interface Props {
  name: string
}

const ImageDropzone: React.FC<Props> = ({ name }) => {
  const [preview, setPreview] = useState<string | null>(null)
  const { control, setValue } = useFormContext()

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        // Set the file value in react-hook-form
        setValue(name, file)
        const previewUrl = URL.createObjectURL(file)
        setPreview(previewUrl)
      }
    },
    [name, setValue]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false,
  })

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="space-y-2">
          <p className="text-lg font-semibold">Update profile photo</p>
          {preview ? (
            <div className="relative mt-4 w-full max-w-56">
              <Image
                src={preview}
                alt="Preview"
                width={500}
                height={500}
                className="aspect-square w-full rounded-lg object-cover shadow-md"
              />
              <div className="absolute right-1 top-1">
                <Button
                  variant={'destructive'}
                  size={'icon'}
                  onClick={() => {
                    setPreview(null)
                    setValue(name, null)
                  }}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ) : (
            <div
              {...getRootProps()}
              className={cn(
                'group flex aspect-square w-full max-w-56 cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-4 transition-colors duration-200',
                isDragActive ? 'border-blue-500' : 'border-gray-300',
                'hover:border-blue-500'
              )}
            >
              <input {...getInputProps()} />
              <div
                className={cn(
                  'flex flex-col items-center gap-2 text-center',
                  isDragActive ? 'text-blue-500' : 'text-secondary-foreground',
                  'group-hover:text-blue-500'
                )}
              >
                <ImageUp />
                <p className="text-sm">
                  {isDragActive
                    ? 'Drop Image here'
                    : 'Click to Upload or Drag Image Here'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    />
  )
}

export default ImageDropzone
