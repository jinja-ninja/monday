import { useEffect, useState } from "react"
import { speechToTxtService } from '../services/speechToText.service'
import { chatService } from "../services/chat.service"
import { eventBus } from "../services/event-bus.service"
import { Radio } from "monday-ui-react-core/icons"
import { Button } from "monday-ui-react-core"
import { boardService } from "../services/board.service.local"
import { updateBoard } from "../store/actions/board.action"
import { useDispatch } from "react-redux"
import { SET_IS_LOADING } from "../store/reducers/board.reducer"
import { AiLoader } from "./AiLoader"
import { useSelector } from "react-redux"

export function RecordButton({ currBoard, setIsAiOpen }) {
    const isLoading = useSelector(state => state.boardModule.isLoading)
    const dispatch = useDispatch()
    const [isRecordingOn, setIsRecordingOn] = useState(false)

    useEffect(() => {
        const handleRecord = (isRecording) => {
            console.log('Is recording:', isRecording)
        }

        const handleRecordResults = async (transcript) => {
            const tasks = await onGetAiTasks(transcript)
            const newGroup = boardService.getEmptyGroup()
            newGroup.title = transcript
            newGroup.tasks = tasks.map(task => {
                const newTask = boardService.getEmptyTask()
                newTask.title = task
                return newTask
            })
            const newBoard = { ...currBoard, groups: [newGroup, ...currBoard.groups] }
            updateBoard('board', currBoard._id, null, null, { key: 'groups', value: [...newBoard.groups] })
            dispatch({ type: SET_IS_LOADING, isLoading: false })
            setIsAiOpen(false)
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
        dispatch({ type: SET_IS_LOADING, isLoading: true })
    }

    async function onGetAiTasks(transcript) {
        return await chatService.getAiGeneratedTasks(transcript)
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
            {!isLoading ?
                <div className="record-btn-container">{dynRecordBtn}</div>
                : <AiLoader />}
        </>
    )
}