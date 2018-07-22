<template>
    <div>
        <div>
            <p class="is-size-4 has-text-weight-bold">Your Personal Information</p>
            <hr>
            <div class="box">
                <div class="container">
                    <table class="table">
                        <tbody>
                            <tr>
                                <td class="pull-right">
                                    <p class="is-size-6 has-text-weight-bold"> Gender</p>
                                </td>
                                <td>Male</td>
                            </tr>
                            <tr>
                                <td class="pull-right">
                                    <p class="is-size-6 has-text-weight-bold">First Name</p>
                                </td>
                                <td>
                                    <input type="text" class="input">
                                </td>
                            </tr>
                            <tr>
                                <td class="pull-right">
                                    <p class="is-size-6 has-text-weight-bold">Last Name</p>
                                </td>
                                <td>
                                    <input type="text" class="input">
                                </td>
                            </tr>
                            <br>
                            <tr>
                                <td class="pull-right">
                                    <p class="is-size-6 has-text-weight-bold"> Email</p>
                                </td>
                                <td>
                                    <input type="text" class="input">
                                </td>
                            </tr>
                            <tr>
                                <td class="pull-right">
                                    <p class="is-size-6 has-text-weight-bold">Mobile phone</p>
                                </td>
                                <td>
                                    <input type="text" class="input">
                                </td>
                            </tr>
                            <br>
                            <tr>
                                <td class="pull-right">
                                    <p class="is-size-6 has-text-weight-bold"> Birth Year</p>
                                </td>
                                <td>
                                    <div class="select">
                                        <select>
                                            <option>Select Date</option>
                                            <option>Option</option>
                                        </select>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="pull-right">
                                    <p class="is-size-6 has-text-weight-bold"> Bio</p>
                                </td>
                                <td>
                                    <div class="notification is-info ">

                                        <p>
                                            <i class="fa fa-exclamation-circle"></i> Tell other members about yourself
                                            <br>and why they should want to travel
                                            <br> with you (min. 10 characters).</p>
                                    </div>
                                    <textarea class="textarea" name="" id="" cols="30" placeholder="Example: 'Im a student of University of Lagos, and often visit friends at Lekki'"></textarea>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'GeneralProfile',
        data() {
            return {

            }
        }
    }
</script>
<style scoped>
 .table td {
        border: none !important;
    }
    .box, .table{
        background-color: #eeeeee;  
    }
</style>