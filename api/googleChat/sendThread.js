export default async (id, t) => {
    const webhookURL = process.env.GOOGLECHAT_WEBHOOK_URL + `&threadKey=${id}&messageReplyOption=REPLY_MESSAGE_FALLBACK_TO_NEW_THREAD`
    try {
        const resp = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                text: t
            }),
        })
        return resp.json();
    } catch (e) {
        const errorMessage = `error while sending message thread #${id}:\n${e}`
        console.log(errorMessage)
        throw new Error(errorMessage)
    }
}
