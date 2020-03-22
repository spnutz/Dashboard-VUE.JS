import Api from './Api'
var qs = require('querystring') // server ไม่ได้ีับเป็น json เลยต้องช้อันนี้

export default {
    AddfileElder(formData) {
        return Api().post('admin/uploadfile', formData)
    },
    CreateElder(data) {
        return Api().post('admin/elder', 
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
        return Api().get('admin/elder')
    },
    ShowElderById (elderId){
        return Api().get('admin/elder/'+elderId)
    },
    CreateGroupElder() {
        return Api().post('eldergroup')
    },
    ShowGroupElder() {
        return Api().get('eldergroup')
    },
    AddElderGroup(elderId, data) {
        return Api().put('elder/'+elderId+'/addgroup',
        qs.stringify({
            eldergroubId: data.eldergroubId
        }))
    }
}