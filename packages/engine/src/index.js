"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pilot = exports.PilotEngine = void 0;
class PilotEngine {
    static tests = new Map();
    static register(name, runner) {
        this.tests.set(name, runner);
    }
    static getTests() {
        return Array.from(this.tests.entries());
    }
    static async run(name, context) {
        const runner = this.tests.get(name);
        if (!runner)
            throw new Error(`Test ${name} not found`);
        console.log(`🚀 Running test: ${name}`);
        const start = Date.now();
        try {
            await runner(context);
            const duration = Date.now() - start;
            console.log(`✅ Test passed: ${name} (${duration}ms)`);
            return { status: 'passed', duration };
        }
        catch (error) {
            const duration = Date.now() - start;
            console.error(`❌ Test failed: ${name} (${duration}ms)`);
            console.error(error);
            return { status: 'failed', duration, error: String(error) };
        }
    }
}
exports.PilotEngine = PilotEngine;
const pilot = (name, runner) => {
    PilotEngine.register(name, runner);
};
exports.pilot = pilot;
//# sourceMappingURL=index.js.map