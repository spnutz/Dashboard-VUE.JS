import Api from './Api'

export default {
    CreateGroupElder(vilId) {
        return Api().post('/admin/village/'+vilId+'/eldergroup')
    },
    CreateGroupVolunteer(vilId) {
        return Api().post('/admin/village/'+vilId+'/volunteergroup')
    }
}