import { pilot } from '@testpilot/engine';
import { TestPilotContext } from '@testpilot/types';

pilot("Example Login Flow", async (t: TestPilotContext) => {
    await t.open("https://example.com");
    await t.expect("Example Domain");
    
    // API Section
    const data = await t.get("https://jsonplaceholder.typicode.com/todos/1");
    await t.expect(data.id === 1);
    
    console.log("Custom log from test: API data received", data.title);
});
