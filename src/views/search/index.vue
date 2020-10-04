<template>
  <div class="search-page">

    <header class="search-head">
           <el-row>
             <div class="title">  航 空 慧 法
      </div>
      
      <el-input
        v-model="searchContent"
        placeholder="输入内容"
        class="search-input"
      ></el-input>
      <el-button type="primary" class="search-button">搜索</el-button>
      <el-button
        type="primary"
        class="search-button"
        @click="screenShow = !screenShow"
        >{{ screenShow ? "收起筛选" : "展开筛选" }}</el-button
      > </el-row>
    </header>
    <el-row>
      <div v-if="screenShow" class="shaixuan">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :show-header="false"
        >
          <el-table-column prop="date" label="item" width="180" align="center">
            <template slot-scope="scope">
              <div class="table-item">{{ scope.row.item }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="content">
            <template slot-scope="scope">
              <span
                v-for="(item, index) in scope.row.content"
                :key="index"
                class="content-item"
                @click="showContentList(item)"
              >
                <span>{{ item.text }}</span>
                <span class="item-num">({{ item.num }})</span>
              </span>
              <!-- <div class="table-item">{{scope.row.content}}</div> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-row>

    <div class="content-list">
      <el-card class="box-card" v-for="(item, index) in itemList" :key="index">
        <div slot="header" class="clearfix">
          <span>{{ item.title }}</span>
        </div>
        <el-row class="list-item">
          <span >基本事实：</span
          ><span
            ><el-tag class="item-tag" v-for="(tr, index) in item.baseTruth" :key="index">{{
              tr
            }}</el-tag></span
          >
        </el-row>
        <el-row class="list-item">
          <span >争议焦点:</span
          ><span
            ><el-tag class="item-tag" v-for="(f, index) in item.focuse" :key="index">{{
              f
            }}</el-tag></span
          >
        </el-row>
        <el-row>{{ item.content }} </el-row>
      </el-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name"])
  },
  data() {
    return {
      searchContent: "",
      screenShow: true,
      tableData: [
        {
          item: "责任主体的特殊性规定",
          content: [
            { text: "非机动车驾驶人责任", num: 3098 },
            { text: "行人责任", num: 63154 },
            { text: "挂靠关系", num: 196328 },
            { text: "挂靠关系", num: 196328 },
            { text: "劳务关系认定", num: 2028 }
          ]
        },
        {
          item: "机动车侵权",
          content: [
            { text: "套牌", num: 3098 },
            { text: "违法通行", num: 17136 },
            { text: "驾驶人故意制造交通事故", num: 1609 },
            { text: "盗抢期间造成交通事故", num: 599 },
            { text: "买卖拼装，报废车辆", num: 775 },
            { text: "违法驾驶", num: 277471 }
          ]
        },
        {
          item: "不承担或减轻责任的情形",
          content: [
            { text: "受害人过错", num: 14377 },
            { text: "受害人自担部分责任", num: 45572 },
            { text: "尽到监护责任", num: 3152 },
            { text: "紧急避险", num: 1728 },
            { text: "正当防卫", num: 30 },
            { text: "因第三人造成的侵权", num: 3903 },
            { text: "受害人自甘冒险", num: 199 }
          ]
        },
        {
          item: "法律责任承担",
          content: [
            { text: "承担连带责任", num: 276033 },
            { text: "交通事故责任认证争议", num: 536262 },
            { text: "共同承担责任", num: 33241 },
            { text: "承担责任主体的认定", num: 186886 },
            { text: "无责任赔偿", num: 68723 },
            { text: "连带责任人之间的追偿", num: 19 }
          ]
        },
        {
          item: "赔偿费用问题",
          content: [
            { text: "交通险的赔偿范围", num: 1528468 },
            { text: "第三者责任商业保险的赔偿范围", num: 634844 },
            { text: "未投保交强险", num: 17223 },
            { text: "赔偿车辆重置费", num: 1621 }
          ]
        },
        {
          item: "程序问题",
          content: [
            { text: "涉外事故", num: 293 },
            { text: "虚假诉讼", num: 248 },
            { text: "诉讼主体资格", num: 54041 }
          ]
        }
      ],
      itemList: [
        {
          title: "李某与苏州某公司社会保险纠纷上诉案",
          baseTruth: ["社会保险", "违反强制性规定"],
          focuse: ["社会保险"],
          content:
            "【基本案情】某公司职工李某向公司提交申请，主要内容为：“公司已依法告知其参加社会保险的事宜，并敦促其提供相关资料，经本人慎重考虑，决定不参加社会保险，因此而产生的责任及后果均由我本人承担。请将公司应承担之社会保险费随工资发放给本人”。为此，该公司未为李某办理企业职工社会保险参保手续。后来，李…"
        }
      ]
    };
  },
  methods: {
    showContentList() {}
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
.search-input {
  width: 400px;
}
.search-button {
  margin-left: 10px;
}
.shaixuan {
  // height: 500px;
  border-radius: 10px;
  border: rgb(85, 104, 182) dashed 1px;
  margin: 10px;
}
.table-item {
  width: 100%;
  color: rgb(85, 104, 182);
  font-weight: 700;
}
.item-num {
  color: orange;
}
.content-item {
  margin-right: 10px;
  cursor: pointer;
}
.content-list {
  padding: 10px;
}
.list-item {
  display: flex;
  justify-content: flex-start;
  vertical-align: middle;
  align-items: center;
  margin-bottom: 10px;
}
.item-tag {
  margin-left: 10px;
}
.title {
  margin-bottom: 40px;
  text-align: center ;
  font-size: 35px;
  color: white;
}
</style>
