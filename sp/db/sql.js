let personSQL = {
    insert: 'INSERT INTO user(username,password) VALUES(?,?)',
    changeP:'UPDATE user SET password = ? WHERE (id = ?)',
    queryAll: 'SELECT * FROM user',
    queryIsMember:'SELECT isVip FROM user WHERE id = ?',
    updateMember:'UPDATE user SET isVip = ? WHERE (id = ?)', //改变用户vip字段
    changeOrderStatus:'UPDATE userorder SET isAvailable = 0 WHERE (outTradeNo = ?)', //改变订单isAvailable字段
    selectOrderStatus:'SELECT isAvailable from userorder WHERE (outTradeNo = ?)', //查询订单isAvailable字段
    queryVipStatus:'SELECT hVip from userorder WHERE (outTradeNo = ?)',//查询是否是支付了会员及会员等级
    queryAllHotGoods: 'SELECT * FROM hotgoods',
    gethotGoodsById: 'SELECT * FROM hotgoods WhERE id = ?',
    queryAllGoods:'SELECT * FROM hotgoods WHERE classify = ?',
    getSubItem:'SELECT * FROM subitem',
    getSubItemById:'SELECT * FROM subitem WHERE id = ?',
    deleteById: 'DELETE FROM user WHERE id = ? ',
    updatePerson: 'UPDATE user SET dress = ? WHERE (id = ?)',
    getPersonByName: 'SELECT * FROM user WHERE id = ? ',
    insertorder:'INSERT INTO userorder(userId,goodid,outTradeNo,total,adress,isCoupon,createTime,hVip,isAvailable) VALUES(?,?,?,?,?,?,?,?,?)',
    updateorder:'UPDATE userorder SET send_pay_date = ? WHERE (outTradeNo = ?)',
    getorder:'SELECT * FROM userorder WHERE outTradeNo = ?' , //查询订单
    queryAllUserOrder:'SELECT * FROM userorder WHERE userId = ? and isDel = 0', //根据id查询所有订单
    changeUserOrderIsDel:'UPDATE userorder SET isDel = 1 WHERE (outTradeNo = ?)',//改变isDel
    checkUserorder:"SELECT * FROM userorder WHERE  send_pay_date is NULL ", //检查用户订单
    deleteuserorderByoutTradeNo:'DELETE FROM userorder WHERE outTradeNo = ?', //删除用户订单

    cancelPay:'UPDATE userorder SET status = 0 WHERE (outTradeNo = ?)', //点击付款数据库写入，status为1，超过时间后status为0(?)
    queryOrder:'SELECT * FROM userorder',
    selectCouponList:'SELECT name,discountMoney,quantity,vaildTime FROM couponlist WHERE (id = ?)',//查询优惠券信息
    selectCouponListAmount:'SELECT amount FROM couponlist'//查询优惠券金额
};
module.exports = personSQL;