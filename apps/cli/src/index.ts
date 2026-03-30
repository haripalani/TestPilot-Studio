import { Command } from 'commander';
import { PilotEngine } from '@testpilot/engine';
import { PlaywrightAdapter } from '@testpilot/playwright-adapter';
import { ApiAdapter } from '@testpilot/api-testing';
import * as path from 'path';
import * as fs from 'fs';
import { pathToFileURL } from 'url';
import chalk from 'chalk';

const program = new Command();

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
      console.error(chalk.red(`Error: File ${file} not found`));
      process.exit(1);
    }

    console.log(chalk.cyan(`✈️  TestPilot is taking off...`));
    console.log(chalk.dim(`Loading: ${file}`));

    // In a real version, we'd use a more robust loader
    // For the prototype, we assume we are running via tsx
    const absPath = pathToFileURL(filePath).href;
    console.log(chalk.dim(`Importing from: ${absPath}`));
    try {
      await import(absPath);
    } catch (err) {
      console.error(chalk.red(`Failed to load test file: ${err}`));
      process.exit(1);
    }

    const tests = PilotEngine.getTests();
    if (tests.length === 0) {
      console.warn(chalk.yellow(`No tests found in ${file}`));
      return;
    }

    const pw = new PlaywrightAdapter();
    const api = new ApiAdapter();

    // Compose the context
    const context: any = {
      open: (url: string) => pw.open(url),
      input: (selector: string, value: string) => pw.input(selector, value),
      tap: (selector: string) => pw.tap(selector),
      expect: (condition: string | boolean) => pw.expect(condition),
      get: (url: string) => api.get(url),
      post: (url: string, data: any) => api.post(url, data),
    };

    await pw.init();

    for (const [name, runner] of tests) {
      await PilotEngine.run(name, context);
    }

    await pw.close();
    console.log(chalk.green(`🏁 All tests completed.`));
  });

program.parse();
