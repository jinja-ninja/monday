import { httpService } from './http.service.js'
const BASE_URL = 'chat'

async function getAiGeneratedTasks(message) {
    const newMessage =
        'Seperate this mission into small, short tasks: '
        + message
        + ' Please return your response as an array strings ready to be used as a JSON'
        + `Here is an exmaple of the format of the data that I want to recieve: ['make a meal', 'eat the meal', 'clean the dishes']`
        + 'Please make sure that your answer only consists of the tasks array and not any other text'

    let response = await httpService.post(BASE_URL, { message: newMessage })
    const answer = response.choices[0].message.content
    return JSON.parse(answer)
}

export const chatService = {
    getAiGeneratedTasks
}