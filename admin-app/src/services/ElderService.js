import Api from './Api'
var qs = require('querystring') // server ไม่ได้ีับเป็น json เลยต้องช้อันนี้

export default {
    CreateElder(data) {
        return Api().post('elder', 
        qs.stringify({
            indentid: data.indentid,
            fname: data.fname,
            lname: data.lname,
            tel: data.tel,
            gender: data.gender,
            villageId: data.villageId
        }))
    },
    ShowAllElder (){
        return Api().get('elder')
    },
    CreateGroupElder() {
        return Api().post('eldergroup')
    },
    ShowGroupElder() {
        return Api().get('eldergroup')
    }
}