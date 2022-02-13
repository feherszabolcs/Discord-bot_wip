module.exports ={
    name: 'leave',
    description : 'stop music, and leave the bot',
    async execute(message, args){
        const voiceChannel = message.member.voice.channel;

        if(!voiceChannel) return message.channel.send("***You are not in a voice channel!***");
        await voiceChannel.leave();
        await message.channel.send("***Leaving:((***");
    }
}