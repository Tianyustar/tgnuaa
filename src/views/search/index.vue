<template>
  <div class="search-page">
    <header class="search-head">
      <el-row>
        <div class="title">航 空 慧 法</div>

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
        >
      </el-row>
    </header>
    <el-main>
      <el-row>
        <div v-if="screenShow" class="shaixuan">
          <el-table
            :data="tableData"
            border
             v-loading="table1loading"
            style="width: 100%"
            :show-header="false"
          >
            <el-table-column
              prop="date"
              label="item"
              width="180"
              align="center"
            >
              <template slot-scope="scope">
                <div class="table-item">{{ scope.row.name }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="content">
              <template slot-scope="scope">
                <template v-for="(item, index) in scope.row.children">
                  <span
                    :key="index"
                    class="content-item"
                    @click="showContentList(item)"
                    v-if="scope.row.showMore ? true : index < 8"
                  >
                    <span>{{ item.name }}</span>
                    <span class="item-num">({{ item.id }})</span>
                    <!-- <span>|</span> -->
                  </span>
                </template>
                <el-button 
                  v-if="scope.row.children.length > 8"
                  :type="scope.row.showMore  ? 'warning' : 'primary'"
                  size="small"
                  @click="showMoreKeyWords(scope.$index, scope.row.showMore)"
                  round
                  >{{ scope.row.showMore ? "收起" : "更多" }}</el-button>
                <!-- <div class="table-item">{{scope.row.content}}</div> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
           <div v-if="screenShow && showThree" class="shaixuan">
          <el-table
            :data="threeCatalogue"
            border
            style="width: 100%; margin-top 10px"
            :show-header="false"
          >
            <el-table-column
              prop="date"
              label="item"
              width="180"
              align="center"
            >
              <template slot-scope="scope">
                <div class="table-item">{{ scope.row.name }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="content">
              <template slot-scope="scope">
                <template v-for="(item, index) in scope.row.children">
                  <span
                    :key="index"
                    class="content-item"
                    @click="justShowCase(item)"
                    v-if="scope.row.showMore ? true : index < 8"
                  >
                    <span>{{ item.name }}</span>
                    <span class="item-num">({{ item.id }})</span>
                    <!-- <span>|</span> -->
                  </span>
                </template>
                <el-button 
                  v-if="scope.row.children.length > 8"
                  :type="scope.row.showMore  ? 'warning' : 'primary'"
                  size="small"
                  @click="showMoreKeyWords(scope.$index, scope.row.showMore)"
                  round
                  >{{ scope.row.showMore ? "收起" : "更多" }}</el-button>
                <!-- <div class="table-item">{{scope.row.content}}</div> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-row>

      <div class="content-list">
        <el-card
          class="box-card"
          v-for="(item, index) in itemList"
          :key="index"
        >
          <div slot="header" class="clearfix">
            <span>{{ item.title }}</span>
          </div>
          <el-row class="list-item">
            <span>基本事实：</span
            ><span
              ><el-tag
                class="item-tag"
                v-for="(tr, index) in item.baseTruth"
                :key="index"
                >{{ tr }}</el-tag
              ></span
            >
          </el-row>
          <el-row class="list-item">
            <span>争议焦点:</span
            ><span
              ><el-tag
                class="item-tag"
                v-for="(f, index) in item.focuse"
                :key="index"
                >{{ f }}</el-tag
              ></span
            >
          </el-row>
          <el-row>{{ item.content }} </el-row>
        </el-card>
      </div>
    </el-main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { searchKeyWords, searchCase } from "@/api/search";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "userRole"])
  },
  mounted() {
    this.getKeyWordList();
  },
  watch: {
    userRole: function(val) {
      this.getKeyWordList();
    }
  },
  data() {
    return {
      searchContent: "",
      screenShow: true,
      table1loading:false,
      threeCatalogue: [
        {
          name: "责任主体的特殊性规定",
          children: [
            { name: "非机动车驾驶人责任", num: 3098 },
            { name: "行人责任", num: 63154 },
            { name: "挂靠关系", num: 196328 },
            { name: "挂靠关系", num: 196328 },
            { name: "劳务关系认定", num: 2028 }
          ]
        }
      ],
      showThree:false,
      tableData: [
        {
          name: "责任主体的特殊性规定",
          children: [
            { name: "非机动车驾驶人责任", num: 3098 },
            { name: "行人责任", num: 63154 },
            { name: "挂靠关系", num: 196328 },
            { name: "挂靠关系", num: 196328 },
            { name: "劳务关系认定", num: 2028 }
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
    showContentList(item) {
      if (item.children && item.children.length > 0) {
        // 有三级目录，显示三级目录
        this.showThree = true
      } else {
        this.showThree = false
        // 没有三级目录,请求case数据
        this.justShowCase(item)
      }
    },
    justShowCase(item) {
      let keywords = item.name;
      searchCase(keywords).then(res=>{
        console.log(res)
      })
    },
    getKeyWordList() {
      this.table1loading = true
      searchKeyWords({identity :this.userRole}).then(res => {
        this.table1loading = false
        if (res && res.data && res.data.children) {
          this.tableData = res.data.children;
        }
      }); // 获得关键词列表
    },
    showMoreKeyWords(index, value) {
      let newObj = this.tableData[index];
      newObj.showMore = !value;
      this.$set(this.tableData, index, newObj);
    },

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
  text-align: center;
  font-size: 35px;
  color: white;
}
.show-more-button {
  color: rgb(85, 104, 182);
  cursor: pointer;
}
</style>
