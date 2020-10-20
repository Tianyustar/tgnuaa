<template>
  <div class="search-page">
    <el-main class="search-head">
      <!-- 聊天界面 -->
      <el-card class="chat-layout">
        <div slot="header" class="clearfix">
          <span><i class="el-icon-chat-line-square"></i></span>
        </div>
        <div>
          <div class="message-box" ref="messageContent">
            <div id="chat-content" class="lite-chatbox">
              <div
                v-for="(item, index) in chatMessage"
                :key="'message' + index"
              >
                <div v-if="item.time" class="tips">
                  <span>{{ item.time }}</span>
                </div>
                <div v-if="item.id === 0" class="cleft cmsg">
                  <img
                    class="headIcon radius"
                    ondragstart="return false;"
                    oncontextmenu="return false;"
                    src="@/assets/img/robot.png"
                  />

                  <span class="content">{{ item.message }}</span>
                </div>
                <div v-if="item.id === 1" class="cright cmsg">
                  <img
                    class="headIcon radius"
                    ondragstart="return false;"
                    oncontextmenu="return false;"
                    src="@/assets/img/rocket.png"
                  />

                  <span class="content">{{ item.message }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="send-box">
          <textarea
            rows="4"
            class="message-input-area"
            maxlength="200"
            v-model="message"
          ></textarea>
          <el-row class="send-button">
            <el-button type="primary" size="small" @click="sendMessage(message)"
              >发送</el-button
            >
          </el-row>
        </div>
      </el-card>
    </el-main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils/index";
import { searchKeyWords, searchCase } from "@/api/analysis";
const toUser = "customer_service"
export default {
  name: "advisory",
  computed: {
    ...mapGetters(["name", "userRole"])
  },
  mounted() {
    this.initWebSocket()
    this.receiveMessage("您好")
  },
  watch: {
    userRole: function(val) {}
  },
  data() {
    return {
      chatMessage: [
      ],
      lastMessageTime: "2020",
      message: "",
      websock:''
    };
  },
  methods: {
    sendMessage(message) {
      // 发送信息
      if (message === "" || message === undefined) {
        return;
      }
      this.chatMessage.push(this.getChatMessage(message, 1, new Date()));
      this.message = ''
      this.$nextTick(() => {
        this.scrollToBottom("messageContent");
      });
      this.websocketsend({
        sendUser:this.name,
        toUser,
        message
      })
    },
    getChatMessage(message, id, date) {
      let time = parseTime(date, "{yyyy}-{mm}-{dd} {hh}:{ii}");
      if (time != this.lastMessageTime) {
        this.lastMessageTime = time;
      } else {
        time = undefined;
      }
      return {
        id,
        message,
        time
      };
    },
    receiveMessage(message) {
      this.chatMessage.push(this.getChatMessage(message, 0, new Date()));
      this.$nextTick(() => {
        this.scrollToBottom("messageContent");
      });
    },
    scrollToBottom(refId) {
      this.$refs[refId].scrollTop = this.$refs[refId].scrollHeight;
    },
    initWebSocket() {
      //初始化weosocket
      const wsuri = "ws://127.0.0.1:8080/tgnuaa/chat/"+ this.name;
     // const wsuri = "ws://121.40.165.18:8800"
      this.websock = new WebSocket(wsuri);
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onclose = this.websocketclose;
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      // let actions = "test";
      // this.websocketsend(actions);
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket();
    },
    websocketonmessage(e) {
      //数据接收
    //  const redata = JSON.parse(e.data);
      
      this.receiveMessage(e.data)
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(JSON.stringify(Data));
    },
    websocketclose(e) {
      //关闭
      console.log("断开连接", e);
    }
  }
};
</script>

<style lang="scss" scoped>
@import url("./litewebchat.css");
.search-head {
  height: calc(100vh - 64px);
  background-color: rgb(85, 104, 182);
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-icon-upload2 {
  font-size: 67px;
  color: #c0c4cc;
  margin: 40px 0 16px;
  line-height: 50px;
}
.chat-layout {
  // height: 680px;
  background: white;
  width: 800px;
  border-radius: 5px;

  .el-icon-chat-line-square {
    font-size: 60px;
  }
  .message-box {
    height: 400px;
    overflow-y: scroll;
  }
  .message-input-area {
    width: 100%;
    resize: none;
    border: none;
    &:focus {
      outline: none;
    }
  }
  .send-box {
  }

  .send-button {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
