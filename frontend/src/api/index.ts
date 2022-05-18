class Api {
  async request<T>(
    endpoint: string,
    method: 'GET' | 'POST',
    body?: any,
  ): Promise<T> {
    const requestConfig: RequestInit = {
      method,
      headers: {
        'Content-type': 'application/json',
      },
    };

    if (body && method !== 'GET') {
      requestConfig.body = JSON.stringify(body);
      requestConfig.credentials = 'include';
    }

    const response = await (
      await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, requestConfig)
    ).json();
    return response;
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, 'GET');
  }

  post<T>(endpoint: string, data: unknown) {
    return this.request<T>(endpoint, 'POST', data);
  }
}

const ApiHandler = new Api();

export default ApiHandler;
