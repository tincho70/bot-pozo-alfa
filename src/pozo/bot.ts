import { ActivityType, Client, ClientPresence } from 'discord.js'
import getWalletInfo from './walletInfo'
import convert from './Yadio'

const botPozo = (client: Client) => {
    client.updateWalletInfo = async (apiKey: string) => {
        try {
            const walletInfo = await getWalletInfo(apiKey)
            if (walletInfo) {
                const balance = Math.ceil(walletInfo.balance / 1000)
                const yadio = await convert(balance/100000000, 'BTC', 'ARS')
                const enARS = (yadio && !yadio.error)
                client.user!.setPresence({
                    activities: [{
                        type: ActivityType.Custom,
                        name: "custom", // name is exposed through the API but not shown in the client for ActivityType.Custom
                        state: enARS ? `$${yadio.result.toLocaleString('es-AR')} ARS` : "⚡ Pozo ⚡",
                    }],
                    status: "online"
                })
                client.guilds.cache.forEach((guild, key) => {
                    guild.members.me?.setNickname(
                        `${balance.toLocaleString('es-AR')} sats`
                    ).catch(console.error)
                })
            }
        
            setTimeout(() => {
                client.updateWalletInfo(apiKey)
            }, 1000 * 60 * 1)
        } catch (error) {
            console.error(error)
            setTimeout(() => {
                client.updateWalletInfo(apiKey)
            }, 1000 * 60 * 2)
        }
    }
}

export default botPozo
