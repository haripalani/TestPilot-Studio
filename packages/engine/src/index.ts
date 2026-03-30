import { TestPilotRunner, TestPilotContext } from '@testpilot/types';

export class PilotEngine {
  private static getTestsMap(): Map<string, TestPilotRunner> {
    const g = globalThis as any;
    if (!g.__PILOT_TESTS__) {
      g.__PILOT_TESTS__ = new Map();
    }
    return g.__PILOT_TESTS__;
  }

  static register(name: string, runner: TestPilotRunner) {
    this.getTestsMap().set(name, runner);
  }

  static getTests() {
    return Array.from(this.getTestsMap().entries());
  }

  static async run(name: string, context: TestPilotContext) {
    const runner = this.getTestsMap().get(name);
    if (!runner) throw new Error(`Test ${name} not found`);
    
    console.log(`🚀 Running test: ${name}`);
    const start = Date.now();
    try {
      await runner(context);
      const duration = Date.now() - start;
      console.log(`✅ Test passed: ${name} (${duration}ms)`);
      return { status: 'passed', duration };
    } catch (error) {
      const duration = Date.now() - start;
      console.error(`❌ Test failed: ${name} (${duration}ms)`);
      console.error(error);
      return { status: 'failed', duration, error: String(error) };
    }
  }
}

export const pilot = (name: string, runner: TestPilotRunner) => {
  PilotEngine.register(name, runner);
};
