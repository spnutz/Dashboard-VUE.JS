import Api from './Api'
//var qs = require('querystring') // server ไม่ได้ีับเป็น json เลยต้องช้อันนี้

export default{
    ShowAllHistory() {
        return Api().get('historys')
    }
}