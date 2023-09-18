import fetch from 'node-fetch'
import { ApiWallet } from 'src/types'

const getWalletInfo = async (apiKey: string): Promise<ApiWallet | undefined> => {
    try {
        const response = await fetch('https://wallet.lacrypta.ar/api/v1/wallet', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'X-Api-Key': apiKey
            }
        })

        if (!response.ok) {
            throw new Error(`[getWalletInfo] Error! status: ${response.status}`)
        }

        const result = (await response.json()) as ApiWallet

        return result
    } catch (error) {
        if (error instanceof Error) {
            console.log('[getWalletInfo] Error message: ', error.message)
            return undefined
        } else {
            console.log('[getWalletInfo] Unexpected error: ', error)
            return undefined
        }
    }
}

export default getWalletInfo
