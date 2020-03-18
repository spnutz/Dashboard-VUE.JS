import Api from './Api'

export default {
    CreateGroupElder() {
        return Api().post('eldergroup')
    },
    CreateGroupVolunteer() {
        return Api().post('volunteergroup')
    }
}