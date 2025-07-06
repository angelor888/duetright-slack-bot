const { App } = require('@slack/bolt');

console.log('Starting bot...');
console.log('Token check:', {
  bot: process.env.SLACK_BOT_TOKEN ? 'Present' : 'Missing',
  signing: process.env.SLACK_SIGNING_SECRET ? 'Present' : 'Missing',
  app: process.env.SLACK_APP_TOKEN ? 'Present' : 'Missing'
});

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

const projectChannels = [
  'proj-vladimir', 
  'proj-marina', 
  'proj-sergei', 
  'proj-stanangelo', 
  'proj-cbti', 
  'proj-mike',
  'proj-sarah',
  'proj-test',
  'new-request'
];

// Add debug for ALL events
app.event('message', async ({ event }) => {
  console.log('🔵 RAW EVENT:', JSON.stringify(event, null, 2));
});

app.message(async ({ message, client }) => {
  console.log('📨 MESSAGE:', message.text);
  console.log('👤 USERNAME:', message.username);
  console.log('🤖 BOT PROFILE:', message.bot_profile?.name);
  console.log('🆔 BOT ID:', message.bot_id);
  console.log('👤 USER:', message.user);
  
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
    
    if (!isProjectChannel) {
      console.log('❌ Not a project channel, skipping');
      return;
    }
    
    // Updated to recognize DuetRight Bot AND Sky
    const isFromBot = message.username === 'DuetRight Bot' ||
                      (message.bot_profile && message.bot_profile.name === 'DuetRight Bot') ||
                      message.username === 'Sky' ||
                      (message.bot_profile && message.bot_profile.name === 'Sky') ||
                      message.username === 'sky' ||
                      (message.bot_profile && message.bot_profile.name === 'sky');
    
    console.log('🌟 FROM BOT?', isFromBot);
    console.log('📝 Checking username:', message.username);
    console.log('📝 Checking bot_profile.name:', message.bot_profile?.name);
    
    if (!isFromBot) {
      console.log('❌ Not from DuetRight Bot or Sky, skipping');
      return;
    }
    
    const hasStarPattern = message.text.match(/^\*.+\*$/);
    console.log('⭐ HAS BOLD PATTERN?', hasStarPattern ? 'YES' : 'NO');
    console.log('📝 Message text:', message.text);
    console.log('📝 First char:', message.text[0]);
    console.log('📝 Last char:', message.text[message.text.length - 1]);
    
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
  try {
    await app.start();
    console.log('⚡ Bot is running!');
    console.log('📌 Monitoring channels:', projectChannels.join(', '));
    console.log('🤖 Listening for messages from: DuetRight Bot, Sky');
  } catch (error) {
    console.error('Failed to start bot:', error.message);
    if (error.data && error.data.error) {
      console.error('Slack error:', error.data.error);
    }
  }
})();