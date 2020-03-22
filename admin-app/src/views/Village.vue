<template>
<div>
  <Navbar/>
  <v-content class="mx-4 mb-4">
  <div class="village">
    <v-container>
      <v-row>
        <v-col></v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-data-table
            :headers="headers"
            :items="villages"
            :items-per-page="5"
            class="elevation-1"
            item-key="id"
          >
            <template v-slot:top>
              <v-toolbar flat color="white">
                <v-toolbar-title>หมู่บ้านในตำบล {{areas[0].areaname}}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn
                  depressed
                  small
                  @click.stop="dialog = true"
                  color="blue"
                  class="white--text"
                >เพิ่มหมู่บ้าน</v-btn>
                <v-dialog v-model="dialog" max-width="1000">
                  <v-card>
                    <v-card-title>สร้างหมู่บ้าน</v-card-title>
                    <form v-on:submit.prevent="createVillage">
                      <v-text-field v-model="newvillage.name" label="หมู่บ้าน" required></v-text-field>
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
                v-on:click="navigateTo('/village/'+item.id+'/member')"
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
      newvillage: {
        name: ""
      },
      dialog: false,
      areas: [],
      villages: [],
      headers: [
        { text: "ไอดีหมู่บ้าน", align: "start", sortable: false, value: "id" },
        {
          text: "ชื่อหมู่บ้าน",
          align: "start",
          sortable: false,
          value: "name"
        },
        {
          text: "สมาชิกในหมู่บ้าน",
          align: "start",
          sortable: false,
          value: "actions"
        }
      ]
    };
  },
  async created() {
    try {
      let areaId = this.$route.params.areaId;
      this.areas = (await AreaService.ShowAreaById(areaId)).data;
      this.villages = (await AreaService.ShowVillageInArea(areaId)).data;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    navigateTo(route) {
        let areaId = this.$route.params.areaId;
      this.$router.push('/area/'+areaId+route);
    },
    async createVillage() {
        try {
            let areaId = this.$route.params.areaId;
            await AreaService.CreateVillage(this.newvillage, areaId);
            window.location.reload()
            console.log(this.newvillage)
        } catch (err) {
            console.log(err)
        }
    } 
  }
};
</script>