<template>
<nav>
    <v-app-bar flat app>
        <v-app-bar-nav-icon class="grey--text" @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="text-uppercase grey--text">
            <span class="font-weight-light">Falldetection</span>
            <span>System</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn text color="grey" v-on:click="logout">
            <span>Sign Out</span>
            <v-icon>exit_to_app</v-icon>
        </v-btn>
    </v-app-bar>

    <v-navigation-drawer app v-model=drawer   class="primary">
        <v-list>
            <v-list-item v-for="link in links" v-bind:key="link.text" router :to="link.route">
                <v-list-item-action>
                    <v-icon class="white--text">{{ link.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class="white--text">{{ link.text }}</v-list-item-title>
                </v-list-item-content>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</nav>
    
</template>

<script>
export default {
    data() {
        return {
            drawer: true,
            links:[
                {icon: 'dashboard', text:'Dashboard', route: '/dashboard'},
                {icon: 'home', text:"พื้นที่", route: '/area'},
                {icon: 'accessible', text: "ผู้สูงอายุ", route: '/elders'},
                {icon: 'people', text: "อาสาสมัคร", route: '/volunteers'},
                {icon: 'email', text:"About", route:'/about'}
            ]
        }
    },
    methods:{
        logout() {
        this.$store.dispatch('setToken', null)
        this.$router.push({
            name: 'login'
        })
    }
    }
    
}
</script>