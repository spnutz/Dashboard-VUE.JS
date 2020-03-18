import Api from './Api'
var qs = require('querystring') // server ไม่ได้ีับเป็น json เลยต้องช้อันนี้

export default {
    login(data) {
        return Api().post('login/admin',
        qs.stringify({
            username: data.username,
            password: data.password
        }))
    }
}