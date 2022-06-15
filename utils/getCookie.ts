const getCookie = (name: string, cookies: string) => {
  let match = cookies.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
};

export default getCookie;
