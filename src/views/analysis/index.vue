<template>
  <div class="search-page">
    <header class="search-head">
      <el-row>
        <!-- <div class="title">分 析 预 测</div> -->
        <el-upload
          class="upload-demo"
          drag
          action="tgnuaa/analysis/upload"
          accept=".doc,.docx"
          name="multipartFile"
          :auto-upload="true"
          :show-file-list="false"
          :on-success="onFileUploadSuccess"
        >
          <i class="el-icon-upload2"></i>
          <div class="el-upload__text">
            将案例文件拖到此处，或<em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">
            <span style="color:white"
              >上传案例文件,只能上传word文件。<el-button
                type="text"
                @click="preViewFile"
                >文件预览</el-button
              ></span
            >
          </div>
        </el-upload>
      </el-row>
    </header>
    <el-main>
      <el-row type="flex" justify="end" class="law-link" v-if="fileName !== ''">
        <el-tag class="filename">{{fileName}}</el-tag>
        <el-button type="primary" plain @click="doAnalaysis(userRole, fileName)">分析预测</el-button> 
      </el-row>
      <el-row type="flex" justify="center" style="width:100%" :gutter="20">
        <!-- <el-col :span="12">
          <el-card>
            <div slot="header" class="clearfix">
              <span>关键词分析</span>
            </div>
            <div style="width:100%; height:400px"></div>
          </el-card>
        </el-col> -->
        <el-col >
          <el-card>
            <div slot="header" class="clearfix">
              <span>结果分析</span>
            </div>
            <div id="results" style="width:100%; height:400px"></div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>

    <el-dialog :title="fileName" :visible.sync="dialogTableVisible">
      <div>文件内容</div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { analysis } from "@/api/analysis";
import echarts from "echarts";
import { userRole } from "@/utils/constant";
export default {
  name: "analysis",
  computed: {
    ...mapGetters(["name", "userRole"])
  },
  mounted() {
    this.echatsInit();
  },
  watch: {
    userRole: function(val) {}
  },
  data() {
    return {
      fileName: "",
      dialogTableVisible: false,
      resData:99
    };
  },
  methods: {
    preViewFile() {
      this.dialogTableVisible = true;
    },
    onFileUploadSuccess(response, file, fileList) {
      // 文件成功上传的钩子
      this.fileName = response && response.msg;
      this.$message.success("文件上传成功，即将进行分析")
      this.doAnalaysis(this.userRole, this.fileName)
    },
    doAnalaysis(identity, filename) {
      const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
      });
      analysis(identity, filename).then(res => {
        if (res && res.data) {
          this.resData = Math.round(parseFloat(res.data) * 100)
          loading.close()
        }
      }).finally(()=>{
        loading.close()
      });
    },
    echatsInit() {
      var myCharts = echarts.init(document.getElementById("results"));
      var option = {
        tooltip: {
          formatter: "{a} <br/>{b} : {c}%"
        },
        toolbox: {
          feature: {
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            name: "业务指标",
            type: "gauge",
            detail: { formatter: "{value}%" },
            data: [{ value: this.resData, name: "获赔率 " }]
          }
        ]
      };
      myCharts.setOption(option);
    }
  }
};
</script>

<style lang="scss" scoped>
.search-head {
  height: 500px;
  background-color: rgb(85, 104, 182);
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../../assets/img/back.jpg");
  background-repeat: no-repeat; //不重复
  background-size: 100% 100%; // 满屏
}

.el-icon-upload2 {
  font-size: 67px;
  color: #c0c4cc;
  margin: 40px 0 16px;
  line-height: 50px;
}

.law-link {
    margin: 20px;
}
.filename {
    line-height: 40px;
    vertical-align: middle;
    display: inline-table;
    margin-right: 10px;
}
</style>
