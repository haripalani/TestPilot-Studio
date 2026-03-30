export interface TestPilotContext {
  open: (url: string) => Promise<void>;
  input: (selector: string, value: string) => Promise<void>;
  tap: (selector: string) => Promise<void>;
  expect: (textOrCondition: string | boolean) => Promise<void>;
  get: (url: string) => Promise<any>;
  post: (url: string, data: any) => Promise<any>;
}

export type TestPilotRunner = (t: TestPilotContext) => Promise<void>;

export interface TestResult {
  name: string;
  status: 'passed' | 'failed';
  duration: number;
  error?: string;
  logs: string[];
}
