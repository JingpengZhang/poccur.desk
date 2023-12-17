class CommonUtils {
  constructor() {
  }

  static getServerPrefix() {
    return window.location.protocol + '//'  + import.meta.env.VITE_APP_API_PREFIX
  }

}

export default CommonUtils