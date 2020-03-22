<template>
  <div class="login">
    <v-container>
      <v-row></v-row>
      <v-row>
        <v-col>
          <v-card class="mx-auto my-12" max-width="374">
            <br />
            <v-card-title>
              <v-container>
                <v-row>
                  <v-col>
                    <center>เข้าสู่ระบบ</center>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-title>
            <v-card-text>
              <v-container>
                <form v-on:submit.prevent="onLogin">
                  <v-text-field v-model="username" label="ชื่อผู้ใช้งาน" required></v-text-field>
                  <v-text-field v-model="password" label="รหัสผ่าน" required type="password"></v-text-field>
                  <div class="errmsg" v-if="error">{{error}}</div>
                  <v-card-actions>
                    <v-container>
                      <v-row>
                        <v-col cols="6">
                          <center>
                            <v-btn large color="success" type="submit">เข้าสู่ระบบ</v-btn>
                          </center>
                        </v-col>
                        <v-col cols="6">
                          <center>
                            <v-btn large color="warning" @click.stop="dialog = true">ลงทะเบียน</v-btn>
                            <v-dialog v-model="dialog" max-width="500">
                              <v-card>
                                <v-container>
                                  <v-row>
                                    <v-col>
                                      <v-card-title>
                                        <center>ลงทะเบียนผู้ดูแลระบบ</center>
                                      </v-card-title>
                                    </v-col>
                                  </v-row>
                                  <v-row>
                                    <v-col>
                                      <form v-on:submit.prevent="signupAdmin">
                                        <v-text-field
                                          v-model="createAdmin.username"
                                          label="ชื่อผู้ใช้งาน" required
                                        ></v-text-field>
                                        <v-text-field v-model="createAdmin.password" label="รหัสผ่าน" required></v-text-field>
                                        <center>
                                          <v-btn color="success" class="mr-4" type="submit">submit</v-btn>
                                        </center>
                                      </form>
                                    </v-col>
                                  </v-row>
                                </v-container>
                              </v-card>
                            </v-dialog>
                          </center>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-actions>
                </form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AdminService from "../services/AdminService";

export default {
  data() {
    return {
      dialog: false,
      username: "",
      password: "",
      error: null,
      createAdmin: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async onLogin() {
      try {
        const response = await AdminService.login({
          username: this.username,
          password: this.password
        });

        this.$store.dispatch("setToken", response.data.token);
        this.$router.push({
          name: "dashboard"
        });
        console.log(response);
      } catch (error) {
        console.log(error);
        //this.error = error.response.data.error
        this.error = error.response.data.error;
        this.username = "";
        this.password = "";
      }
    },
    async signupAdmin() {
      try {
        await AdminService.signup(this.createAdmin)
        window.location.reload()
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>
<style scoped>
.errmsg {
  color: red;
}
.login {
  background-image: linear-gradient(
    rgb(156, 103, 187),
    rgb(202, 169, 224),
    white
  );
}
</style>