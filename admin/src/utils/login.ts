/**
 * 是否已经登录或者 token 超时
 *
 * @export
 * @returns { boolean }
 */
export default () => {
  // if (!window.localStorage.getItem("auth_token")) {
  //   return false;
  // }
  // const expiresIn =
  //   JSON.parse(window.localStorage.getItem("auth_token") || "").expiresIn *
  //   1000;
  // const nowTime = new Date().getTime();
  // if (nowTime > expiresIn) {
  //   return false;
  // }

  return true;
};
