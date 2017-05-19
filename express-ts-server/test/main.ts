import { expect } from 'chai'
import business from '../src/logic'

describe('greetings', () => {
    it('should say: "Hello logic world!"', (done: Function) => {
        business.greetings(1000).then((result: string) => {
            expect(result).to.be.a("string")
            expect(result).to.be.equal("Hello logic world!")
            done()
        })
        .catch((err: Error) => {
            done(err)
        })
    })
})

