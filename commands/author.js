module.exports={
    name :'author',
    description: "Basic command for the author.",
    execute(message, args){
        message.channel.send('https://www.github.com/feherszabolcs');
    }
}