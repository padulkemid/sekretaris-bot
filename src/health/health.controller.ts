import { Http } from '../common/http.constant';
import healthService from './health.service';

const ping = {
  method: Http.Method.GET,
  url: '/ping',
  handler: async (_: any, res: any) => {
    const pingResult = healthService.ping();

    res.code(Http.StatusCode.OK).send(pingResult);
  }
};

const healthController = (fastify: any, _: any, done: any) => {
  fastify.route(ping);
  done();
};

export default healthController;
