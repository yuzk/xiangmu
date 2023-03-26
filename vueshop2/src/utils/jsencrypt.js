import {JSEncrypt} from 'jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair; 把下面生成的公钥、私钥换成自己生成的即可
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDDR6iFOdYspx9wVgOHCsOinyb8
YcoIbUcYSXgaxgSd8h5QmkyzLPKEqFWesAZN/L94M94rEHm86vwpGkAkB4IsPT1O
XXBzV/GySRfu9nyCZI7SyO5ZUwSA8l315IEo1w+vU4ylkzlc2d0bz3H4APcePi/j
SxBLGCvIQXxBEZDUnQIDAQAB
-----END PUBLIC KEY-----
`
// console.log(publicKey);

// 加密
export function encryption(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}