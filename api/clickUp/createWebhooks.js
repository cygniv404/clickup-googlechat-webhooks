export default async (webhookEndpoint, teamId, authorizationKey) => {
    try {
        await fetch(
            `https://api.clickup.com/api/v2/team/${teamId}/webhook`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: authorizationKey
                },
                body: JSON.stringify({
                    endpoint: webhookEndpoint,
                    events: [
                        'taskCreated',
                        'taskUpdated',
                        'taskDeleted',
                        'taskPriorityUpdated',
                        'taskStatusUpdated',
                        'taskAssigneeUpdated',
                        'taskDueDateUpdated',
                        'taskTagUpdated',
                        'taskMoved',
                        'taskCommentPosted',
                        'taskCommentUpdated',
                        'taskTimeEstimateUpdated',
                        'taskTimeTrackedUpdated',
                        'listCreated',
                        'listUpdated',
                        'listDeleted',
                        'folderCreated',
                        'folderUpdated',
                        'folderDeleted',
                        'spaceCreated',
                        'spaceUpdated',
                        'spaceDeleted',
                        'goalCreated',
                        'goalUpdated',
                        'goalDeleted',
                        'keyResultCreated',
                        'keyResultUpdated',
                        'keyResultDeleted'
                    ]
                })
            }
        );
    } catch (e) {
        console.log('webhook creation error: ', e)
    }
}
