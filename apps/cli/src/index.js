"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const engine_1 = require("@testpilot/engine");
const playwright_adapter_1 = require("@testpilot/playwright-adapter");
const api_testing_1 = require("@testpilot/api-testing");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const program = new commander_1.Command();
program
    .name('pilot')
    .description('TestPilot CLI - Unified Testing Platform')
    .version('0.1.0');
program
    .command('run')
    .description('Run a TestPilot test file')
    .argument('<file>', 'Test file to run (.pilot.ts)')
    .option('-v, --verbose', 'Verbose output')
    .action(async (file, options) => {
    const filePath = path.resolve(process.cwd(), file);
    if (!fs.existsSync(filePath)) {
        console.error(chalk_1.default.red(`Error: File ${file} not found`));
        process.exit(1);
    }
    console.log(chalk_1.default.cyan(`✈️  TestPilot is taking off...`));
    console.log(chalk_1.default.dim(`Loading: ${file}`));
    // In a real version, we'd use a more robust loader
    // For the prototype, we assume we are running via tsx
    try {
        await Promise.resolve(`${filePath}`).then(s => __importStar(require(s)));
    }
    catch (err) {
        console.error(chalk_1.default.red(`Failed to load test file: ${err}`));
        process.exit(1);
    }
    const tests = engine_1.PilotEngine.getTests();
    if (tests.length === 0) {
        console.warn(chalk_1.default.yellow(`No tests found in ${file}`));
        return;
    }
    const pw = new playwright_adapter_1.PlaywrightAdapter();
    const api = new api_testing_1.ApiAdapter();
    // Compose the context
    const context = {
        open: (url) => pw.open(url),
        input: (selector, value) => pw.input(selector, value),
        tap: (selector) => pw.tap(selector),
        expect: (text) => pw.expect(text),
        get: (url) => api.get(url),
        post: (url, data) => api.post(url, data),
    };
    await pw.init();
    for (const [name, runner] of tests) {
        await engine_1.PilotEngine.run(name, context);
    }
    await pw.close();
    console.log(chalk_1.default.green(`🏁 All tests completed.`));
});
program.parse();
//# sourceMappingURL=index.js.map