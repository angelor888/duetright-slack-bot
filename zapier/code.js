// Complete Working Zapier Code with Dynamic Config Support
// Routes jobs to channels and tags specific technicians
// Reads from Slack config message if available, falls back to hardcoded values

// First, let's see what fields Jobber is actually sending
console.log('=== AVAILABLE FIELDS FROM JOBBER ===');
Object.keys(inputData).forEach(key => {
  console.log(`${key}: ${inputData[key]}`);
});

// Initialize technician mappings (fallback if Slack config not available)
const technicianToChannel = {};
const technicianToSlackUser = {};

// Try to parse config from Slack first
if (inputData.config_message) {
  console.log('Config message received:', inputData.config_message ? 'Yes' : 'No');
  
  try {
    const configLines = inputData.config_message.split('\n');
    let foundTechnicians = false;
    
    configLines.forEach(line => {
      if (line.includes('|') && !line.includes('====')) {
        const parts = line.split('|').map(p => p.trim());
        if (parts.length >= 3 && parts[0] && parts[1] && parts[2]) {
          const techName = parts[0];
          const channel = parts[1];
          const slackId = parts[2];
          
          if (!techName.toLowerCase().includes('directory') && 
              !techName.toLowerCase().includes('technician')) {
            technicianToChannel[techName] = channel;
            technicianToSlackUser[techName] = slackId;
            foundTechnicians = true;
            console.log(`Added: ${techName} → ${channel} → ${slackId}`);
          }
        }
      }
    });
    
    if (foundTechnicians) {
      console.log(`✅ Loaded ${Object.keys(technicianToChannel).length} technicians from dynamic config`);
      console.log('configSource: Dynamic');
    }
  } catch (error) {
    console.log('Error parsing config:', error.message);
  }
}

// If no config or parsing failed, use hardcoded values
if (Object.keys(technicianToChannel).length === 0) {
  console.log('Using hardcoded technician mappings');
  Object.assign(technicianToChannel, {
    'Vladimir': 'proj-vladimir',
    'Vladimir T': 'proj-vladimir',
    'Vladimir Tile': 'proj-cbti',
    'Marina': 'proj-marina',
    'Sergei': 'proj-sergei',
    'Stan': 'proj-stanangelo',
    'Angelo': 'proj-stanangelo',
    'Mike': 'proj-mike',
    'Sarah': 'proj-sarah',
    'TestTech': 'proj-test'
  });
  
  Object.assign(technicianToSlackUser, {
    'Vladimir': 'U06B3CV6198',
    'Vladimir T': 'U06B3CV6198',
    'Vladimir Tile': 'U06CEE5NLVA',
    'Marina': 'U06SGRJ411V',
    'Sergei': 'U084BNFUBSN',
    'Stan': 'U06AJAF1NVC',
    'Angelo': 'U06AADB7D4P',
    'Mike': 'U06AADB7D4P',
    'Sarah': 'U06AADB7D4P',
    'TestTech': 'D08EU640ZRU'
  });
  console.log('configSource: Hardcoded');
}

console.log('=== CONFIG SOURCE:', Object.keys(inputData).includes('config_message') && inputData.config_message ? 'Dynamic' : 'Hardcoded', '===');
console.log('Total technicians loaded:', Object.keys(technicianToChannel).length);

// Job title from Jobber
console.log('=== JOB PROCESSING START ===');
const jobTitle = inputData.Title || inputData.title || '';
console.log('Title found:', jobTitle || 'No title');

// Instructions from Jobber
const instructions = inputData.Instructions || inputData.instructions || inputData['Scheduling Details'] || '';
console.log('Instructions found:', instructions ? 'Yes' : 'No');

// Initialize default values
let technician = 'unassigned';
let targetChannel = 'new-request';
let cleanJobTitle = jobTitle;
let slackUsername = '';

// Extract technician from job title
if (jobTitle) {
  const titleParts = jobTitle.split('-').map(part => part.trim());
  console.log('Title split into parts:', titleParts);
  
  if (titleParts.length > 1) {
    const lastPart = titleParts[titleParts.length - 1];
    console.log('Checking last part for technician:', lastPart);
    
    // Check if last part matches a technician
    Object.keys(technicianToChannel).forEach(tech => {
      if (lastPart.toLowerCase() === tech.toLowerCase()) {
        console.log(`✅ EXACT MATCH FOUND: ${tech} → ${technicianToChannel[tech]}`);
        technician = tech;
        targetChannel = technicianToChannel[tech];
        slackUsername = technicianToSlackUser[tech] || '';
        titleParts.pop();
        cleanJobTitle = titleParts.join(' - ');
      }
    });
  }
}

// Determine emoji based on job title keywords
let emoji = '🔧';
const titleLower = jobTitle.toLowerCase();
if (titleLower.includes('hvac') || titleLower.includes('heating') || titleLower.includes('cooling')) {
  emoji = '❄️';
} else if (titleLower.includes('plumb')) {
  emoji = '🚿';
} else if (titleLower.includes('electric')) {
  emoji = '⚡';
} else if (titleLower.includes('tile') || titleLower.includes('floor')) {
  emoji = '🏗️';
} else if (titleLower.includes('emergency') || titleLower.includes('urgent')) {
  emoji = '🚨';
} else if (titleLower.includes('door') || titleLower.includes('window')) {
  emoji = '🚪';
} else if (titleLower.includes('roof')) {
  emoji = '🏠';
} else if (titleLower.includes('paint')) {
  emoji = '🎨';
} else if (titleLower.includes('water')) {
  emoji = '💧';
} else if (titleLower.includes('test')) {
  emoji = '🧪';
} else if (technician !== 'unassigned') {
  const technicianEmojis = {
    'Vladimir': '🔨',
    'Vladimir T': '🔨',
    'Vladimir Tile': '🎯',
    'Marina': '🌟',
    'Sergei': '⚡',
    'Stan': '🔧',
    'Angelo': '🛠️',
    'Mike': '🏗️',
    'Sarah': '💡'
  };
  emoji = technicianEmojis[technician] || '🔧';
}

// Create messages
const mainMessage = `${emoji} ${cleanJobTitle}`;
const searchMessage = `${emoji} ${cleanJobTitle}`;

// Build thread message with all available details
let threadParts = [];

if (instructions) {
  threadParts.push(`📝 *Instructions:* ${instructions}`);
}

if (inputData.description || inputData.Description) {
  const desc = inputData.description || inputData.Description;
  threadParts.push(`📋 *Description:* ${desc}`);
}

if (inputData['Scheduled Start'] || inputData.scheduled_start) {
  const startTime = inputData['Scheduled Start'] || inputData.scheduled_start;
  threadParts.push(`🕐 *Start Time:* ${startTime}`);
}

if (inputData.address || inputData.Address) {
  const address = inputData.address || inputData.Address;
  threadParts.push(`📍 *Address:* ${address}`);
}

if (inputData.client || inputData.Client || inputData['Client Name']) {
  const client = inputData.client || inputData.Client || inputData['Client Name'];
  threadParts.push(`👤 *Client:* ${client}`);
}

if (inputData.value || inputData.Value || inputData['Job Value']) {
  const value = inputData.value || inputData.Value || inputData['Job Value'];
  threadParts.push(`💵 *Value:* $${value}`);
}

const threadMessage = threadParts.length > 0 
  ? threadParts.join('\n') 
  : '📋 No additional job details available.';

// Create tag message
const willTag = technician !== 'unassigned' && slackUsername;
const tagMessage = willTag 
  ? `<@${slackUsername}> Job alert! 🚨 Your new work order is ready for review.`
  : 'New job posted - awaiting technician assignment.';

console.log('=== FINAL ROUTING ===');
console.log('Technician:', technician);
console.log('Target Channel:', targetChannel);
console.log('Job Title:', cleanJobTitle);
console.log('Slack Username:', slackUsername || 'None');

// Debug information
const debug = {
  configSource: inputData.config_message ? 'Dynamic' : 'Hardcoded',
  configFound: !!inputData.config_message,
  totalTechnicians: Object.keys(technicianToChannel).length,
  foundTechnician: technician !== 'unassigned',
  originalTitle: jobTitle,
  extractedTechnician: technician,
  targetChannel: targetChannel,
  slackUsername: slackUsername,
  willTag: willTag,
  titleParts: jobTitle.split('-').map(p => p.trim()),
  hasInstructions: !!instructions,
  hasDescription: !!(inputData.description || inputData.Description),
  hasStartTime: !!(inputData['Scheduled Start'] || inputData.scheduled_start),
  hasAddress: !!(inputData.address || inputData.Address),
  hasClient: !!(inputData.client || inputData.Client || inputData['Client Name']),
  hasValue: !!(inputData.value || inputData.Value || inputData['Job Value']),
  availableFields: Object.keys(inputData)
};

console.log('=== DEBUG INFO ===', debug);
console.log('=== TAG MESSAGE ===', tagMessage);
console.log('=== JOB PROCESSING COMPLETE ===');

// Output for next steps
output = {
  channel: targetChannel,
  message: mainMessage,
  searchMessage: searchMessage,
  threadMessage: threadMessage,
  tagMessage: tagMessage,
  technician: technician,
  slackUsername: slackUsername,
  jobTitle: cleanJobTitle,
  fullTitle: jobTitle,
  emoji: emoji,
  hasDetails: threadParts.length > 0,
  willTag: willTag,
  debug: debug
};