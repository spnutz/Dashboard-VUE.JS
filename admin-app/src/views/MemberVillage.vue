<template>
  <div>
    <Navbar />
    <v-content class="mx-4 mb-4">
      <div class="member">
        <v-container>
          <v-row></v-row>
          <v-row>
            <v-col>
              <v-toolbar-title>สมาชิกในหมู่บ้าน</v-toolbar-title>
              <v-tabs>
                <v-tab>รายชื่อผู้สูงอายุ</v-tab>
                <v-tab>รายชื่ออาสาสมัคร</v-tab>
                <v-tab>กลุ่มผู้สูงอายุ</v-tab>
                <v-tab>กลุ่มอาสาสมัคร</v-tab>

                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <v-row>
                        <p></p>
                        <v-spacer></v-spacer>
                        <v-btn color="warning" @click.stop="uploadDialog = true">อัพโหลดรายชื่อผู้สูงอายุ</v-btn>
                        <v-dialog v-model="uploadDialog" max-width="350">
                          <v-card>
                            <v-container>
                                <v-card-title>อัพโหลดรายชื่อผู้สูงอายุ (csv)</v-card-title>
                                <input type="file"  ref="file" v-on:change="handleFileUpload()">
                                <v-btn color="success" class="mr-4" type="submit" v-on:click="submitFile()">อัพโหลด</v-btn>
                            </v-container>
                          </v-card>
                        </v-dialog>
                        <v-btn
                          color="primary"
                          @click.stop="elderDialog = true"
                        >เพิ่มรายชื่อผู้สูงอายุ</v-btn>
                        <v-dialog v-model="elderDialog" max-width="500">
                          <v-card>
                            <v-card-title>สร้างรายชื่อผู้สูงอายุ</v-card-title>
                            <form v-on:submit.prevent="CreateElder">
                              <v-text-field
                                v-model="createElder.indentid"
                                label="รหัสประชาชน"
                                required
                              ></v-text-field>
                              <v-text-field v-model="createElder.fname" label="ชื่อ" required></v-text-field>
                              <v-text-field v-model="createElder.lname" label="นามสกุล" required></v-text-field>
                              <v-text-field
                                v-model="createElder.tel"
                                label="เบอร์โทรศัพท์"
                                required
                              ></v-text-field>
                              <v-text-field v-model="createElder.gender" label="เพศ" required></v-text-field>
                              <v-text-field
                                v-model="createElder.villageId"
                                label="ไอดีหมู่บ้าน"
                                required
                              ></v-text-field>
                              <center>
                                <v-btn color="success" class="mr-4" type="submit">submit</v-btn>
                              </center>
                            </form>
                          </v-card>
                        </v-dialog>
                        <br />
                      </v-row>
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                      ></v-text-field>

                      <v-data-table
                        :headers="Eheaders"
                        :items="elders"
                        :items-per-page="5"
                        class="elevation-1"
                        item-key="id"
                        :search="search"
                      >
                        <template v-slot:item.actions="{item}">
                          <v-btn
                            v-on:click="navigateTo('/elder/'+item.id)"
                            color="green"
                            class="white--text"
                          >เพิ่มเติม</v-btn>
                        </template>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <v-row>
                        <p></p>
                        <v-spacer></v-spacer>
                        <v-btn
                          color="primary"
                          @click.stop="volunteerDialog = true"
                        >เพิ่มรายชื่ออาสาสมัคร</v-btn>
                        <v-dialog v-model="volunteerDialog" max-width="500">
                          <v-card>
                            <v-card-title>เพิ่มรายชื่ออาสาสมัคร</v-card-title>
                            <form v-on:submit.prevent="CreateVolunteer">
                              <v-text-field
                                v-model="createVolunteer.username"
                                label="ชื่อผู้ใช้งาน"
                                required
                              ></v-text-field>
                              <v-text-field
                                v-model="createVolunteer.password"
                                label="รหัสผ่าน"
                                required
                              ></v-text-field>
                              <v-text-field v-model="createVolunteer.fname" label="ชื่อ" required></v-text-field>
                              <v-text-field
                                v-model="createVolunteer.lname"
                                label="นามสกุล"
                                required
                              ></v-text-field>
                              <v-text-field
                                v-model="createVolunteer.tel"
                                label="เบอรฺโทรศัพท์"
                                required
                              ></v-text-field>
                              <v-text-field
                                v-model="createVolunteer.villageId"
                                label="ไอดีหมู่บ้าน"
                                required
                              ></v-text-field>
                              <center>
                                <v-btn color="success" class="mr-4" type="submit">submit</v-btn>
                              </center>
                            </form>
                          </v-card>
                        </v-dialog>
                      </v-row>
                      <v-data-table
                        :headers="Vheaders"
                        :items="volunteers"
                        :items-per-page="5"
                        class="elevation-1"
                        item-key="id"
                      >
                        <template v-slot:item.actions="{item}">
                          <v-btn
                            v-on:click="navigateTo('/volunteer/'+item.id)"
                            color="green"
                            class="white--text"
                          >เพิ่มเติม</v-btn>
                        </template>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <p>กลุ่มผู้สูงอายุ : {{elderGroup.length}} กลุ่ม</p>
                          <v-spacer></v-spacer>
                          <v-btn
                            class="mx-2"
                            fab
                            dark
                            color="primary"
                            @click.stop="groupElder = true"
                          >
                            <v-icon dark>mdi-plus</v-icon>
                          </v-btn>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-dialog v-model="groupElder" max-width="500">
                      <v-card>
                        <v-card-title>ยืนยันที่จะเพิ่มกลุ่มผู้สูงอายุ</v-card-title>
                        <v-container>
                          <form v-on:submit.prevent="CreateGroupElder">
                            <center>
                              <v-btn color="success" class="mr-4" type="submit">ยืนยัน</v-btn>
                            </center>
                          </form>
                        </v-container>
                      </v-card>
                    </v-dialog>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <p>กลุ่มอาสาสมัคร : {{volunteerGroup.length}} กลุ่ม</p>
                          <v-spacer></v-spacer>
                          <v-btn
                            class="mx-2"
                            fab
                            dark
                            color="primary"
                            @click.stop="groupVolunteer = true"
                          >
                            <v-icon dark>mdi-plus</v-icon>
                          </v-btn>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-dialog v-model="groupVolunteer" max-width="500">
                      <v-card>
                        <v-card-title>ยืนยันที่จะเพิ่มกลุ่มอาสาสมัคร</v-card-title>
                        <v-container>
                          <form v-on:submit.prevent="CreateGroupVolunteer">
                            <center>
                              <v-btn color="success" class="mr-4" type="submit">ยืนยัน</v-btn>
                            </center>
                          </form>
                        </v-container>
                      </v-card>
                    </v-dialog>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </v-content>
  </div>
</template>

<script>
import AreaService from "../services/AreaService";
import ElderService from "../services/ElderService";
import VolunteerService from "../services/VolunteerService";
import GroupService from "../services/Group";

export default {
  data() {
    return {
      file:'',
      uploadDialog: false,
      groupVolunteer: false,
      groupElder: false,
      search: "",
      elderGroup: [],
      volunteerGroup: [],
      volunteerDialog: false,
      elderDialog: false,
      createVolunteer: {
        username: "",
        password: "",
        fname: "",
        lname: "",
        tel: "",
        villageId: ""
      },
      createElder: {
        indentid: "",
        fname: "",
        lname: "",
        tel: "",
        gender: "",
        villageId: ""
      },
      Eheaders: [
        {
          text: "ไอดีผู้สูงอายุ",
          align: "start",
          sortable: false,
          value: "id"
        },
        { text: "ชื่อ", align: "start", sortable: false, value: "fname" },
        { text: "นามสกุล", align: "start", sortable: false, value: "lname" },
        { text: "เพศ", align: "start", sortable: false, value: "gender" },
        {
          text: "ข้อมูลเพิ่มเติม",
          align: "start",
          sortable: false,
          value: "actions"
        }
      ],
      Vheaders: [
        { text: "ไอดีอาสาสมัคร", align: "start", sortable: false, value: "id" },
        { text: "ชื่อ", align: "start", sortable: false, value: "fname" },
        { text: "นามสกุล", align: "start", sortable: false, value: "lname" },
        { text: "สถานะ", align: "start", sortable: false, value: "status" },
        { text: "เบอร์โทร", align: "start", sortable: false, value: "tel" },
        {
          text: "ข้อมูลเพิ่มเติม",
          align: "start",
          sortable: false,
          value: "actions"
        }
      ],
      elders: [],
      volunteers: []
    };
  },
  async created() {
    try {
      let areaId = this.$route.params.areaId;
      let villId = this.$route.params.villId;
      this.volunteers = (
        await AreaService.ShowVolunteerinVillage(areaId, villId)
      ).data;
      this.elders = (await AreaService.ShowElderinVillage(areaId, villId)).data;
      this.elderGroup = (await ElderService.ShowGroupElder(villId)).data;
      this.volunteerGroup = (await VolunteerService.ShowVolunteerGroup(villId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async CreateElder() {
      try {
        await ElderService.CreateElder(this.createElder);
        console.log(this.createElder);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
    async CreateVolunteer() {
      try {
        await VolunteerService.CreateVolunteer(this.createVolunteer);
        console.log(this.createVolunteer);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
    async CreateGroupElder() {
      try {
        let villId = this.$route.params.villId;
        await GroupService.CreateGroupElder(villId);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
    async CreateGroupVolunteer() {
      try {
        let villId = this.$route.params.villId;
        await GroupService.CreateGroupVolunteer(villId);
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    async submitFile(){
      let formData = new FormData();
      formData.append('file', this.file)
      await ElderService.AddfileElder(formData)
      window.location.reload();
},
  }
};
</script>