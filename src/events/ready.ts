import { Client, Events } from 'discord.js'
import deployCommands from '../deploy-commands'
import botPozo from '../pozo/bot'
import { BotEvent } from '../types'

const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    execute: async (client: Client) => {
        botPozo(client)
        await client.updateWalletInfo(process.env.INVOICE_READ_KEY!)
        deployCommands(client)
        console.log('Discord bot ready with API_KEY: ', process.env.INVOICE_READ_KEY!)
    }
}

export default event
