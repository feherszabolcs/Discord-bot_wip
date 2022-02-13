const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

ffmpeg_options = {
    'options' :'-vn',
    "before_options":"-reconnect 1 -reconnect_streamed 1 -reconnect_delay_max 5"
}

module.exports={
    name: 'play',
    description: 'Play a music from youtube',
    async execute(message,args){
        const vChanel = message.member.voice.channel;
        if(!vChanel) return message.channel.send('You are not in a voice channel!');
        const permissions = vChanel.permissionsFor(message.client.user);
        if(!permissions.has('CONNECT')) return message.channel.send('No permission to connect your voice channel!');
        if(!permissions.has('SPEAK')) return message.channel.send('No permission to speak in your voice channel!');
        if(!args.length) return message.channel.send('No argument recieved!')

         const validURL = (str) =>{
             var reg = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!.?+=&%!\-\/]))?/;//Regex check, valid url-e
             if(!reg.test(str)) return false;
             else return true;
         }

         if(validURL(args[0])){ //URL alapján
             console.log(args[0]);
             ytdl.getInfo(args[0]).then(info =>{
                message.reply(`Now playing: ***${info.videoDetails.title}***`);
             });
             const con = await vChanel.join();
             const stream = ytdl(args[0], {filter:'audioonly'});

            con.play(stream, {seek: 0, volume: 1}).on('finish', () =>{
                 vChanel.leave();
             });
             return;
         }

        const con = await vChanel.join();

        const MusicFinder = async(query)=>{
            const result = await ytSearch(query);
            return (result.videos.length > 1)? result.videos[0] : null; //az első match visszaküldése a kulcscsó alapjan
        }
        const video = await MusicFinder(args.join(' '));
        if(video){
            const stream = ytdl(video.url, {filer: 'audioonly'});
            con.play(stream, {seek: 0, volume: 1}).on('finish', () =>{
                vChanel.leave();
            })
            await message.reply(`Now playing: ***${video.title}***`)
        }else{
            message.channel.send('No videos found.')
        }
    }
}