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
  { text: "Everyone comes to Zootopia thinking they can be anything they want. Well, you can't.", character: 'nick' },
  { text: "I came here to make the world a better place, but I think I broke it.", character: 'judy' },
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
];

export const getRandomQuote = (quotes: Quote[]): Quote => {
  return quotes[Math.floor(Math.random() * quotes.length)];
};
