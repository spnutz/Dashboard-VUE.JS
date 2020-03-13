<template>
  <div class="dashboard">
    <v-container class="gery lighten-5">
        <v-row>
            <v-col cols="6"></v-col>
            <v-col cols="3" color="#26c6da" class="mx-auto">
                <v-card>mdi-twitter</v-card>
            </v-col>
            <v-col cols="3" class="yellow">
                <v-card></v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-data-table :headers="headers" :items="historys" :items-per-page="5" class="elevation-1"></v-data-table>
            </v-col>
        </v-row>
    </v-container>
  </div>
</template>


<script>
import DashboardService from "../services/DashboardService";

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
      historys: []
    };
  },
  async created() {
    try {
      this.historys = (await DashboardService.ShowAllHistory()).data;
    } catch (err) {
      console.log(err);
    }
  }
};
</script>
