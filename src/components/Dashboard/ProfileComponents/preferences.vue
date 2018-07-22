<template>
    <div>
        <div>
            <p class="is-size-4 has-text-weight-bold">Your carpooling preferences</p>
            <hr>
            <div class="box">
                <div class="columns is-centered">
                    <div class="column is-half">
                        <table class="table pull-right">
                            <tbody>
                                <tr>
                                    <td>
                                        <p class="is-size-6 has-text-weight-bold pull-right">Chattiness :</p>
                                    </td>
                                    <td>
                                        <div class="img-holder">
                                            <img :src="prefChatNo" class="image is-48x48" alt="">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="img-holder">
                                            <img :src="prefChatMaybe" class="image is-48x48" alt="">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="img-holder">
                                            <img :src="prefChatYes" class="image is-48x48" alt="">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="is-size-6 has-text-weight-bold pull-right">Music :</p>
                                    </td>
                                    <td>
                                        <div class="img-holder">
                                            <img :src="prefMusicNo" class="image is-48x48" alt="">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="img-holder">
                                            <img :src="prefMusicMaybe" class="image is-48x48" alt="">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="img-holder">
                                            <img :src="prefMusicYes" class="image is-48x48" alt="">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="is-size-6 has-text-weight-bold pull-right">Pets :</p>
                                    </td>
                                    <td>
                                        <div class="img-holder">
                                            <img :src="prefPetsNo" class="image is-48x48" alt="">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="img-holder">
                                            <img :src="prefPetsMaybe" class="image is-48x48" alt="">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="img-holder">
                                            <img :src="prefPetsYes" class="image is-48x48" alt="">
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <p class="is-size-6 has-text-weight-bold pull-right">Smoking :</p>
                                    </td>
                                    <td>
                                        <div class="img-holder">
                                            <img :src="prefSmokingNo" class="image is-48x48" alt="">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="img-holder">
                                            <img :src="prefSmokingMaybe" class="image is-48x48" alt="">
                                        </div>
                                    </td>
                                    <td>
                                        <div class="img-holder">
                                            <img :src="prefSmokingYes" class="image is-48x48" alt="">
                                        </div>
                                    </td>
                                </tr>
                               
                            </tbody>
                        </table>
                        <div>
                            <button class="button is-myblue pull-right">Save</button>
                        </div>
                    </div>
                    <div class="column is-half">

                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
    import prefMusicNo from '@/assets/img/pref-music-no.png';
    import prefMusicMaybe from '@/assets/img/pref-music-maybe.png';
    import prefMusicYes from '@/assets/img/pref-music-yes.png';
    import prefChatNo from '@/assets/img/pref-bla.png';
    import prefChatMaybe from '@/assets/img/pref-blabla.png';
    import prefChatYes from '@/assets/img/pref-blablabla.png';
    import prefPetsNo from '@/assets/img/pref-pet-no.png';
    import prefPetsMaybe from '@/assets/img/pref-pet-maybe.png';
    import prefPetsYes from '@/assets/img/pref-pet-yes.png';
    import prefSmokingNo from '@/assets/img/pref-smoking-no.png';
    import prefSmokingMaybe from '@/assets/img/pref-smoking-maybe.png';
    import prefSmokingYes from '@/assets/img/pref-smoking-yes.png';

    export default {
        name: 'PreferenceProfile',
        data() {
            return {
                prefMusicNo,
                prefMusicMaybe,
                prefMusicYes,
                prefChatNo,
                prefChatMaybe,
                prefChatYes,
                prefPetsNo,
                prefPetsMaybe,
                prefPetsYes,
                prefSmokingNo,
                prefSmokingMaybe,
                prefSmokingYes
            }
        }
    }
</script>
<style scoped>
    .table td {
        border: none !important;
    }

    .box,
    .table {
        background-color: #eeeeee;
    }

    .img-holder {
        background-color: white;
        border-radius: 5px;
        margin-bottom: 5px;
        margin-right: 5px

    }
    button{
        width: 50%;
        margin: 0 15px;
    }
</style>