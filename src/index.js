require('dotenv').config()
const { token } = process.env
const { Client, GatewayIntentBits, User, DMChannel, PartialGroupDMChannel } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders'); //SlashCommandBuilderを読み込む
const { REST } = require('@discordjs/rest'); //RESTを読み込む
const { Routes } = require('discord-api-types/v9'); //Routesを読み込む
const client = new Client({
	intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages],
});

//起動確認用
client.once('ready', () => {
    console.log(`${client.user.tag} Ready`);
    client.user.setPresence({ activities: [{ name:'Test SlachCommand' }] }); // 「...をプレイ中」のステータスメッセージの表示
});

client.once("ready", async () => { //スラッシュコマンドを実装しようとしたやつ
    const commands = [
        new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'), //pingコマンド
        new SlashCommandBuilder().setName('auth').setDescription('Start auth!'), //authコマンド
    ]
    const commands1 = [
        new SlashCommandBuilder().setName('hello').setDescription('Replies with hello!'), //helloコマンド
    ]
        .map(command => command.toJSON());
    
    const rest = new REST({ version: '9' }).setToken(token);
    
    rest.put(Routes.applicationGuildCommands('1068519674431672340', '1068530026187862128'), { body: commands }) 
        .then(() => console.log('Successfully registered guild application commands.'))
        .catch(console.error); //指定したサーバーにコマンドを登録・更新

    rest.put(Routes.applicationCommands('1068519674431672340'), { body: commands1 }) 
        .then(() => console.log('Successfully registered global application commands.'))
        .catch(console.error); //コマンドを登録・更新（グローバル）
});

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) {
        return;
    }
    if (interaction.commandName === 'hello') {
        await interaction.reply('hi!');
    }
    if(interaction.commandName === 'ping'){
        await interaction.reply('Pong!')
    }
    if (interaction.commandName === 'auth') {
        await interaction.reply('auth start!');
    }
});

//Discordへの接続
client.login(token);
