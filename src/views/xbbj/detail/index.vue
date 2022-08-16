<template>
  <div>
    <div class="dtl-inner-top">
      <h3 style="margin-right: 30px">箱包报价单详情</h3>
      <span>单号：{{styleInfo.no}}</span>
      <span>客款号：{{styleInfo.banNo}}</span>
      <span>报价版本号：{{styleInfo.bjType}}</span>
      <span>系列：{{styleInfo.kindOf}}</span>
    </div>
    <div class="dtl-inner-body">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="基本信息" name="base">
          <vxe-grid class="reverse-table" v-bind="gridOptions1"></vxe-grid>
        </el-tab-pane>

        <el-tab-pane label="成本单详情" name="second">成本单详情</el-tab-pane>
        <el-tab-pane label="款式BOM" name="fourth">款式BOM</el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'base',
      styleInfo: {},
      gridOptions1: {
        border: true,
        showHeader: false,
        columns: [
          { field: 'col1', width: 100 },
          { field: 'col2' },
          { field: 'col3'},
          { field: 'col4' },
          { field: 'col5' },
          { field: 'col6' },
        ],
        data: [

        ]
      }
    };
  },
  mounted() {
    this.getStyleInfo()
  },
  methods: {
    getStyleInfo() {
      const no = this.$route.params.no
      this.$API.style.info(no).then(resp => {
        console.log("resp =>> ", resp)
        this.styleInfo = resp.data
        const info = resp.data

        this.gridOptions1.data = [
          { col1: '款号', col2: info.no, col3: '来源核算单版本号', col4: info.makeType, col5: "品类", col6: info.kindOf },
          { col1: '来源款颜色', col2: info.colors, col3: '来源尺码', col4: info.sizes, col5: "基础尺码", col6: info.sizes },
          { col1: '创建人', col2: info.createUser, col3: '创建日期', col4: info.createTime, col5: "创建部门", col6: info.branchname },
          { col1: '修改人', col2: info.createUser, col3: "修改日期", col4: info.createTime, col5: "修改部门", col6: info.branchname }
        ]
      })
    },

    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style>
.dtl-inner-top {
  display: flex;
  align-items: center;
}
.dtl-inner-top > span {
  margin-left: 20px;
}
.reverse-table .vxe-body--row .vxe-body--column:first-child  {
  background-color: #f8f8f9;
}
</style>
