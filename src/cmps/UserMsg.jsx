import { useState, useEffect, useRef } from 'react'
import { eventBus } from '../services/event-bus.service'
import { Toast } from 'monday-ui-react-core'

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutIdRef = useRef()

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

        return () => {
            unsubscribe()
        }
    }, [])

    function closeMsg() {
        setMsg(null)
    }

    if (!msg) return <span></span>
    return (
        <div >
            <Toast open type={msg.type} className="monday-storybook-toast_box user-msg">
                {msg.txt}
            </Toast>
        </div>

    )
}