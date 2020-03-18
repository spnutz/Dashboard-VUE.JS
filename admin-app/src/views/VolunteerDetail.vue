<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="6">
                    <v-card class="mx-autp" max-width="500">
                        <v-card-text>
                            <div>ข้อมูลอาสาสมัคร</div>
                            <br>
                            <p class="display-1 text--primary">
                                <v-avatar color="indigo">
                                    <v-icon dark>mdi-account-circle</v-icon>
                                </v-avatar>
                            {{volunteer[0].fname}} {{volunteer[0].lname}}
                            </p>
                            <p>เบอร์โทรศัพท์ : {{volunteer[0].tel}}</p>
                            <p>กลุ่มอาสาสมัคร : {{volunteer[0].volunteergrobId}}</p>
                        </v-card-text>
                        <v-card-actions>
                            <v-container>
                                <v-btn color="success" @click.stop="dialog = true">
                                <v-icon>mdi-pencil</v-icon>
                                <span>แก้ไขข้อมูล</span>
                            </v-btn>
                            </v-container>
                            <v-dialog v-model="dialog" max-width="500">
                                <v-card>
                                    <v-card-title>แก้ไขข้อมูลส่วนตัว</v-card-title>
                                    <v-card-text>
                                        <v-container>
                                            <v-row>
                                                <v-col cols="12">
                                                    <form v-on:submit.prevent="addGroup">
                                                        <v-text-field v-model="editVolunteer.volunteergroubId" label="กลุ่มอาสาสมัคร"></v-text-field>
                                                        <center>
                                                            <v-btn color="success" class="mr-4" type="submit">submit</v-btn>
                                                        </center>
                                                    </form>
                                                </v-col>
                                            </v-row>
                                        </v-container>
                                    </v-card-text>
                                </v-card>
                            </v-dialog>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import VolunteerService from '../services/VolunteerService'

export default {
    data() {
        return {
            volunteer: [],
            dialog: false,
            editVolunteer: {
                volunteergroubId: ""
            }
        }
    },
    async created() {
        let volunteerId = this.$route.params.volunteerId;
        this.volunteer = (await VolunteerService.ShowVolunteerById(volunteerId)).data;
    },
    methods: {
        async addGroup() {
            try {
                let volunteerId = this.$route.params.volunteerId;
                console.log(volunteerId)
                await VolunteerService.AddGroup(volunteerId, this.editVolunteer);
                window.location.reload()
            } catch (err) {
                console.log(err)
            }
        }
    }
    }
</script>