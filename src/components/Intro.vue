<!-- 平台介绍 -->
<template>
    <div>
        <div class="main">
            <div class="banners">
                <!-- <el-carousel height="456px"> -->
                    <!-- <el-carousel-item v-for="item in banner_data" :key="item.id"> -->
                        <a class="item-inner"  v-for="item in banner_data" :key="item.id" :href="item.advertise_link" target="_blank">
                            <img style="width:1200px;height:456px"  :src="item.advertise_piture" alt="" >
                        </a>
                    <!-- </el-carousel-item> -->
                <!-- </el-carousel> -->
            </div>
            <div class="infos" v-html="page_data">
                
            </div>
        </div>
    </div>
</template>

<script>
import { request } from "../api/api";
export default {
  name: "Intro",
  data(){
      return{
          banner_data:[],
          page_data:"",
      }
  },
  mounted(){
      this.init_data();
  },
  methods:{
      init_data(){
          var _this = this;
          var param = {};
              param.advertise_type = 2;
              param.type = 1;
          request("com.iiding.web.index.select_other",param,res => {
              if(res.code == "success"){
                  _this.banner_data = res.banner_data;
                //   console.log(_this.banner_data);
                  _this.page_data = res.page_data[0].content;
                //   console.log( _this.page_data);

              }
          })
      },
  }
};
</script>

<style lang="scss" scoped>
.main {
  width: 1200px;
  margin: 0 auto;
  min-height: 500px;
  .banners{
      height:456px;
      margin-bottom:30px;
  }
}
</style>

