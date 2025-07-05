// TEST VERSION - Debug why bot isn't receiving messages
const { App } = require('@slack/bolt');

// Your tokens (already in your file)
const SLACK_BOT_TOKEN = 'xoxb-6367402610148-9172919610304-UCObCGuFQYMyo1mbNs2vpOXl';  // You already have this
const SLACK_SIGNING_SECRET = 'ebb848eeb34b7f9242a33c026cdc4ece';
const SLACK_APP_TOKEN = 'xapp-1-A0947N2H6PM-9146759116310-2dba3cba35b54edc4067d872d53fff02ee097e1cdca2f3ada850b08ee65f7e1e';  // You already have this

console.log('🔧 Starting test bot...');

const app = new App({
  token: SLACK_BOT_TOKEN,
  signingSecret: SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: SLACK_APP_TOKEN,
  logLevel: 'debug'  // This will show us everything
});

// Listen to ALL messages
app.message(async ({ message, say }) => {
  console.log('📨 MESSAGE RECEIVED!');
  console.log('Channel:', message.channel);
  console.log('Text:', message.text);
  console.log('User/Bot:', message.user || message.bot_id);
  console.log('-------------------');
});

// Test if bot can read channels
app.event('app_home_opened', async ({ event, client }) => {
  console.log('🏠 Someone opened the app home!');
});

// Start the app
(async () => {
  try {
    await app.start(3000);
    console.log('⚡️ Test bot is running!');
    console.log('🔍 Listening for ALL messages...');
    console.log('📝 Try posting in any channel where the bot is present');
    
    // Test the connection
    const auth = await app.client.auth.test();
    console.log('✅ Connected as:', auth.user);
    console.log('✅ Workspace:', auth.team);
    
  } catch (error) {
    console.error('❌ Error starting app:', error);
  }
})();