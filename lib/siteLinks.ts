// Single source for links shared across the site. Point NEXT_PUBLIC_LEARN_URL at the
// final Learn domain when it is ready; every button and script picks it up from here.
export const LEARN_URL = (process.env.NEXT_PUBLIC_LEARN_URL || 'https://learn.nudgeable.ai').replace(/\/$/, '');
export const ACADEMY_URL = '/ai-academy/index.html';
export const AI_FOR_WORK_URL = '/ai-for-work/index.html';
