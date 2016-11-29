/**
 * 0.11 和之前的版本直接返回 'udp4', 之后的版本返回 { type:'udp4' }
 * @param version
 */
const getCreateSocketOptions = version =>
  Number(version.match(/^v(\d+\.\d+)/)[1]) <= 0.11 ? 'udp4' : { type: 'udp4' };
export default getCreateSocketOptions;
