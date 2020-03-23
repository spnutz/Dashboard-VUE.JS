<template>
<div>
  <Navbar/>
  <v-content class="mx-4 mb-4">
  <div>
      <v-container>
        <v-row>
          <v-col cols="6">
            <v-card class="mx-auto" max-width="500">
              <v-card-text>
                <div>ข้อมูลผู้สูงอายุ</div>
                <br>
                <p class="display-1 text--primary">
                <v-avatar color="indigo">
                  <v-icon dark>mdi-account-circle</v-icon>
                </v-avatar>
                {{elder[0].fname}} {{elder[0].lname}}</p>
                <p>รหัสประจำตัวประชาชน : {{elder[0].indentid}}</p>
                <p>เบอร์โทร : {{elder[0].tel}}</p>
                <p>เพศ : {{elder[0].gender}}</p>
                <p>กลุ่มผู้สูงอายุที่ {{elder[0].eldergroubId}}</p>
                
              </v-card-text>
              <v-card-actions>
                <v-btn color="success" @click.stop="dialog = true">
                  <v-icon>mdi-pencil</v-icon>
                  <span>เพิ่มกลุ่มผู้สูงอายุ</span>
                </v-btn>
                <v-dialog v-model="dialog" max-width="500">
                    <v-card>
                      <v-card-title>เพิ่มกลุ่มผู้สูงอายุ</v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <form v-on:submit.prevent="addGroup">
                                <v-text-field v-model="editElder.eldergroubId" label="กลุ่มผู้สูงอายุ"></v-text-field>
                                
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
          <v-col cols="6">
            <v-card class="mx-auto" max-width="500">
              <v-card-text>
                <div>รายชื่ออาสาสมัครที่รับผิดชอบ</div>
                <v-container>
                  <v-data-table
                :headers="headers"
                :items="volunteers"
                :items-per-page="5"
                class="elevation-1"
              ></v-data-table>
                </v-container>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
  </div>
  </v-content>
  </div>
</template>

<script>
import ElderService from '../services/ElderService';
import VolunteerService from '../services/VolunteerService';

export default {
  data() {
    return {
      volunteers:[],
      elder: [],
      dialog: false,
      editElder: {
        eldergroubId: [],
      },
      headers: [
        { text: "ชื่อ", align: "start", sortable: false, value: "fname" },
        { text: "นามสกุล", align: "start", sortable: false, value: "lname" },
        { text: "เบอร์โทร", align: "start", sortable: false, value: "tel" }
      ]
    }
  },
  async created() {
    let elderId = this.$route.params.elderId;
    this.elder = (await ElderService.ShowElderById(elderId)).data;
    this.volunteers = (await VolunteerService.ShowVolunteerByElderId(elderId)).data;

    console.log(this.Egroup)
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route)
    },
    async addGroup(){
      try {
        let elderId = this.$route.params.elderId;
        console.log('aaa');
        console.log(elderId);
        await ElderService.AddElderGroup(elderId, this.editElder);
        window.location.reload()
      } catch (err) {
        console.log(err)
      }
    }
  },
};
</script>

<style scoped>
</style>