<template>
  <div class="search-page">
    <header class="search-head">
      <el-row>
        <!-- <div class="title">分 析 预 测</div> -->
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          accept=".doc,.docx"
        >
          <i class="el-icon-upload2"></i>
          <div class="el-upload__text">将案例文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">
            <span style="color:white">上传案例文件,只能上传word文件。</span>
          </div>
        </el-upload>
      </el-row>
    </header>
    <el-main>
    
    </el-main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { searchKeyWords, searchCase } from "@/api/analysis";

export default {
  name: "analysis",
  computed: {
    ...mapGetters(["name", "userRole"])
  },
  mounted() {
  
  },
  watch: {
    userRole: function(val) {
     
    }
  },
  data() {
    return {

    };
  },
  methods: {
  
  }
};
</script>

<style lang="scss" scoped>
.search-head {
  height: 300px;
  background-color: rgb(85, 104, 182);
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-icon-upload2 {
    font-size: 67px;
    color: #C0C4CC;
    margin: 40px 0 16px;
    line-height: 50px;
}
</style>
