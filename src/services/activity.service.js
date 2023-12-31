import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const activityService = {
    getActivities,
    getActivityById,
    addActivity,
    updateActivity,
    deleteActivity,
    getEmptyActivity
}

async function addActivity({ txt, boardId, groupId, taskId }) {
    const activity = getEmptyActivity()
    activity.txt = txt
    activity.boardId = boardId
    activity.groupId = groupId
    activity.taskId = taskId
    return await storageService.post('activity', activity)
}

function getEmptyActivity() {
    return {
        id: utilService.makeId(),
        createdAt: Date.now(),
        by: '',
        entityId: '',
        action: '',
    }
}