import express from 'express'
import sendMessage from "../api/googleChat/sendMessage.js";
import sendThread from "../api/googleChat/sendThread.js";
import getMessage from "../scripts/getMessage.js";
import getTaskContent from "../api/clickUp/tasks/getTaskContent.js";

export default {
    init: async (url, port) => {
        const app = express()
        app.use(express.json())

        try {
            await app.listen(port, () => {
                console.log(`Example app listening at http://localhost:${port}`)
                console.log(`ngrok tunnel opened at: ${url}`);
                console.log("Open the ngrok dashboard at: https://localhost:4040\n");
            })
        } catch (e) {
            console.log('server error:', e)
            process.exit(1)
        }

        app.post('/', async (request, response) => {
            try {
                const clickUpEvent = request.body
                const eventName = clickUpEvent.event;
                const eventId = clickUpEvent.id;
                console.log(`ClickUp | ${eventId} | ${eventName}`);
                if (eventName === 'taskCreated') {
                    const taskId = clickUpEvent['task_id'];
                    const taskContent = await getTaskContent(taskId)
                    const message = getMessage(taskContent)
                    let messageResponse = await sendMessage(message)
                    if (message.thread) {
                        const threadId = messageResponse.thread.threadKey
                        await sendThread(threadId, message.thread)
                    }
                }
                response.json({'success': true})
            } catch (e) {
                console.log(e)
                response.code(500).json({'success': false, error: e})
            }
        })
    }
}
