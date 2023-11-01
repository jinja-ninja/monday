import { useEffect, useState } from "react"
import { speechToTxtService } from '../services/speechToText.service'
import { eventBus } from "../services/event-bus.service"
import { Radio } from "monday-ui-react-core/icons"
import { Button } from "monday-ui-react-core"

export function RecordButton({ addTaskToFirstGroup }) {
    const [isRecordingOn, setIsRecordingOn] = useState(false)

    useEffect(() => {
        const handleRecord = (isRecording) => {
            console.log('Is recording:', isRecording)
        }

        const handleRecordResults = (transcript) => {
            console.log('Transcript:', transcript)
            addTaskToFirstGroup(transcript)
        }

        eventBus.on('record', handleRecord)
        eventBus.on('record-results', handleRecordResults)

        // return () => {
        //     eventBus.off('record', handleRecord)
        //     eventBus.off('record-results', handleRecordResults)
        // }
    }, [])

    function onRecordStart() {
        speechToTxtService.start()
        setIsRecordingOn(true)
    }
    function onRecordStop() {
        speechToTxtService.stop()
        setIsRecordingOn(false)
    }

    return (
        <>
            {
                !isRecordingOn ? <Button className="record-btn" onClick={onRecordStart} leftIcon={Radio} kind="tertiary" size="xs">Record</Button> :
                    <Button className="stop-record-btn" onClick={onRecordStop} leftIcon={Radio} color="negative" kind="tertiary" size="xs">Stop recording</Button>
            }
        </>
    )
}