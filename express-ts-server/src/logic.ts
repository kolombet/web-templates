
export default {
    greetings: async (time: number) => {
        try {
            let msg = await asyncOp(time)
            return msg
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

let asyncOp = (time: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Hello logic world!")
        }, time)
    })
} 

