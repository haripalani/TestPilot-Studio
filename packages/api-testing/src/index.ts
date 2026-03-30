import axios, { AxiosInstance } from 'axios';
import { TestPilotContext } from '@testpilot/types';

export class ApiAdapter implements Partial<TestPilotContext> {
  private client: AxiosInstance;

  constructor(baseURL?: string) {
    this.client = axios.create({ baseURL });
  }

  async get(url: string) {
    const response = await this.client.get(url);
    console.log(`📡 GET ${url} -> ${response.status}`);
    return response.data;
  }

  async post(url: string, data: any) {
    const response = await this.client.post(url, data);
    console.log(`📡 POST ${url} -> ${response.status}`);
    return response.data;
  }

  async expect(condition: any) {
    // Basic implementation for API expectation
    if (!condition) {
      throw new Error(`API expectation failed`);
    }
  }
}
