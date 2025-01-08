import { BotConfig } from '../types';

export function calculateBotProgress(
  botConfig: BotConfig,
  elapsedTime: number,
  totalLength: number,
  text: string
): { progress: number; typedText: string; errors: number } {
  const charsPerMinute = botConfig.speed * 5; // Convert WPM to CPM
  const charsPerSecond = charsPerMinute / 60;
  const expectedChars = Math.floor(charsPerSecond * elapsedTime);
  
  // Apply accuracy factor
  const accuracyFactor = botConfig.accuracy / 100;
  const consistencyFactor = botConfig.consistency / 100;
  
  // Calculate how many characters the bot has typed
  const typedLength = Math.min(expectedChars, totalLength);
  
  // Generate bot's typed text with intentional errors based on accuracy
  let typedText = '';
  let errors = 0;
  
  for (let i = 0; i < typedLength; i++) {
    const shouldMakeError = Math.random() > accuracyFactor * consistencyFactor;
    if (shouldMakeError) {
      typedText += String.fromCharCode(97 + Math.floor(Math.random() * 26)); // Random letter
      errors++;
    } else {
      typedText += text[i];
    }
  }
  
  const progress = (typedLength / totalLength) * 100;
  
  return { progress, typedText, errors };
}