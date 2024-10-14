export const truncate = (text: string, limit: number, tail?: string) => {
  if (text.length <= limit) {
    return text;
  }

  return `${text.slice(0, limit)}${tail || '...'}`;
};

export const firstCapitalized = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const trimValues = (values: any) => {
  const normalizedValues: any = {};
  Object.keys(values).forEach((key) => {
    if (typeof values[key] === 'string') {
      normalizedValues[key] = values[key].trim().replace(/\s+/g, ' ');
    } else {
      normalizedValues[key] = values[key];
    }
  });
  return normalizedValues;
};

export const startsWithNumber = (value: string): boolean => {
  return /^[0-9]/.test(value);
};


export const cleanText = (dirtyText: string): string => {
  let cleanStr = dirtyText.replace(/<[^>]*>/g, '');
  cleanStr = dirtyText.replace(/\\["'\\]/g, '');

  cleanStr = cleanStr
    .replace(/&gt;/g, '>')
    .replace(/&lt;/g, '<')
    .replace(/&amp;/g, '&')
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"');

  const htmlEntities: { [key: string]: string } = {
    '&gt;': '>',
    '&lt;': '<',
    '&amp;': '&',
    '&#x27;': "'",
    '&quot;': '"',
    '&nbsp;': ' ',
    '&hellip;': '...',
  };

  cleanStr = cleanStr.replace(/&[a-zA-Z0-9#]+;/g, (entity) => {
    return htmlEntities[entity] || entity;
  });

  cleanStr = cleanStr.replace(/https?:\/\/[^\s]+/g, '');
  cleanStr = cleanStr.trim().replace(/\s\s+/g, ' ');
  cleanStr = cleanStr.replace(/\s\s+/g, ' ').trim();

  return cleanStr;
}
