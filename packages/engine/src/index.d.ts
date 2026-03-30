import { TestPilotRunner, TestPilotContext } from '@testpilot/types';
export declare class PilotEngine {
    private static tests;
    static register(name: string, runner: TestPilotRunner): void;
    static getTests(): [string, TestPilotRunner][];
    static run(name: string, context: TestPilotContext): Promise<{
        status: string;
        duration: number;
        error?: undefined;
    } | {
        status: string;
        duration: number;
        error: string;
    }>;
}
export declare const pilot: (name: string, runner: TestPilotRunner) => void;
//# sourceMappingURL=index.d.ts.map