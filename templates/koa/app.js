const Koa = require('koa');
const static = require('koa-static');
const Router = require('koa-router');
const path = require('path');
const axios = require('axios');
const querystring = require('querystring');
const bodyParser = require('koa-bodyparser');
const port = 7106;

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(static(path.join(__dirname, 'public')));

app.use(router.routes()).use(router.allowedMethods());

app.use(async ctx => {
  const { query, path, request } = ctx;
  const acw_tc = ctx.cookies.get('acw_tc');
  const csrf = ctx.cookies.get('csrfToken');
  const islogin = ctx.cookies.get('islogin');
  let cookie = '';
  if (acw_tc) {
    cookie += `acw_tc=${acw_tc};`;
  }
  if (csrf) {
    cookie += `csrfToken=${csrf};`;
  }
  if (islogin) {
    cookie += `islogin=$[islogin];`;
  }
  try {
    const response = await axios({
      url: `https://m.shanzhen.me${path}?${querystring.stringify(query)}`,
      method: ctx.method.toLowerCase(),
      headers: {
        cookie,
        'user-agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Mobile Safari/537.36',
        'content-type': ctx.header['content-type'],
        referer: 'https://m.shanzhen.me/cooperation/customize_examcoupon?comId=53e6c25c2eda467ea5ccc9f6789b4001&activityCode=ACT925811497'
      },
      data: request.body
    });
    const type = response.headers["content-type"];
    const cookies = response.headers['set-cookie'];
    if (cookies && cookies.length) {
      const cookieStr = cookies.reduce((acc, val) => {
        const cookie = val.split(';')[0];
        return acc += `${cookie};`
      }, '');
      const arr = cookieStr.split(';');
      arr.forEach(str => {
        const [key, value] = str.split('=');
        if (key && value) {
          ctx.cookies.set(key, value, {
            httpOnly: false
          });
        }
      });
    }
    ctx.type = type;
    if (typeof response.data === 'string') {
      ctx.body = response.data.replace(/https:\/\/m\.shanzhen\.me/g, '').replace(/MicroMessenger/g, Math.random().toString(36));
    } else {
      ctx.body = replaceData(response.data);
    }
  } catch(err) {
    console.log(err.message)
    ctx.body = err.message;
  }
});

function replaceData(obj) {
  if (typeof obj === 'object') {
    return JSON.parse(JSON.stringify(obj).replace(/联通家庭定制体检权益/g, 'hello'))
  }
  return obj;
}

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});