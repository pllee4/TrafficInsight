<template>
  <div>
    <!-- <div class="heading">
      <h1 class="title">Comments</h1>
    </div> -->
    <p>Not yet!</p>
    <div>
      <img src="http://10.208.98.181:8080/video">
    </div>
    <!-- <div>
      <my-video :sources="video.sources" :options="video.options"></my-video>
    </div> -->
  </div>
</template>

<script>
// import myVideo from 'vue-video'
export default {
  name: 'comments',
  data () {
      return {
          video: {
              sources: [{
                // src: 'C:/Users/pinlo/Desktop/FYP/Development/TrafficInsight/main/src/views/videos/Operation Video.mp4',
                src: 'http://10.208.98.181:8080/video',
                  // src: 'http://covteam.u.qiniudn.com/oceans.mp4',
                type: 'video/mp4'
              }],
              options: {
                  autoplay: true,
                  volume: 0.6,
                  // poster: 'http://covteam.u.qiniudn.com/poster.png'
              }
          }
      }
  },
  components: {
      myVideo
  }
}
</script>

<style scoped>
.video{
  height: 300px;
}
</style>
