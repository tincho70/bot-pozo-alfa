import { ActivityType, Client } from 'discord.js'
import { ApiWallet } from 'src/types'
import getWalletInfo from './walletInfo'

const botPozo = (client: Client) => {
    client.updateWalletInfo = async (apiKey: string) => {
        const walletInfo = await getWalletInfo(apiKey)
        if (walletInfo) {
            client.user!.setActivity(`Pozo :lacrylta:`, {
                type: ActivityType.Watching
            })
            const balance = Math.ceil(walletInfo.balance / 1000)
            client.guilds.cache.forEach((guild, key) => {
                guild.members.me?.setNickname(
                    `${balance} sats`
                )
            })
        }
    
        setTimeout(() => {
            client.updateWalletInfo(apiKey)
        }, 1000 * 60 * 1)
    }
}

export default botPozo
