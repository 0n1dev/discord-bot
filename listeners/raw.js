const { Listener } = require('discord-akairo');

class RawListener extends Listener {
    constructor() {
        super('raw', {
            emitter: 'client',
            eventName: 'raw'
        });
    }

    async exec(event) {
       const events = {
         MESSAGE_REACTION_ADD: 'messageReactionAdd',
         MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
       };

       if (!events.hasOwnProperty(event.t)) return;

       const { d: data } = event;
       const user = this.client.users.get(data.user_id);
       const guild = this.client.guilds.get(data.guild_id);
       const g_user = guild.members.get(user.id);
       const channel = this.client.channels.get(data.channel_id) || await user.createDM();
       const message = await channel.fetchMessage(data.message_id);
       const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
       const reaction = message.reactions.get(emojiKey);

       if(guild.id == '305654198341730304' && channel.id == '533937326540324864' && message.id == '533937969846026250' && emojiKey == '✅'){
         if(g_user.voiceChannelID){
           const v_channel = guild.channels.get(g_user.voiceChannelID);
           if(v_channel.parentID == '534697401043124240'){
             if(v_channel.permissionOverwrites.has(g_user.id)){
              const permission = v_channel.permissionOverwrites.get(guild.defaultRole.id);
              if(permission.deny == '1024'){
                v_channel.overwritePermissions(guild.defaultRole.id,{
                  VIEW_CHANNEL: true
                })
                .then(function(){
                  if(v_channel.name.indexOf('🔴') == 0){
                    return v_channel.setName('🔵'+ v_channel.name.substring(2,v_channel.name.length));
                  }
                  return v_channel.setName('🔵'+ v_channel.name);
                })
                .catch(console.error);
              }else{
                v_channel.overwritePermissions(guild.defaultRole.id,{
                  VIEW_CHANNEL: false
                })
                .then(function(){
                  if(v_channel.name.indexOf('🔵') == 0){
                    return v_channel.setName('🔴'+ v_channel.name.substring(2,v_channel.name.length));
                  }
                  return v_channel.setName('🔴'+ v_channel.name);
                })
                .catch(console.error);
              }
             }
           }
         }
       }
    }
}

module.exports = RawListener;
