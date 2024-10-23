import { http, HttpResponse } from 'msw';
import { TOPICS_DATA } from 'mocks/data/topicsData';

export const topicsDataHandler = [
  http.get('/topics', () => {
    return HttpResponse.json(TOPICS_DATA);
  }),
];
