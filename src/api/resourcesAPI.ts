import Fetch from '../core/Fetch';

export const resourcesAPI = {
  getResource(path: string): Promise<XMLHttpRequest> {
    return Fetch.get(`resources/${encodeURIComponent(path)}`);
  },
};
