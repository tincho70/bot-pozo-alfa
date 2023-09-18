import fetch from 'node-fetch'
import { ApiYadio } from './Yadio.d'

const convert = async (amount: number, from: string, to: string): Promise<ApiYadio | undefined> => {
    try {
        const response = await fetch(`https://api.yadio.io/convert/${amount}/${from}/${to}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        })

        if (!response.ok) {
            throw new Error(`[convert] Error! status: ${response.status}`)
        }

        const result = (await response.json()) as ApiYadio

        return result
    } catch (error) {
        if (error instanceof Error) {
            console.log('[convert] Error message: ', error.message)
            return undefined
        } else {
            console.log('[convert] Unexpected error: ', error)
            return undefined
        }
    }
}

export default convert
