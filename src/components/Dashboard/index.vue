<template>
    <div class="container">
        <navbar/>
        <navtabs/>
        <div>
            <div class="columns">
                <div class="column is-one-thirds">
                    <div class="box">
                        <p class="is-size-6 has-text-weight-bold">Car Preferences</p>
                        <ul>
                            <li>
                                <i class="fa fa-arrow-right"></i>
                                <router-link to="/profile/preferences"> Edit your car share preferences</router-link>
                            </li>
                        </ul>

                        <hr>
                        <p class="is-size-6 has-text-weight-bold">Member Verification</p>
                        <ul>
                            <li>
                                <i class="fa fa-exclamation-circle"></i>
                                <router-link to="/profile/verification"> Verify your Phone Number</router-link>
                            </li>
                            <li>
                                <i class="fa fa-exclamation-circle"></i>
                                <router-link to="/profile/verification"> Verify your Email Address</router-link>
                            </li>
                            <li>
                                <i class="fa fa-exclamation-circle"></i>
                                <router-link to="/profile/verification"> Verify your Profile Photo</router-link>
                            </li>
                        </ul>
                        <br>
                        <i class="fa fa-arrow-right"></i>
                        <router-link to="/profile/verification"> Complete your profile verification</router-link>
                        <hr>
                        <p class="is-size-6 has-text-weight-bold">Member Activity</p>
                        <br>
                        <p>Member since Jun2017</p>
                    </div>
                </div>
                <div class="column is-two-thirds">
                    <p class="is-size-4 has-text-weight-bold">
                        <i class="fa fa-bell"></i> Notifications</p>
                    <hr>
                    <p class="is-size-6 has-text-weight-bold">Add your photo</p>
                    <p class="is-size-6">People like to put a face to a name</p>
                    <hr>
                    <br>
                    <p class="is-size-4 has-text-weight-bold">
                        <i class="fa fa-envelope"></i> New Messages</p>
                    <hr>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import Navbar from '@/components/shared/Navbar';
    import Navtabs from '@/components/shared/NavTabs'
    export default {
        name: 'UserDashboard',
        data() {
            return {

            }
        },
        components: {
            Navbar,
            Navtabs
        }

    }
</script>
<style scoped>
    p+ul {
        margin: 20px 0px;
    }

    li {
        padding: 5px
    }

    .column {
        margin: 50px 0;
    }
</style>