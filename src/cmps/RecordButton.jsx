import { useEffect, useState } from "react"
import { speechToTxtService } from '../services/speechToText.service'
import { chatService } from "../services/chat.service"
import { eventBus } from "../services/event-bus.service"
import { Radio } from "monday-ui-react-core/icons"
import { Button } from "monday-ui-react-core"
import { utilService } from "../services/util.service"

export function RecordButton({ currBoard, updateBoardOptimistic }) {
    const [isRecordingOn, setIsRecordingOn] = useState(false)

    useEffect(() => {
        const handleRecord = (isRecording) => {
            console.log('Is recording:', isRecording)
        }

        const handleRecordResults = async (transcript) => {
            const tasks = await onGetAiTasks(transcript)
            const newGroup = createEmptyGroup()
            newGroup.title = transcript
            newGroup.tasks = tasks.map(task => {
                const newTask = createEmptyTask()
                newTask.title = task
                return newTask
            })
            const newBoard = { ...currBoard, groups: [newGroup, ...currBoard.groups] }
            updateBoardOptimistic('board', currBoard._id, null, null, { key: 'groups', value: [...newBoard.groups, newGroup] }, newBoard)
        }

        eventBus.on('record', handleRecord)
        eventBus.on('record-results', handleRecordResults)

        return () => {
            eventBus.removeEventListener('record', handleRecord)
            eventBus.removeEventListener('record-results', handleRecordResults)
        }
    }, [])

    function onRecordStart() {
        console.log('Click')
        speechToTxtService.start()
        setIsRecordingOn(true)
    }
    function onRecordStop() {
        speechToTxtService.stop()
        setIsRecordingOn(false)
    }

    async function onGetAiTasks(transcript) {
        return await chatService.getAiGeneratedTasks(transcript)
    }

    function createEmptyGroup() {
        return {
            id: utilService.makeId(),
            title: '',
            tasks: [],
            style: "grass_green",
            archivedAt: ''
        }
    }
    function createEmptyTask() {
        return {
            id: utilService.makeId(),
            title: '',
            status: '',
            priority: '',
            comments: [],
            memberIds: [],
        }
    }

    const dynRecordBtn = !isRecordingOn ?
        (<Button className="record-btn"
            style={{ "--element-width": "89px" }}
            onClick={onRecordStart}
            leftIcon={Radio}
            kind="tertiary"
            size="xs">
            Record
        </Button>
        ) : (
            <Button className="stop-record-btn"
                onClick={onRecordStop}
                leftIcon={Radio}
                color="negative"
                kind="tertiary"
                size="xs">
                Stop recording
            </Button>)
    return (
        <>
            {<div className="record-btn-container">
                {dynRecordBtn}
            </div>
            }
        </>
    )
}