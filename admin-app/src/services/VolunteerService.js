import Api from './Api'
var qs = require('querystring') // server ไม่ได้ีับเป็น json เลยต้องช้อันนี้

export default {
    ShowAllVolunteers() {
        return Api().get('volunteer')
    },
    CreateVolunteer(data) {
        return Api().post('volunteer', 
        qs.stringify({
            username: data.username,
            password: data.password,
            fname: data.fname,
            lname: data.lname,
            tel: data.tel,
            villageId: data.villageId
        }))
    },
    ShowVolunteerById(id) {
        return Api().get('volunteer/'+id)
    },
    AddGroup(id, data) {
        return Api().put('volunteer/'+id+'/addgroup',
        qs.stringify({
            volunteergroubId: data.volunteergroubId
        }))
    },
    ShowVolunteerGroup() {
        return Api().get('volunteergroup')
    }
}