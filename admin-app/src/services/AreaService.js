import Api from './Api'
var qs = require('querystring') // server ไม่ได้ีับเป็น json เลยต้องช้อันนี้

export default {
    CreateArea(data) {
        return Api().post('area',
        qs.stringify({
            areaname: data.areaname,
            province: data.province,
            postalcode: data.postalcode
        }))
    },
    ShowAllArea() {
        return Api().get('area')
    },
    ShowAreaById(id) {
        return Api().get('area/'+id)
    },
    ShowVillageInArea(id) {
        return Api().get('area/'+id+'/village')
    },
    CreateVillage(data, id) {
        return Api().post('area/'+id+'/village', 
        qs.stringify({name: data.name}))
    },
    ShowElderinVillage(areaId, villageId) {
        return Api().get('area/'+areaId+'/village/'+villageId+'/elder')
    },
    ShowVolunteerinVillage(areaId, villageId) {
        return Api().get('area/'+areaId+'/village/'+villageId+'/volunteer')
    }
}

