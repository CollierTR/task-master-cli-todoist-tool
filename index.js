import { TodoistApi } from '@doist/todoist-api-typescript'
import { configDotenv,  } from 'dotenv'
configDotenv();

console.clear()


const API_KEY = process.env.TODOIST_API_KEY

const api = new TodoistApi(API_KEY)

// api.getTasks({label: "task master"})
//     .then((tasks) => {
//         tasks.results.map((task) => {
//             console.log(task.due)
//         })
//     })
//     .catch((error) => console.log(error))

// api.getLabels()
//     .then((data) => console.log(data))
//     .catch((error) => console.log(error))

api.getTasksByFilter({query: 'today|overdue'})
    .then((data) => console.log(data))
    .catch((error) => console.log(error))