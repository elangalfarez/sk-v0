import type { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "com.supermal.karawaci",
  appName: "Supermal Karawaci",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
  plugins: {
    Camera: {
      permissions: ["camera", "photos"],
    },
    PushNotifications: {
      presentationOptions: ["badge", "sound", "alert"],
    },
    StatusBar: {
      style: "dark",
      backgroundColor: "#121421",
    },
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: "#121421",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: true,
      spinnerColor: "#D4AF37",
    },
    Haptics: {},
    Geolocation: {
      permissions: ["location"],
    },
    Preferences: {},
    Filesystem: {},
    Share: {},
    Toast: {},
  },
  ios: {
    contentInset: "automatic",
    scrollEnabled: true,
    backgroundColor: "#121421",
  },
  android: {
    backgroundColor: "#121421",
    allowMixedContent: true,
    captureInput: true,
  },
}

export default config
