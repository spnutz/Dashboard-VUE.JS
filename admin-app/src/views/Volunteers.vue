<template>
  <div class="volunteer">
      <v-container>
          <v-row>
          </v-row>
          <v-row>
              <v-col>
                  <v-data-table :headers="headers" :items="volunteers" :items-per-page="5" class="elevation-1" item-key="id">
                      <template v-slot:top>
                          <v-toolbar flat color="white">
                              <v-toolbar-title>รายชื่ออาสาสมัคร</v-toolbar-title>
                          </v-toolbar>
                      </template>
                      <template v-slot:item.actions="{item}">
                          <v-btn depressed small v-on:click="navigateTo('/volunteer/'+item.id)"  color="green" class="white--text">เพิ่มเติม</v-btn>
                      </template>
                  </v-data-table>
              </v-col>
          </v-row>
      </v-container>
  </div>
</template>

<script>
import VolunteerService from "../services/VolunteerService";

export default {
   data() {
       return {
           volunteers:[],
           headers: [
               {text: "ไอดีอาสาสมัคร", align: "start", sortable:false, value:"id"},
               {text: "ชื่อ", align: "start", sortable:false, value:"fname"},
               {text: "นามสกุล", align: "start", sortable:false, value:"lname"},
               {text: "สถานะ", align: "start", sortable:false, value:"status"},
               { text: 'actions', value: 'actions', sortable: false }
           ]
       }
   },
   async created() {
       try {
           this.volunteers = (await VolunteerService.ShowAllVolunteers()).data
       } catch (err) {
           console.log(err)
       }
   },
   methods: {
       navigateTo(route) {
           this.$router.push(route);
       }
   },
};
</script>