import {v4 as uuidv4} from 'uuid';

export default async (m) => {
    const threadId = uuidv4();
    const webhookURL = process.env.GOOGLECHAT_WEBHOOK_URL + `&threadKey=${threadId}&messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD`

    try {
        const resp = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                text: `@${m.sender.username} - ${m.sender.email} created a new ClickUp Task: ${m.header} => ${m.url}`
            }),
        })
        return resp.json();
    } catch (e) {
        const errorMessage = `error while sending message #${threadId}:\n${e}`
        console.log(errorMessage)
        throw new Error(errorMessage)
    }
}
