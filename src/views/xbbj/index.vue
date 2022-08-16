<template>
  <div class="inner">
    <div class="inner-top">
      <div style="display: flex; align-items: center; justify-content: right; padding-bottom: 10px">
        <el-upload
          class="upload-demo"
          action="http://47.106.208.86:8090/style/xb_import"
          :on-change="handleChange">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-button style="margin-left: 10px" type="primary" size="small" @click="doExport">全部导出</el-button>
      </div>
    </div>

    <div class="inner-body">
      <el-table
        :data="tableData"
        @row-dblclick="dbSelected"
        border
        style="width: 100%;" height="75vh">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="no" label="报价单号" width="80"></el-table-column>
        <el-table-column prop="createTime" label="报价日期" width="80"></el-table-column>
        <el-table-column prop="branchname" label="报价部门" width="80"></el-table-column>
        <el-table-column prop="createUser" label="报价人" width="80"></el-table-column>
        <el-table-column prop="clientName" label="客户名称" width="80"></el-table-column>
        <el-table-column prop="makeType" label="来源单版本号" width="80"></el-table-column>
        <el-table-column prop="bjType" label="报价版本号" width="80"></el-table-column>
        <el-table-column prop="banNo" label="款号" width="80"></el-table-column>
        <el-table-column prop="name" label="款名" width="80"></el-table-column>
        <el-table-columnpmn prop="colors" label="报价颜色" width="80"></el-table-columnpmn>
        <el-table-column prop="sizes" label="报价尺码" width="80"></el-table-column>
        <el-table-column prop="pieceSum" label="预估订单数量" width="80"></el-table-column>
<!--        <el-table-column prop="styleImg" label="款式图" width="380"></el-table-column>-->
        <el-table-column prop="year" label="年份" width="80"></el-table-column>
        <el-table-column prop="season" label="季节" width="80"></el-table-column>
        <el-table-column prop="mingxi" label="单据状态" width="80"></el-table-column>
        <el-table-column prop="mlCost" label="面料小计" width="80"></el-table-column>
        <el-table-column prop="flCost" label="辅料小计" width="80"></el-table-column>
        <el-table-column prop="qtclCost" label="其它料小计" width="80"></el-table-column>
        <el-table-column prop="clCost" label="物料合计" width="80"></el-table-column>
        <el-table-column prop="rgCost" label="人工总费用" width="80"></el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData)"

              type="text"
              size="small">
              移除
            </el-button>
          </template>
        </el-table-column>
        <!--      <el-table-column prop="date" label="其它总费用" width="80"></el-table-column>-->
        <!--      <el-table-column prop="date" label="单件成本" width="80"></el-table-column>-->
        <!--      <el-table-column prop="date" label="审核确认金额" width="80"></el-table-column>-->
        <!--      <el-table-column prop="date" label="资金占用比率" width="80"></el-table-column>-->
        <!--      <el-table-column prop="date" label="资金占用金额" width="80"></el-table-column>-->
        <!--      <el-table-column prop="date" label="运营成本比率" width="80"></el-table-column>-->
        <!--      <el-table-column prop="date" label="运营成本金额" width="80"></el-table-column>-->
        <!--      <el-table-column prop="date" label="利润率" width="80"></el-table-column>-->
        <!--      <el-table-column prop="date" label="利润额" width="80"></el-table-column>-->
        <!--      <el-table-column prop="date" label="税率" width="80"></el-table-column>-->
        <!--      <el-table-column prop="date" label="所得税" width="80"></el-table-column>-->
        <!--      <el-table-column prop="date" label="最终成本单价" width="80"></el-table-column>-->
        <!--      <el-table-column prop="date" label="最终报价金额" width="80"></el-table-column>-->
        <!--      <el-table-column prop="date" label="汇率" width="80"></el-table-column>-->
        <!--      <el-table-column prop="date" label="报价(外币)" width="80"></el-table-column>-->
      </el-table>
    </div>

    <div class="inner-foot">
      <el-pagination
        background
        @current-change="doPageChange"
        layout="prev, pager, next"
        :total="total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      pn: 1,
      ps: 10,
      total:0,
      tableData: [],
      fileList: [{
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }, {
        name: 'food2.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
      }]
    }
  },

  mounted() {
    this.getStyleList()
  },

  methods: {
    getStyleList() {
      const pn = this.pn;
      const ps = this.ps;
      this.$API.style.list({pn, ps}).then(resp => {
        this.tableData = resp.data.list
        this.total = resp.data.total
        console.log("this.total ===> ", this.total)
      })
    },

    // 列表双击
    dbSelected(row) {
      this.$router.push({path:`/xbbjDetail/${row.no}`, replace:true})
       //this.goStyle('edit' , row.style, row.style.status == 1? null: 'detail');
    },

    doExport() {
      const baseUrl = process.env.VUE_APP_BASE_API
      window.location.href = baseUrl + "/style/xb_export"
    },

    doPageChange(pn) {
      this.pn = pn
      this.getStyleList()
    },

    handleChange(file, fileList) {
      this.getStyleList()
    }
  }
}
</script>
<style>

.inner {
}

.inner-top {
  text-align: right;
}

.inner-body {
}

.inner-foot {
  text-align: center;
}
</style>
