import { TestPilotContext } from '@testpilot/types';
export declare class PlaywrightAdapter implements Partial<TestPilotContext> {
    private browser;
    private page;
    init(): Promise<void>;
    open(url: string): Promise<void>;
    input(selector: string, value: string): Promise<void>;
    tap(selector: string): Promise<void>;
    expect(text: string): Promise<void>;
    close(): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map