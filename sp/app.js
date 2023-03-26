const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path')
const fs = require('fs')
const redis = require('./util/luck')
const privateKey = fs.readFileSync('./public/key/private.key')
const publicKey = fs.readFileSync('./public/key/public.pem')
// const alipayPublicKey = fs.readFileSync(path.join(__dirname, '/public/key/支付宝公钥.txt'))
// const aliprivateKey = fs.readFileSync(path.join(__dirname, '/public/key/应用私钥2048.txt'))
// const compression =require('compression') ;
// app.use(compression({level: 5}));
app.use(express.static(path.join(__dirname, 'public/dist')))
const sql = require('./db/sql')
const query = require('./db/mysql')
const dayjs = require('dayjs')
const bcryptjs = require('bcryptjs')

//生成token
const jwt = require('jsonwebtoken')

const axios = require('axios').default

const rsa = require('node-rsa')
const rsaPriKey = `-----BEGIN PRIVATE KEY-----
MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAMNHqIU51iynH3BW
A4cKw6KfJvxhyghtRxhJeBrGBJ3yHlCaTLMs8oSoVZ6wBk38v3gz3isQebzq/Cka
QCQHgiw9PU5dcHNX8bJJF+72fIJkjtLI7llTBIDyXfXkgSjXD69TjKWTOVzZ3RvP
cfgA9x4+L+NLEEsYK8hBfEERkNSdAgMBAAECgYBPgpG/DPmDXNiUKLFu/pcBU8PP
5xEXtUbJQMDCRfYDSV3Ge8zW92oXUWLrJcirYEmla5j998tZfGQHaETNZrE9E+pf
EdgOTFSyPaqlEmiOQDG/Rju8Ni5XFKY18s4qtb1fXo4rQwRb5Py2wcbUOttu0N9L
G3p3+aJ7WtMSXOnKEQJBAOLGbwcOcbMUFTRrkv+4FoyCVacLGEJeXgHe7GXt53fe
F+G2+XzIABG+W4Sg+Zt0wsFZc86G6HbBnJa4Vyitz2MCQQDccil52YsZiRZI7n3W
yQUbUf26NTMnpkcjBhelJBtOADsJyP2zNWSFQ9LrK6edRXp95FPUcFTkKevWOI//
Qgv/AkBPGDrdUTJi7Vw//k01F7X1p/fL3VjGvTc4m9ID8yhKbJITzcfSt8ceaTBu
X97vU5gh69sya2dlFD5Ta1QrAgRVAkEAivzPeavXL7pm+oSjgpArUBZZytVP82e6
4jItJkmljYBHuNuoWR0Iy5z/lpZnj5kGqekTkZVhcJmdv+rZny6dMQJBAKRcb15k
poxaWj53eiZz6Xnd7a/fBz52i2TLoHGhs/14rurrZPg/wzgC66DTQxSM1JtxlGU1
RSx8ISuBSLq6kLo=
-----END PRIVATE KEY-----
`
const rsaKey = new rsa(rsaPriKey)


//微信支付

// const { Wechatpay } = require('wechatpay-axios-plugin');
// const { readFileSync } = require('fs');

// // 商户号，支持「普通商户/特约商户」或「服务商商户」
// const merchantId = '190000****';

// // 「商户API证书」的「证书序列号」
// const merchantCertificateSerial = '3775B6A45ACD588826D15E583A95F5DD********';

// // 从本地文件中加载「商户API私钥」
// const merchantPrivateKeyFilePath = '/path/to/merchant/apiclient_key.pem';
// const merchantPrivateKeyInstance = readFileSync(merchantPrivateKeyFilePath);

// // 「微信支付平台证书」的「证书序列号」，下载器下载后有提示`serial`序列号字段
// const platformCertificateSerial = '7132d72a03e93cddf8c03bbd1f37eedf********';

// // 从本地文件中加载「微信支付平台证书」，用来验证微信支付请求响应体的签名
// const platformCertificateFilePath = '/path/to/wechatpay/cert.pem';
// const platformCertificateInstance = readFileSync(platformCertificateFilePath);

// const wxpay = new Wechatpay({
//   mchid: merchantId,
//   serial: merchantCertificateSerial,
//   privateKey: merchantPrivateKeyInstance,
//   certs: { [platformCertificateSerial]: platformCertificateInstance, },

// 使用APIv2时，需要至少设置 `secret`字段，示例代码未开启
// APIv2密钥(32字节)
// secret: 'your_merchant_secret_key_string',
// // 接口不要求证书情形，例如仅收款merchant对象参数可选
// merchant: {
//   cert: readFileSync('/path/to/merchant/apiclient_cert.pem'),
//   key: merchantPrivateKeyInstance,
//   // or
//   // passphrase: 'your_merchant_id',
//   // pfx: fs.readFileSync('/your/merchant/cert/apiclient_cert.p12'),
// },

// });


//支付宝支付
const AlipayFormData = require('alipay-sdk/lib/form').default;
const AlipaySdk = require('alipay-sdk').default; // 引入 SDK
const alipaySdk = new AlipaySdk({
    appId: '2021000121646564', // 开放平台上创建应用时生成的 appId
    signType: 'RSA2', // 签名算法,默认 RSA2
    gateway: 'https://openapi.alipaydev.com/gateway.do', // 支付宝网关地址 ，沙箱环境下使用时需要修改 正式线上的时候换成 https://openapi.alipay.com/gateway.do
    alipayPublicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAtG/yD0qrfRFPUMbxj7FIL52ksWrwUmaiht08mf06JoszAmphjqDA1hizH2crxtwgtjQkhKtKXFQOBvFysH+ckH8Kv5BcFKHild04oaR3rEd4oCBg04xfoH9bCBuDfXZON+EjoIxRP4bszFw2LXViC5bBqyf20U0crDRahox1PJd/jdHoL1+vdxVZS+98G5h8NS0Lpg7YLGNcl2UJN30GN2o/cJOksIk6hxVn9p9BNIATbwR3NqS+Zs5C7820hbw97qh9Q5dIV+LoHhfPo5CKACj72VJf8B1cillyOwxPICCqCHW6E0kbgRX9FqlAavw3cM/+0yKlgk/ruqBjIC6K/wIDAQAB', // 支付宝公钥，需要对结果验签时候必填
    privateKey: 'MIIEpAIBAAKCAQEAvPe4K16gyx3v5CmnzptBjRk44wHI7qfwNS7e9YyAK4PiiT0AS7sxqsTXhkSVBtpV8t5DfAmM4ri6+mXaPTK4t5uJ8nzp/YAEbQfaZbqMzDd1ezqhilB0+bCAcIkzpGPwC2IuIQ09u7t8DSM0ezEdLbe8U86Ek0FWSrXx31J5QClw11ZKB16Kg8j4v30c4lUZxFhee5ih+RaEhbUcN6i83AewApVcTQxzwC3CMRKfIZNPYQsboun3pE80Efmaq/06w5tX1IUrGbrJMJCzaRKxgcvGn8OVzJdDE4BUToKWz5XAfuLVq5fXsQujc+Jshyn3lkIMfi9o6LXGSoaoL6zYMQIDAQABAoIBAQCWPDxn/qvH0N1QgO2xDS5oh4z6rgiZ9Vq8ba9FeZbNAeWxRpZdn041fpn7Xbs934hFtv/gNZeVCVleimugDBtfnoFmEHnX2Verd3rjNhWKpuz4M/0Kgjz95p222t377JiD9GLIVEaoYr6Vk0++QaX5GwLXfnFYwbFhZJYP/vn3T5w9lYZWtYNZsrAQRbqSWMOBtrrmDvPlR7aNciY23GT0DchXai5WSbfVI0IXb49QbM3Iw31v5xaL2TwRz+oKg1FuFsTp1eOK5ALn6BLbSCn6ihB4PZI0AiXW1u/FDzOFpu80+ATkYY4eBw+lo5FdfRbZDWsx5KrQFcdIX6VXDBABAoGBAO8ISVf3UN68XyMu3325Az4e7jAW0FXG8vDzK4RkkwJXIwZSvnH0NAaB5stfdFgMUt2ixzmsVUpcyuRXZxBFrdt3sY9raRPpB6ZsL6inX4C5lYzgsWjW4u0Wiq1X1pV27OTSThUgUOdYF94QdSxlofuI1rnOJ224kmMYcYpWMIAhAoGBAMphpz3c+dnFVv99Z+pumZAMbMC01vL9X2Gg4XabI7350Kx9ymNKEOsvcZNchH/DKRr3r1qnv//s6uaH7T1tM5pTxf/oXmmmgIU/qthZkELPbJw8Y16skuqtibmJIZEQhWFVreYZVi1kSUXlW0rlSF28qeql5BJa8IdTscMjQZYRAoGBAOZ+exsUJStjQepPXLuDGJlighRlK2hLfCDUm/YCdbAgDmoeh/6imThdMwyRc0MkPxPxz2LRxzz51bvyfDO4vTmQZewCi0TjxLi6QgrDutgKHSfH08tgy1oMDpWwyf8+upi8IwdELj+nNvyvqg2xw00mWsi4/lRTUvWzsGjRS9uBAoGATmSpTbNNLOfeHTVMjWiuHzhQ4Aysvo8a5UxWSYUqwSoFhOts/CzyhMdp7TUHNh44y/Npf2o/WzlAfG/mm8azGHKe3dP6zl3qprLU0N1QnjCO164kp8WdWz5BfRb7Y5/MqrlvlRP3Z7nTEDoZtNc/wt+TygrcX6fOR/1JfFcpzqECgYARoFBnh6k1ydJSc1SCUzIH6pL4BD9w1qSvcM0tXoJ/IyT5zmcAFp3ugTYzHoJe/ZjN9N2ajhiRjhzae0yl5orjJv3JKclUUngHVoNHluq95BmXkgtrCqBt3APyidnsMZd0JvdE5BKZtiNbQgVvZ3crSx5ZL6MpIdkgQg4oqf3lcQ==', // 应用私钥字符串
});



// 引入解码工具
const { expressjwt } = require("express-jwt");
//只要配置express-jwt这个中间件，就可以把解析出来的信息挂载在req.auth
//除了请求地址其他地址都需要验证

app.use(expressjwt({ secret: publicKey, algorithms: ['RS256'] }).unless({ path: ['/login', '/register', "/hotGoods", '/getSubItem', '/home', '/result'] }))

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(require('cors')())


//定时器
const t = setInterval(async () => {
    const q = await query(sql.checkUserorder)
    if (q.lenght == 0) return clearInterval(t)
    for (const iterator of q) {
        const formData = new AlipayFormData();
        formData.setMethod('get');
        formData.addField('bizContent', {
            outTradeNo: iterator.outTradeNo
        });
        const result = await alipaySdk.exec(
            'alipay.trade.query', {}, {
            formData: formData
        }
        )
        //result为网址
        const { data } = await axios.get(result)

        // console.log(data.alipay_trade_query_response.send_pay_date,'  d',iterator);
        if (data.alipay_trade_query_response.trade_status == 'TRADE_SUCCESS') {//查询接口返回TRADE_SUCCESS表示订单支付成功
            // console.log('执行此处');
            await query(sql.updateorder, [data.alipay_trade_query_response.send_pay_date, iterator.outTradeNo])
        } else {
            await query(sql.deleteuserorderByoutTradeNo, [iterator.outTradeNo])
        }
    }
    clearInterval(t)
}, 120000)
//结束定时器
//错误处理
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') return res.status(401).send('error')
    return res.status(err.status).send('error')


})
app.use('/', (req, res, next) => {
    if (req.method.toLowerCase() == 'options') {
        res.send(200);  // 让options尝试请求快速结束
    } else {
        next();
    }

})

//登录(使用username进行查找，如果有多条记录。。。。。)
app.post('/login', async (req, res) => {
    rsaKey.setOptions({ encryptionScheme: 'pkcs1' })
    const decrypted = rsaKey.decrypt(req.body.password, 'utf8')
    const result = await query(sql.getPersonByName, [req.body.username])
    if (result.length == 0) return res.send('error')
    // console.log(result[0]);
    const pd = bcryptjs.compareSync(decrypted, result[0].password)
    if (pd) {
        const tokentstr = jwt.sign({ username: req.body.username, password: req.body.password, role: result[0].role, id: result[0].id }, privateKey, { expiresIn: 86400000, algorithm: 'RS256' })
        return res.send({
            status: 200,
            msg: 'post请求成功',
            data: { username: result[0].username, dress: result[0].dress, id: result[0].id },
            token: tokentstr
        })
    }
    return res.send('error')
})


//注册
app.post('/register', async (req, res) => {
    rsaKey.setOptions({ encryptionScheme: 'pkcs1' })
    const decrypted = rsaKey.decrypt(req.body.password, 'utf8')
    const pd = bcryptjs.hashSync(decrypted, 10)
    const result = await query(sql.insert, [req.body.username, pd])
    // console.log(result);
    return res.json({
        id:result.insertId
    })
})
//修改密码
app.post('/changeP', async (req, res) => {
    if (req.body.input != '') {
        await query(sql.changeP, [bcryptjs.hashSync(req.body.input), req.auth.id])
        return res.json({
            code: 'success'
        })
    }
    return res.json({
        code: 'error'
    })
    // if(req.body.input!=''&&req.body.input)
    // console.log(req.auth.id,'   s');
})
//发送数据（每类大图1个，小图6个，共七个）
app.get('/hotGoods', async (req, res) => {

    const result = await query(sql.queryAllHotGoods)
    res.send(result)

})
//根据id查找商品
app.post('/hotGoods/id', async (req, res) => {
    const result = await query(sql.gethotGoodsById, req.body.q)
    res.send(result)
})

//更多类别数据
app.get('/goods', async (req, res) => {
    const result = await query(sql.queryAllGoods, req.query.c)
    res.send(result)

})
//获取导航栏数据
app.get('/getSubItem', async (req, res) => {
    const result = await query(sql.getSubItem)
    res.send(result)
})
//
app.post('/getSubItem', async (req, res) => {
    const result = await query(sql.getSubItemById, req.body.id)
    res.send(result)
})
//改变地址
app.post('/changeAdress', async (req, res) => {
    const result = await query(sql.updatePerson, [req.body.adress, req.body.id])
    res.send(result)
})
//获取优惠券
app.get('/obtainLuck', async (req, res) => {
    await redis.connect();
    const data = await redis.hGetAll(`${req.auth.id}`) //优惠券模式是到期统一删除，还是每个用户删除的时间不同依据创建时间？（代码区别：以用户id为hash名，为不统一删除
    //data 例如：1:100 1为filed
    const time = await redis.TTL(`${req.auth.id}`)                                                                              //以优惠券名字，为统一删除）
    let ndata = []
    for (const item in data) {
        // console.log(item);//为序号，例如 1
        const cp = await query(sql.selectCouponList, [item])
        ndata.push({ [item]: data[item], time, value: false, name: cp[0].name, discountMoney: cp[0].discountMoney })
    }
    await redis.quit()
    return res.json({
        code: ndata
    })
})
async function useLuck(req, item) {
    // console.log(item); //为优惠券id
    const cp = await query(sql.selectCouponList, [item])
    if (item == undefined) return { code: '' }
    await redis.connect();
    const value = await redis.hGet(`${req.body.id[0][1].userid}`, `${item}`)
    if (value - 1 < 0) {

        await redis.quit()
        return {
            code: '没有优惠券！'
        }
    } else {
        const data = await redis.hIncrBy(`${req.body.id[0][1].userid}`, `${item}`, `-1`)
        await redis.quit()
        return {
            code: { [item]: cp[0].name }
        }
    }

}
//优惠券 （使用redis，定时）(未完)
//创建优惠券（并使用？）
//成为vip时创建，然后每次使用自减1，判断是否小于0，
async function luck(id, vId) {
    // const isMember = await query(sql.updateMember,['h',req.auth.id])  //修改isVip字段，
    // await query(sql.queryIsMember,req.auth.id)  //根据id查找用户是否是vip
    const arr = await query(sql.selectCouponList, [vId])
    const quantity = arr[0].quantity
    const vaildTime = arr[0].vaildTime
    await redis.connect();
    if (await redis.hExists(`${id}`, `${vId}`) == 0) {
        await redis.hSet(`${id}`, `${vId}`, quantity)
        await redis.expire(`${id}`, vaildTime)
    } else {//如果有字段，删除后重新赋值(什么可以调用luck方法，)

        await redis.hDel(`${id}`, `${vId}`)
        await redis.hSet(`${id}`, `${vId}`, quantity)
        await redis.expire(`${id}`, vaildTime)
    }
    await redis.quit()
}
//支付
app.post('/pay', async (req, res) => {
    const data = await useLuck(req, req.body.useLuck);

    if (data.code == '') { }
    else {
        if (data.code == '没有优惠券！')
            return res.json({
                code: '没有优惠券！'
            })
    }
    //计算优惠金额
    let Pamont = 0
    let arr = await query(sql.selectCouponList, [Object.keys(data.code)[0]])
    if (arr[0] != undefined) {
        Pamont = arr[0].discountMoney
    }
    // if (Object.keys(data.code)[0] == '1') Pamont = 5

    const { v4: uuidv4 } = require('uuid')
    // console.log(req.body.id[0]);
    let resultt = [] //为处理后的数组

    for (let i = 0; i < req.body.id.length; i++) {
        const result = await query(sql.gethotGoodsById, Object.keys(req.body.id[i][0])[0])
        // console.log(result[0],'  sd');
        const num = Object.values(req.body.id[i][0])[0];
        // console.log(result[0].price*num);
        resultt.push([{ goodId: Object.keys(req.body.id[i][0])[0] }, { num }, { price: result[0].price }, { total: result[0].price * num }, { dec: result[0].dec }, { name: result[0].name }, { classify: result[0].classify }])

    }
    // console.log(resultt);


    // return res.send(resultt)
    //总金额
    let sumTotal = 0
    //总商品id
    let goodId = []
    //总商品名称
    let goodName = []
    //订单描述，全部商品
    let goodDec = []
    // console.log(resultt);

    for (const iterator of resultt) {
        sumTotal += iterator[3].total
    }
    for (const iterator of resultt) {
        goodName.push(iterator[5].name)
    }
    for (const iterator of resultt) {
        goodId.push(iterator[0].goodId)
    }
    //是否是支付vip
    for (const iterator of resultt) {
        //确定订单时识别会员支付信息
        if (iterator[6].classify == 'm') {
            var hVip = iterator[0].goodId
        } else {
            hVip = 0
        }
        // var hVip = 0
        // if (iterator[0].goodId == 1) {
        //     hVip = 1
        // } else if (iterator[0].goodId == 2) {
        //     hVip = 2
        // } else if (iterator[0].goodId == 3) {
        //     hVip = 3
        // }
        goodDec.push(`商品ID：${iterator[0].goodId}`, `商品名称：${iterator[5].name}，数量：${iterator[1].num}，单价:${iterator[2].price}，总价:${iterator[3].total}`)
    }

    // return res.send({sumTotal})
    let uuid
    const formData = new AlipayFormData();
    formData.setMethod('get');
    // formData.addField('returnUrl', 'http://localhost:8080/#/result'); // 支付成功回调地址，必须为可以直接访问的地址，不能带参数
    // formData.addField('notifyUrl', 'http://http://192.168.9.106:8080/#/result'); // 支付宝服务器主动通知商户服务器里指定的页面http/https路径
    if (req.body.outTradeNo) {
        uuid = req.body.outTradeNo
    } else {
        uuid = uuidv4()
    }
    const time = dayjs().format("YYYY-MM-DD HH:mm:ss")
    const time_expire = dayjs(time).add(7, 'm').format("YYYY-MM-DD HH:mm:ss")
    //查询表中是否有订单，（解决未支付订单点击支付后表中两个相同的订单）
    const r = await query(sql.getorder, uuid)
    if (r.length == 0) {
        await query(sql.insertorder, [req.body.id[0][1].userid, `${goodDec}`, uuid, sumTotal - Pamont, req.body.id[0][2].adress, JSON.stringify(data.code), time, hVip, 1])
    }
    //结束
    formData.addField('bizContent', {
        outTradeNo: uuid, // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
        productCode: 'FAST_INSTANT_TRADE_PAY', // 销售产品码，与支付宝签约的产品码名称,仅支持FAST_INSTANT_TRADE_PAY
        totalAmount: sumTotal - Pamont, // 订单总金额，单位为元，精确到小数点后两位
        subject: goodName.toString(), // 订单标题
        body: goodDec.toString(), // 订单描述
        time_expire,//订单绝对超时时间。
        // qr_pay_mode:0//PC扫码支付的方式。
    });

    const result = await alipaySdk.exec( // result 为可以跳转到支付链接的 url
        'alipay.trade.page.pay', // 统一收单下单并支付页面接口
        {}, // api 请求的参数（包含“公共请求参数”和“业务参数”）
        { formData: formData },
    );


    const t = setTimeout(async () => {
        const outTradeNo = uuid
        // const  outTradeNo  = '128fb8ec-22ba-4222-a8f1-ad3404e5140e';
        const formData = new AlipayFormData();
        formData.setMethod('get');
        formData.addField('bizContent', {
            outTradeNo, // 商户订单号,64个字符以内、可包含字母、数字、下划线,且不能重复
        });
        const result = await alipaySdk.exec(
            'alipay.trade.close', {}, {
            formData: formData
        }
        )
        // console.log(result);
        const { data } = await axios.get(result)
        if (data.alipay_trade_close_response.code == '10000') {   //已扫码，已创建订单，关闭订单接口为10000代表查询成功 
            await query(sql.deleteuserorderByoutTradeNo, [uuid])  //删除订单
        } else {    //支付成功后关闭订单接口返回也不是10000，此时用查询订单接口判断是否支付成功，不成功删除
            // const  outTradeNo  = 'ed21d8f0-012a-4285-bcaa-44c5d6de49e3';
            const outTradeNo = uuid
            const formData = new AlipayFormData();
            formData.setMethod('get');
            formData.addField('bizContent', {
                outTradeNo
            });
            const result = await alipaySdk.exec(
                'alipay.trade.query', {}, {
                formData: formData
            }
            )
            //result为网址
            const { data } = await axios.get(result)
            if (data.alipay_trade_query_response.trade_status != 'TRADE_SUCCESS') { // 未支付成功,还有一种情况是打开支付页面未扫码，此时订单不会创建，如何解决相隔时间过久后扫码，仍可以支付
                await query(sql.deleteuserorderByoutTradeNo, [uuid])  //删除订单
            }
        }

        clearTimeout(t)
    }, 480000
    )
    return res.json({
        code: result,
        outTradeNo: uuid
    })
})
//支付宝订单查询
app.get('/query', async (req, res) => {

    const { outTradeNo } = req.query;

    const formData = new AlipayFormData();
    formData.setMethod('get');
    formData.addField('bizContent', {
        outTradeNo
    });
    const result = await alipaySdk.exec(
        'alipay.trade.query', {}, {
        formData: formData
    }
    )

    //result为网址
    const { data } = await axios.get(result)
    if (data.alipay_trade_query_response.trade_status == 'TRADE_CLOSED' || data.alipay_trade_query_response.trade_status == 'WAIT_BUYER_PAY' || data.alipay_trade_query_response.sub_msg == '交易不存在') {
        return res.json({
            code: '查询交易失败！'
        })
    } else {
        await query(sql.updateorder, [data.alipay_trade_query_response.send_pay_date, outTradeNo])
        const vStatus = await query(sql.queryVipStatus, [outTradeNo])
        const oStatus = await query(sql.selectOrderStatus, [outTradeNo])
        if (vStatus[0].hVip != 0 && oStatus[0].isAvailable == 1) {
            await query(sql.changeOrderStatus, [outTradeNo])
            await query(sql.updateMember, [vStatus[0].hVip, req.auth.id])
            luck(req.auth.id, vStatus[0].hVip)
        }
        return res.json({
            code: '查询交易成功！'
        })
    }

})

app.get('/quertAll', async (req, res) => {
    const q = await query(sql.queryAllUserOrder, [req.auth.id])
    let qq = []
    for (const item of Array.from(q)) {
        //依赖outTradeNo，用户操作订单
        qq.push({ createTime: item.createTime, goodid: item.goodid, outTradeNo: item.outTradeNo, send_pay_date: item.send_pay_date, total: item.total })

    }
    return res.json({
        code: qq
    })
})
//改变订单表中isDel
app.post('/delOrder', async (req, res) => {
    const result = await query(sql.changeUserOrderIsDel, [req.body.outTradeNo])
    if (result.changedRows == 1) {
        return res.json({
            code: '删除成功！'
        })
    }
})
app.get('/getAmount', async (req, res) => {
    const result = await query(sql.selectCouponListAmount)
    return res.json({
        code: result
    })
})
// 查询所有订单
app.get('/queryOrder', async (req, res) => {
    if (req.auth.role == 'root') {
        const data = await query(sql.queryOrder)
        return res.json({
            code: data
        })
    } else {
        return res.json({
            code: ''
        })
    }
}
)




app.listen('3001', () => {
    console.log('http://localhost:3001');
})