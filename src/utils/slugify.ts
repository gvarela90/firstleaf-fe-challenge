export const slugify = (text: string): string => text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
