export const getDataAsUrl = (data: string | URL): URL => {
    if (data instanceof URL) return data;
    return new URL(data);
}

export const isValidUrl = (data: string | URL): boolean => {
    if (data instanceof URL) return true;
    try {
      new URL(data);
      return true;
    } catch (err) {
      return false;
    }
}