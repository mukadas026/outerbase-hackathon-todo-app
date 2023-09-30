import {randomUUID} from 'crypto'

export const generateID = () => {
    return randomUUID()
}