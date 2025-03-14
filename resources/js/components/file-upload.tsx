"use client"

import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { FileWithPreview, ImageCropper } from "@/components/image-cropper"
import { FileWithPath, useDropzone } from "react-dropzone"


const accept = {
  "image/*": [],
}

interface Props {
    selectedFile: FileWithPreview | null;
    isDialogOpen: boolean;
    setSelectedFile: React.Dispatch<React.SetStateAction<FileWithPreview | null>>;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function FileUploader({ selectedFile, isDialogOpen, setSelectedFile, setDialogOpen}: Props) {
  

  const onDrop = React.useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const file = acceptedFiles[0]
      if (!file) {
        alert("Selected image is too large!")
        return
      }

      const fileWithPreview = Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
      
      setDialogOpen(true) 
      setSelectedFile(fileWithPreview)
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
  })

  return (
    <div className="relative ">
      {selectedFile ? (
        <ImageCropper
          dialogOpen={isDialogOpen}
          setDialogOpen={setDialogOpen}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
        />
      ) : (
        <Avatar
          {...getRootProps()}
          className="size-36 aspect-square cursor-pointer ring-offset-2 ring-2 ring-slate-200"
        >
          <input {...getInputProps()} />
          <AvatarImage src="https://github.com/alkadoHs.png" alt="@alkadohs" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}