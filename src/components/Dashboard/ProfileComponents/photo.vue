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
              <br>
              <label class="button is-myblue" style="padding:20px;">
                <input type="file" accept="image/*" capture="camera" hidden @change=""> Choose a file
              </label>
              <br>
              <br>
              <p class="is-size-6 ">PNG, JPG or GIF, max. 3MB</p>
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

export default {
  name: 'PhotoProfile',
  data() {
    return {
      capture,
      goodpic
    };
  }
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
