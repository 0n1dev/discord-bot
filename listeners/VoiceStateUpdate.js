const { Listener } = require('discord-akairo');

class VoiceStateUpdateListener extends Listener {
    constructor() {
        super('voiceStateUpdate', {
            emitter: 'client',
            eventName: 'voiceStateUpdate'
        });
    }

    async exec(oldMember, newMember) {
      if(oldMember.voiceChannelID){
        const v_channel = oldMember.guild.channels.get(oldMember.voiceChannelID);
        if(v_channel.parentID == '534697401043124240'){
          if(v_channel.members.size == 0){
            v_channel.delete();
          }
        }
      }

      if(newMember.voiceChannelID == '533941421808418817'){
        const newChannelName = `🔴${newMember.user.username}-${newMember.user.discriminator}`;
        const channel = await this.client.guilds.get('305654198341730304')
        .createChannel(newChannelName, 'voice',[{
             id:newMember.guild.defaultRole,
             deny: ['VIEW_CHANNEL']
          },
          {
            id:newMember.user.id,
            allow: ['VIEW_CHANNEL','MANAGE_CHANNELS']
          }
        ], 'Private Channel');
        await channel.setParent('534697401043124240');
        await channel.edit({userLimit:4});
        await newMember.setVoiceChannel(channel.id)
        .then(() => console.log('성공'))
        .catch(console.error);
      }
    }
}

module.exports = VoiceStateUpdateListener;
