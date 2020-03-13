<template>
  <div class="Elder">
    <v-container>
      <v-row></v-row>
      <v-row>
        <v-col>
          <v-data-table :headers="headers" :items="elders" :items-per-page="5" class="elevation-1" item-key="id"> 
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>รายชื่อผู้สูงอายุ</v-toolbar-title>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{item}">
              <v-btn depressed small v-on:click="navigateTo('/elder/'+item.id)"  color="green" class="white--text">เพิ่มเติม</v-btn>
            </template>
            
          </v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import ElderService from "../services/ElderService";

export default {
  data() {
    return {
      headers: [
        {
          text: "ไอดีผู้สูงอายุ",
          align: "start",
          sortable: false,
          value: "id"
        },
        { text: "ชื่อ", align: "start", sortable: false, value: "fname" },
        { text: "นามสกุล", align: "start", sortable: false, value: "lname" },
        {
          text: "ไอดีผู้สูงอายุ",
          align: "start",
          sortable: false,
          value: "id"
        },
        { text: "สถานะ", align: "start", sortable: false, value: "status" },
        { text: 'actions', value: 'actions', sortable: false }
      ],
      elders: [],
      selected: []
    };
  },
  async created() {
    try {
      this.elders = (await ElderService.ShowAllElder()).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    }   
  },
 
};
</script>