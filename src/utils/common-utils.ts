class CommonUtils {
  constructor() {
  }

  static getServerPrefix() {
    console.log(window.location.protocol)
    return window.location.protocol + '//'  + import.meta.env.VITE_APP_API_PREFIX
  }

}

export default CommonUtils