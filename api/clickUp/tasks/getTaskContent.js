export default async (id) => {
    const query = new URLSearchParams({
        custom_task_ids: 'true',
        team_id: process.env.CLICKUP_TEAM_ID,
        include_subtasks: 'true'
    }).toString();
    try {
        const resp = await fetch(
            `https://api.clickup.com/api/v2/task/${id}?${query}`,
            {
                method: 'GET',
                headers: {
                    Authorization: process.env.CLICKUP_AUTH_KEY
                }
            }
        );
        return await resp.json();
    } catch (e) {
        const errorMessage = `error while getting task #${id}:\n${e}`
        console.log(errorMessage)
        throw new Error(errorMessage)
    }
}