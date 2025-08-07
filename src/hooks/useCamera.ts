import { useState } from "react"
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera"
import type { CameraPhoto } from "@/types"

export function useCamera() {
  const [isSupported, setIsSupported] = useState(true)

  const takePhoto = async (): Promise<CameraPhoto> => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
      })

      return {
        webPath: image.webPath!,
        format: image.format,
        saved: image.saved || false,
      }
    } catch (error) {
      console.error("Camera error:", error)
      throw new Error("Failed to take photo")
    }
  }

  const pickFromGallery = async (): Promise<CameraPhoto> => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      })

      return {
        webPath: image.webPath!,
        format: image.format,
        saved: image.saved || false,
      }
    } catch (error) {
      console.error("Gallery error:", error)
      throw new Error("Failed to pick photo")
    }
  }

  return {
    takePhoto,
    pickFromGallery,
    isSupported,
  }
}
