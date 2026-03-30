import { TestPilotContext } from '@testpilot/types';
export declare class ApiAdapter implements Partial<TestPilotContext> {
    private client;
    constructor(baseURL?: string);
    get(url: string): Promise<any>;
    post(url: string, data: any): Promise<any>;
    expect(condition: any): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map