import { eventBus } from "./event-bus.service.js"

var setUp = {
    recognition: new webkitSpeechRecognition(),

    addListeners() {
        this.recognition.onstart = () => {
            eventBus.emit('record', true)
        }
        this.recognition.onend = () => {
            eventBus.emit('record', false)
        }
        this.recognition.onerror = (ev) => {
            console.debug('♠️ ~ file: textToSpeech.service.js:13 ~ addListeners ~ err:', ev.error)
            eventBus.emit('record', false)
        }
        this.recognition.onresult = (ev) => {
            var transcript = ev.results[0][0].transcript
            eventBus.emit('record-results', transcript)
        }

    },
    start() {
        this.addListeners()
        this.recognition.lang = 'en-US'
        this.recognition.start()
    },
    stop() {
        this.recognition.stop()
    },
    pause() {
        this.recognition.pause()
    }
}

export const speechToTxtService = setUp