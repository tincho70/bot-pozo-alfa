import { Client, Events } from 'discord.js'
import deployCommands from '../deploy-commands'
import botPozo from '../pozo/bot'
import { BotEvent } from '../types'

const event: BotEvent = {
    name: Events.ClientReady,
    once: true,
    execute: async (client: Client) => {
        botPozo(client)
        client.updateWalletInfo(process.env.INVOICE_READ_KEY!)
        deployCommands(client)
        console.log('Discord bot ready')
    }
}

export default event
