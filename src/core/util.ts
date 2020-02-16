export const convertKeyToLowerCase = (data: any) => {
  const result = {};
  if (typeof data !== 'object') {
    throw new Error('Invalid type');
  }

  for (const [key, value] of Object.entries(data)) {
    result[key.toLowerCase()] = value;
  }

  return result;
};
