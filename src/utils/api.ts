const BASE_URL = `${import.meta.env.VITE_BASE_URL}`.includes("localhost")
  ? `http://${import.meta.env.VITE_BASE_URL}/api/v1`
  : `https://${import.meta.env.VITE_BASE_URL}`

class Api {
  static async init<T>(endpoint: string, config?: RequestInit): Promise<T> {
    return fetch(`${BASE_URL}${endpoint}`, {
      ...config,
      headers: {
        "Accept": "application/json, application/xml, text/plain, text/html, *.*",
        "Content-type": "application/json;charset=UTF-8"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json() as Promise<{ data: T }>
      })
      .then(data => {
        return data.data;
      })
      .catch((errors) => {
        const error = new Error(errors ?? 'unknown')
        return Promise.reject(error)
      })
  }

  static async get(endpoint: string, data?: string | URLSearchParams | Record<string, string> | string[][] | undefined) {
    let endpointWithParams = endpoint + new URLSearchParams(data)
    return this.init(endpointWithParams)
  }

  static async mutate(
    endpoint: string,
    config: Pick<RequestInit, "body" | "headers">,
    method: "POST" | "PUT" | "PATCH" | "DELETE"
  ) {

    const headers = (config.headers && Object.keys(config.headers).length > 0)
      ? config.headers
      : {
        "Accept": "application/json",
        "Content-type": "application/json;charset=UTF-8"
      }

    const initConfig = {
      method,
      headers,
      body: config.body
    }
    return this.init(endpoint, initConfig)
  }

  static async post(endpoint: string, config: Pick<RequestInit, "body" | "headers">) {
    return this.mutate(endpoint, config, "POST")
  }

  static async put(endpoint: string, config: Pick<RequestInit, "body" | "headers">) {
    return this.mutate(endpoint, config, "PUT")
  }

  static async patch(endpoint: string, config: Pick<RequestInit, "body" | "headers">) {
    return this.mutate(endpoint, config, "PATCH")
  }

  static async delete(endpoint: string, config: Pick<RequestInit, "body" | "headers">) {
    return this.mutate(endpoint, config, "DELETE")
  }
}

export default Api;