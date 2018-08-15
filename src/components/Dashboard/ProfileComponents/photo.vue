<template>
  <div>
    <div>
      <p class="is-size-4 has-text-weight-bold">Your profile photo</p>
      <hr>
      <p>Add your photo now! Other members will be reassured to see who they'll be travelling with, and you'll find your
      car share much more easily. Photos also help members to recognise each other</p>
      <div class="box main">

        <div class="columns">
          <div class="column is-two-thirds">
            <div class="has-text-centered">
              <img :src="capture" alt="">
              <br>
              <p class="is-size-5 has-text-weight-bold">Upload your profile photo</p>
              <br>
              <div v-if="init_img">
                <img :src="init_img" alt="avatar">
              </div>
              <br>
              <span v-if="!successful">
              <label v-if="!upload_start"  class="button is-myblue" style="padding:20px;">
                <input type="file" accept="image/*" capture="camera" hidden @change="upload($event.target.files)"> Choose a file
              </label>
              <a v-if="upload_start" class="button is-default" @click="saveImage()">Upload</a>
              
              <br>
              <br>
              <p class="is-size-6 ">PNG, JPG or GIF, max. 3MB</p>
              </span>
            </div>
          </div>
          <div class="column is-one-thirds">
            <div class="box">
              <div class="media">
                <div class="media-left">
                  <figure class="image is-64x64">
                    <img :src="goodpic" alt="Image">
                  </figure>
                </div>
                <div class="media-content">
                  <div class="content">
                    <p class="is-size-6 has-text-weight-bold">Example of a good photo</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <ul>
                <li>
                  <p class="is-size-6 has-text-weight-bold">How to choose the right photo</p>
                </li>
              </ul>
              <ul>
                <li>
                  <p class="is-size-6 has-text-weight-bold">No Sunglasses</p>
                </li>
              </ul>
              <ul>
                <li>
                  <p class="is-size-6 has-text-weight-bold">Facing the camera</p>
                </li>
              </ul>
              <ul>
                <li>
                  <p class="is-size-6 has-text-weight-bold">You alone</p>
                </li>
              </ul>
              <ul>
                <li>
                  <p class="is-size-6 has-text-weight-bold">Clear and bright</p>
                </li>
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import capture from '@/assets/img/camera.png';
import goodpic from '@/assets/img/goodpic.png';
import { mapGetters } from 'vuex';

export default {
  name: 'PhotoProfile',
  data() {
    return {
      capture,
      goodpic,
      init_img:null,
      upload_start:false,
      successful: false
    };
  },
  created(){

  },
  computed:{
    ...mapGetters(['user']),
  },
  methods:{
   upload(element) {
      this.processingImage = true;
      const photofile = element[0];
      this.showPreview(photofile);
    },
  showPreview(file) {
      // let loader = this.$loading.show();
      this.upload_start = true
      try {
        const reader = new FileReader();
        reader.onload = e => {
          this.init_img = e.target.result;
        };
        reader.readAsDataURL(file);
      } catch (e) {
        console.log('Error sending face to kairos', e);
        this.skipFaceUpload = true;
        loader.hide();
      }
    },
    saveImage(){
    this.$axios.post('http://localhost:5000/api/user/upload', { img:this.init_img }).then(resp => {
        const image = resp.data.data;
        this.$store.commit('set_image', image);
        this.successful = this.user.image ? true : false;
        this.$toasted.success('Image Upload Successful').goAway(3000);
    })
    .catch(err => {
      this.$toasted.error('Image upload failed').goAway(3000);
    })
  }
  },
  
};
</script>
<style scoped>
.box.main {
  margin: 20px 0;
}

ul > li {
  padding: 5px;
}

.column.is-two-thirds {
  margin: 25px 0;
}
</style>
