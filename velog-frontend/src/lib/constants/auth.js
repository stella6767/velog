export const tokenExpire = '토큰기간만료';

export const newTokenIssue = '재발급 성공';

export const realTokenExpire = '토큰이 만료되었습니다. 다시 로그인해주세요.';

export const logoutMsg = '로그아웃되었습니다.';

export const googleClientId = '350092551766-msak16fh3kvlvtaidh90r77rnli1tubr.apps.googleusercontent.com';

export const deleteCookie = (name) => {
  //희한하게 쿠키를 들고 오면 igonoring 매치를 걸어줘도 시큐리티 필터를 탄다..그래서 아예 프론트단에서 삭제까지
  let date = new Date();
  date.setDate(date.getDate() - 100);
  let Cookie = `${name}=;Expires=${date.toUTCString()}`;
  document.cookie = Cookie;
};
