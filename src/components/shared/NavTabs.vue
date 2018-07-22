<template>
    <div>
        <div class="tabs">
            <ul>
                <li class="is-active">
                    <router-link to="/dashboard">Dashboard</router-link>
                </li>
                <li>
                    <router-link to="/ridesoffered">Rides offered</router-link>
                </li>
                <li>
                    <router-link to="/messages">Messages</router-link>
                </li>
                <!-- <li>
                    <router-link to="/ridealerts">Ride Alerts</router-link>
                </li> -->
                <li>
                    <router-link to="/profile/general">Profile</router-link>
                </li>

            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'NavTabs',
        data() {
            return {

            }
        }
    }
</script>