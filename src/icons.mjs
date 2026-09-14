// Deterministic vector icons: never rely on platform-specific symbol fonts.
const svg = path => `<svg class="ui-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${path}</svg>`;
export const arrow = `<span class="arrow" aria-hidden="true">${svg('<path d="M5 19 19 5M5 5h14v14"/>')}</span>`;
export const playIcon = svg('<path d="m9 5 11 7-11 7Z"/>');
export const menuIcon = `<span class="menu-mark" aria-hidden="true">${svg('<path d="M5 12h14M12 5v14"/>')}</span>`;
