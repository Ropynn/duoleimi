<template>
  <div class="videos" @touchmove.prevent>
    <div class="test" @click="close"></div>
    <!-- <video controls autoplay>
            <source src="../../static/introduce.mp4" type="video/mp4">
          </video> -->
    <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" :options="playerOptions" @play="onPlayerPlay($event)"
      @pause="onPlayerPause($event)">
    </video-player>
  </div>

</template>


<script>
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
export default {
  data() {
    return {
      playerOptions: {
        //        playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: "../../static/introduce.mp4" //你的m3u8地址（必填）
          }
        ],
        // poster: "poster.jpg", //你的封面地址
        width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试" //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        //        controlBar: {
        //          timeDivider: true,
        //          durationDisplay: true,
        //          remainingTimeDisplay: false,
        //          fullscreenToggle: true  //全屏按钮
        //        }
      }
    };
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    }
  },
  methods: {
    onPlayerPlay(player) {
      // console.log("play");
    },
    onPlayerPause(player) {
      // console.log("pause");
    },
    close(){
    //  this.$router.go(-1);
    }
  }
};
</script>

<style lang="stylus" scoped>
  @import '../common/stylus/mixins.styl';
@import "../common/stylus/button.css";

.videos {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    z-index: 30;
    .test {
      position absolute;
      top 0;
      left 0;
      width 100%;
      height 100%
    }
    .video-player {
      position absolute;
      width 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>
