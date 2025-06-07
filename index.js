import { TodoistApi } from "@doist/todoist-api-typescript";
import { configDotenv } from "dotenv";
import inquirer from "inquirer";

configDotenv();
console.clear();

const API_KEY = process.env.TODOIST_API_KEY;
const todoist = new TodoistApi(API_KEY);




const scheduleToday = async () => {
	try {
		let allLabelTasks = await todoist
			.getTasksByFilter({ query: "@taskmaster & today" })
			.then((data) => data.results);

            if (allLabelTasks.length < 1) {
                console.log('There are not any tasks available.');
                console.log(' ');
            }

		for (const task of allLabelTasks) {
			await todoist.closeTask(task.id);

			const answer = await inquirer.prompt([
				{
					type: "input",
					name: "newTask",
					message: `How would you like to use the time block: ${task.content}?`,
				},
			]);

			await todoist.addTask({
				content: answer.newTask,
				dueDate: task.due.date,
				duration: task.duration.amount,
				durationUnit: task.duration.unit,
			});
		}
	} catch (error) {
		console.error(error);
	}
};




const runScript = async () => {
	const answer = await inquirer.prompt([
		{
			// type: "select",
            type: "list",
			name: "pickTool",
			message: "Choose and option...\n\n",
			choices: ["Schedule Today", "Exit"],
			default: "Exit",
		},
	]);
	await console.log(answer.pickTool);

	switch (answer.pickTool) {
		case "Schedule Today":
			console.log(" ");
			await scheduleToday();
			break;
		case "Exit":
			console.clear();
            console.log('Have a nice day!');
			console.log(" ");
			process.exit(0);
	}

	await runScript();
};



runScript();