import callApi from '../util/callApi';

export function up() {
  return callApi({
    uri: '/actuator/health'
  });
}
