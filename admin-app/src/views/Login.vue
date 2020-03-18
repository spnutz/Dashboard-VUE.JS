<template>
    <div>
        <h1>Admin Login</h1>
        <form v-on:submit.prevent="onLogin">
            <p>Username: <input type="text" v-model="admin.username"></p>
            <p>password : <input type="text" v-model="admin.password"></p>
            <p><button type="submit">Login</button></p>
        </form>

    </div>
</template>

<script>
import LoginService from "../services/AdminService";

export default {
    data() {
        return {
            admin: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        async onLogin () {
            try {
                console.log(this.admin)
                await LoginService.login(this.admin);
            } catch (err) {
                console.log(err)
            }
        }
    }
}
</script>