<template>
<div>
  <Navbar/>
  <v-content class="mx-4 mb-4">
  <div class="areas">
    <v-container>
      <v-row>
        <v-col></v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="areas"
            :items-per-page="5"
            class="elevation-1"
            item-key="id"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>พื้นที่ที่ดูแล</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  depressed
                  small
                  @click.stop="dialog = true"
                  color="blue"
                  class="white--text"
                >เพิ่มพื้นที่</v-btn>
                <v-dialog v-model="dialog" max-width="500">
                  <v-card>
                    <v-card-title>สร้างพื้นที่</v-card-title>
                    <form v-on:submit.prevent="createArea">
                      <v-text-field v-model="newarea.province" label="จังหวัด" required></v-text-field>
                      <v-text-field v-model="newarea.areaname" label="ตำบล" required></v-text-field>
                      <v-text-field v-model="newarea.postalcode" label="รหัสไปรษณีย์" required></v-text-field>
                      <center>
                        <v-btn color="success" class="mr-4" type="submit">submit</v-btn>
                      </center>
                    </form>
                  </v-card>
                </v-dialog>
              </v-toolbar>
            </template>
            <template v-slot:item.actions="{item}">
              <v-btn
                depressed
                small
                v-on:click="navigateTo('/area/'+item.id+'/village')"
                color="green"
                class="white--text"
              >เพิ่มเติม</v-btn>
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
import AreaService from "../services/AreaService";

export default {
  data() {
    return {
      newarea: {
        areaname: "",
        province: "",
        postalcode: ""
      },
      dialog: false,
      headers: [
        { text: "ไอดี", align: "start", sortable: false, value: "id" },
        { text: "จังหวัด", align: "start", sortable: false, value: "province" },
        { text: "ตำบล", align: "start", sortable: false, value: "areaname" },
        {
          text: "รหัสไปรษณีย์",
          align: "start",
          sortable: false,
          value: "postalcode"
        },
        { text: "หมู่บ้าน", align: "start", sortable: false, value: "actions" }
      ],
      areas: []
    };
  },
  async created() {
    try {
      this.areas = (await AreaService.ShowAllArea()).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },
    async createArea() {
      try {
        await AreaService.CreateArea(this.newarea);
        console.log(this.newarea);
        //this.$router.push({ name: "area" });
        window.location.reload()
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>