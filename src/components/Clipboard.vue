<template>

  <el-row>
    <el-col :span="1"></el-col>
    <el-col :span="22">
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span style="color: mediumpurple">共享剪切板</span>
            <div>
              <el-button type="success" @click="copy" round>复制</el-button>
              <el-button type="danger" @click="reset" round>清空</el-button>
            </div>
          </div>
        </template>
        <el-input
            v-model="content"
            :autosize="{ minRows: 15, maxRows: 50 }"
            type="textarea"
            placeholder="Please input"
        />
      </el-card>
    </el-col>
    <el-col :span="1"></el-col>
  </el-row>
  <el-row>
    <el-col :span="2">
      <br>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="2"></el-col>
    <el-col :span="20">
      <div class="demo-image">
        <el-image @click="showLogs" :src="logoPng"/>
      </div>
      <p style="color: coral">每3秒获取一次最新数据</p>
      <p style="color: coral">内容改变后,3秒内同步到服务器</p>
    </el-col>
    <el-col :span="2"></el-col>
  </el-row>
  <el-dialog v-model="showLog" title="历史记录" width="70%">
    <el-table :data="logData" style="width: 100%">
      <el-table-column prop="date" label="日期"/>
      <el-table-column prop="msg" label="内容"/>
      <el-table-column fixed="right" label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click.prevent="handleCopy(scope.row)">
            复制
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </el-dialog>

</template>

<script>
import api from "../api";
import {ElMessage} from 'element-plus';
import useClipboard from 'vue-clipboard3';
import logoPng from '@/assets/logo.png'

const {toClipboard} = useClipboard();
export default {
  name: 'Clipboard',
  computed: {},
  data() {
    return {
      logoPng: logoPng,
      content: '',
      lastContent: '',
      showLog: false,
      logData: [],
      timer: null
    };
  },
  mounted: function () {
    api.getClipboard().then(res => {
      if (res.data.success) {
        this.content = res.data.clipboard.content;
        this.lastContent = this.content;
      } else {
        ElMessage.error(res.data.message);
      }
    });
    this.timer = setInterval(this.flashData, 3000);
  },

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer); // 在Vue实例销毁前，清除时间定时器
    }
  },

  methods: {
    get() {
      api.getClipboard().then(res => {
        if (res.data.success) {
          this.content = res.data.clipboard.content;

          if (this.lastContent !== this.content) {
            ElMessage.success(res.data.message);
          }

          this.lastContent = this.content;
        } else {
          ElMessage.error(res.data.message);
        }
      });
    },

    upd() {
      api.updClipboard({
        content: this.content
      }).then(res => {
        if (res.data.success) {
          this.lastContent = this.content;
          ElMessage.success(res.data.message);
        } else {
          ElMessage.error(res.data.message);
        }
      });
    },
    reset() {
      this.content = '';
    },
    showLogs() {
      this.showLog = true
      api.getLogs().then(res => {
        this.logData = res.data;
        console.log(this.logData)
      });
    },
    handleCopy(record) {
      console.log(record.msg);
      try {
        toClipboard(record.msg);
        ElMessage.success('复制成功！');
      } catch (e) {
        ElMessage.error('复制失败！');
      }
    },
    copy() {
      try {
        toClipboard(this.content);
        ElMessage.success('复制成功！');
      } catch (e) {
        ElMessage.error('复制失败！');
      }
    },
    flashData() {
      if (this.lastContent === this.content) {
        this.get();
      } else if (this.content !== "") {
        this.upd();
      }
    }
  }
};
</script>
<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>