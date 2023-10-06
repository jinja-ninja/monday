import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { eventBus } from '../services/event-bus.service'
import { Button, Modal, ModalContent, ModalFooterButtons, Toast } from 'monday-ui-react-core'
// import { socketService, SOCKET_EVENT_REVIEW_ABOUT_YOU } from "../services/socket.service.js"

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

    const [toastOpen, setToastOpen] = useState(false);

    // const actions = useMemo(() => [{
    //     type: Toast.actionTypes.BUTTON,
    //     content: "Undo"
    // }], []);

    useEffect(() => {
        const unsubscribe = eventBus.on('show-msg', (msg) => {
            setMsg(msg)
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (timeoutIdRef.current) {
                timeoutIdRef.current = null
                clearTimeout(timeoutIdRef.current)
            }
            timeoutIdRef.current = setTimeout(closeMsg, 3000)
        })

        // socketService.on(SOCKET_EVENT_REVIEW_ABOUT_YOU, (review) => {
        //     showSuccessMsg(`New review about me ${review.txt}`)
        // })

        return () => {
            unsubscribe()
            // socketService.off(SOCKET_EVENT_REVIEW_ABOUT_YOU)
        }
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return <span></span>
    return (
        // <section className={`user-msg ${msg.type}`}>
        //     <button onClick={closeMsg}>x</button>
        //     {msg.txt}

        <div >
            <Toast open type={msg.type} className="monday-storybook-toast_box user-msg">
                {msg.txt}
            </Toast>
        </div>


    )
}