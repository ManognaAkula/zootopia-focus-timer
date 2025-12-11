export interface Quote {
  text: string;
  character: 'nick' | 'judy';
}

export const workQuotes: Quote[] = [
  { text: "It's called a hustle, sweetheart. Let's get to work!", character: 'nick' },
  { text: "I'm gonna make the world a better place!", character: 'judy' },
  { text: "Never let them see that they get to you.", character: 'nick' },
  { text: "Anyone can be anything!", character: 'judy' },
  { text: "Life's a little bit messy. We all make mistakes.", character: 'nick' },
  { text: "Real life is messy. We all have limitations.", character: 'judy' },
  { text: "Everyone comes to Zootopia thinking they can be anything they want.", character: 'nick' },
  { text: "I came here to make the world a better place!", character: 'judy' },
  { text: "You know you love me.", character: 'nick' },
  { text: "I don't have to be a hero to be extraordinary.", character: 'judy' },
  { text: "Flash, Flash, hundred yard dash! ...Focus time now.", character: 'nick' },
  { text: "Ready to make the world a better place?", character: 'judy' },
  { text: "Time to show them what we're made of.", character: 'nick' },
  { text: "Let's crack this case... I mean, study session!", character: 'judy' },
  { text: "I wasn't born a productive fox, but here we are.", character: 'nick' },
  { text: "Try everything! Starting with this task.", character: 'judy' },
];

export const breakQuotes: Quote[] = [
  { text: "Alright, time to kick back and relax, Carrots!", character: 'nick' },
  { text: "Great work! You've earned this break!", character: 'judy' },
  { text: "Even the best hustlers need a breather.", character: 'nick' },
  { text: "Rest up! We've got more to accomplish!", character: 'judy' },
  { text: "Pawpsicles and chill, am I right?", character: 'nick' },
  { text: "Take a moment to recharge, partner!", character: 'judy' },
  { text: "You know, you're not as bad as I thought. Take five.", character: 'nick' },
  { text: "We make a good team! But every team needs breaks.", character: 'judy' },
  { text: "Time for a refreshing break. Maybe some blueberries?", character: 'nick' },
  { text: "Stretch those legs! Even bunnies need to hop around.", character: 'judy' },
  { text: "Don't worry, I'll keep watch while you rest.", character: 'nick' },
  { text: "Hydration check! Have you had water today?", character: 'judy' },
  { text: "Back in my popsicle days, breaks were my specialty.", character: 'nick' },
  { text: "A well-rested mind solves cases faster!", character: 'judy' },
];

export const encouragementQuotes: Quote[] = [
  { text: "You're doing amazing, sweetheart!", character: 'nick' },
  { text: "Keep going! You've got this!", character: 'judy' },
  { text: "Not bad for a productive day, huh?", character: 'nick' },
  { text: "Every step forward counts!", character: 'judy' },
  { text: "Sly fox, dumb bunny... productive duo!", character: 'nick' },
  { text: "Don't give up! I believe in you!", character: 'judy' },
  { text: "Look at you go, Carrots would be proud.", character: 'nick' },
  { text: "Remember: Try everything!", character: 'judy' },
  { text: "Four pomodoros? Now that's what I call a hustle!", character: 'nick' },
  { text: "You're on fire today! Keep that momentum!", character: 'judy' },
];

export const completionQuotes: Quote[] = [
  { text: "Another case closed! I mean, pomodoro completed!", character: 'nick' },
  { text: "YES! That's how it's done!", character: 'judy' },
  { text: "Smooth. Very smooth.", character: 'nick' },
  { text: "Outstanding work, officer!", character: 'judy' },
  { text: "See? Anyone can be productive.", character: 'nick' },
  { text: "ZPD would be proud of that focus!", character: 'judy' },
];

export const getRandomQuote = (quotes: Quote[]): Quote => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};
