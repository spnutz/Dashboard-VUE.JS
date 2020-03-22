<template>
<div>
  <Navbar/>
  <v-content class="mx-4 mb-4">
  <div class="dashboard">
    <v-container class="gery lighten-5">
        <v-row>
            <v-col cols="3" color="#26c6da" class="mx-auto">
                <v-card flat>
                  <v-container class="card-elder">
                    <v-card-title class="white--text headline font-weight-bold"><center>จำนวนผู้สูงอายุ</center></v-card-title>
                    <v-card-text  class="white--text headline font-weight-bold"><center><h1>{{elders.length}}</h1> </center></v-card-text>
                  </v-container>
                </v-card>
            </v-col>
            <v-col cols="3">
                <v-card flat>
                  <v-container class="card-volunteer">
                    <v-card-title class="white--text headline font-weight-bold"><center>จำนวนอาสมัคร</center></v-card-title>
                    <v-card-text  class="white--text headline font-weight-bold"><center><h1>{{volunteers.length}}</h1> </center></v-card-text>
                  </v-container>
                </v-card>
            </v-col>
            <v-col cols="6">
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table :headers="headers" :items="historys" :items-per-page="5" class="elevation-1">
                  <template v-slot:top>
                  <v-toolbar flat color="white">
                    <v-toolbar-title>ประวัติการเข้าช่วยเหลือ</v-toolbar-title>
                  </v-toolbar>
                </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
  </div>
  </v-content>
  </div>
</template>


<script>
import DashboardService from "../services/DashboardService";
import ElderService from "../services/ElderService";
import VolunteerService from "../services/VolunteerService";

export default {
  data() {
    return {
      headers: [
        {
          text: "ไอดีอาสาสมัคร",
          align: "start",
          sortable: false,
          value: "volunteerId"
        },
        { text: "ผู้สูงอายุที่หกล้ม", value: "elderfname" },
        { text: "เวลา", value: "createdAt" },
        { text: "สถานะ", value: "status" }
      ],
      historys: [],
      volunteers: [],
      elders: []
    };
  },
  async created() {
    try {
      this.historys = (await DashboardService.ShowAllHistory()).data;
      this.elders = (await ElderService.ShowAllElder()).data;
      this.volunteers = (await VolunteerService.ShowAllVolunteers()).data;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>

<style scoped>

.card-elder {
  background-image: linear-gradient(
    to right,
    rgb(102, 163, 255),
    rgb(202, 169, 224)
  );
}
.card-volunteer {
  background-image: linear-gradient(
    to right,
   rgb(102, 255, 102),
    rgb(153, 255, 255)

  );
}
</style>
