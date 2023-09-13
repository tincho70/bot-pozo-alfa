import { ActivityType, Client } from 'discord.js'
import { ApiWallet } from 'src/types'
import getWalletInfo from './walletInfo'

const botPozo = (client: Client) => {
    client.updateWalletInfo = async (apiKey: string) => {
        const walletInfo = await getWalletInfo(apiKey)
        if (walletInfo) {
            client.user!.setPresence({
                activities: [{
                     type: ActivityType.Custom,
                     name: "custom", // name is exposed through the API but not shown in the client for ActivityType.Custom
                     state: "⚡ Pozo ⚡",
                }]
            })
            const balance = Math.ceil(walletInfo.balance / 1000)
            client.guilds.cache.forEach((guild, key) => {
                guild.members.me?.setNickname(
                    `${balance.toLocaleString('es-AR')} sats`
                )
            })
        }
    
        setTimeout(() => {
            client.updateWalletInfo(apiKey)
        }, 1000 * 60 * 1)
    }
}

export default botPozo
