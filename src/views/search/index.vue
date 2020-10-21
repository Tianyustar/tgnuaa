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
                    <span class="item-num">({{ item.count }})</span>
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
                    <span class="item-num">({{ item.count }})</span>
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
          v-for="(item, index) in casesList"
          :key="index"
        >
          <div slot="header" class="clearfix">
            <span>{{ item.title }}</span>
          </div>
          <el-row class="list-item">
            <span>关键词：</span
            ><span
              ><el-tag
                class="item-tag"
                >{{ item.keyword }}</el-tag
              ></span
            >
          </el-row>

          <el-row class="box-content">{{ item.content }} </el-row>
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
      ],
      showThree:false,
      tableData: [
      ],
      casesList: [

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
        if (res && res.data) {
          this.casesList = res.data
        }
        
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
   background-image: url('../../assets/img/back.jpg');
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
.box-card {
  margin: 20px 0;
  .box-content {
  overflow-y: scroll;
  white-space: pre-line;
  height: 300px;
  white-space: pre-wrap;
  }
}
</style>
