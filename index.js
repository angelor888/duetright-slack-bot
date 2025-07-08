const { App } = require('@slack/bolt');

// Use environment variables
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const SLACK_SIGNING_SECRET = process.env.SLACK_SIGNING_SECRET;
const SLACK_APP_TOKEN = process.env.SLACK_APP_TOKEN;

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: SLACK_APP_TOKEN
});

const projectChannels = ['proj-vladimir', 'proj-marina', 'proj-sergei', 'proj-stanangelo', 'proj-cbti', 'proj-mike'];

app.message(async ({ message, client }) => {
  console.log('📨 MESSAGE:', message.text);
  console.log('👤 USERNAME:', message.username);
  console.log('🤖 BOT PROFILE:', message.bot_profile?.name);
  
  if (!message.text || message.thread_ts) {
    console.log('❌ Skipping: thread or no text');
    return;
  }
  
  try {
    const channelInfo = await client.conversations.info({ channel: message.channel });
    const channelName = channelInfo.channel.name;
    console.log('📍 CHANNEL:', channelName);
    
    const isProjectChannel = projectChannels.includes(channelName);
    console.log('✅ IS PROJECT CHANNEL?', isProjectChannel);
    if (!isProjectChannel) return;
    
    // User restriction removed - now works for ALL users
    console.log('👥 Message from user:', message.username || message.bot_profile?.name || 'Unknown');
    
    const hasStarPattern = message.text.match(/^\*.+\*$/);
    console.log('⭐ HAS BOLD PATTERN?', hasStarPattern ? 'YES' : 'NO');
    
    if (!hasStarPattern) {
      console.log('❌ No bold pattern, skipping');
      return;
    }
    
    console.log('📌 PINNING MESSAGE NOW!');
    
    await client.pins.add({ 
      channel: message.channel, 
      timestamp: message.ts 
    });
    console.log('✅ PIN ADDED!');
    
    await client.reactions.add({ 
      channel: message.channel, 
      timestamp: message.ts, 
      name: 'pushpin' 
    });
    console.log('✅ REACTION ADDED!');
    
  } catch (error) {
    console.error('❌ ERROR:', error.message);
    if (error.data) {
      console.error('ERROR DETAILS:', error.data);
    }
  }
});

(async () => {
  await app.start();
  console.log('⚡ Bot is running!');
  console.log('📌 Monitoring channels:', projectChannels.join(', '));
})();