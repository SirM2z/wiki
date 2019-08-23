<template>
  <div class="CSSAllWidth">
    <div ref="allWidthBox" class="all-width-style">content</div>
    <table>
      <thead>
        <tr>
          <th>.box 属性</th>
          <th>值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>offsetParent</td>
          <td>body</td>
        </tr>
        <tr>
          <td>offsetWidth</td>
          <td>{{offsetWidth}} = <strong>width + padding + border</strong></td>
        </tr>
        <tr>
          <td>offsetLeft</td>
          <td>{{offsetLeft}} = <strong>盒子模型 border-left 边缘距 offsetParent 左侧长度</strong></td>
        </tr>
        <tr>
          <td>clientWidth</td>
          <td>{{clientWidth}} = <strong>width + padding</strong></td>
        </tr>
        <tr>
          <td>clientLeft</td>
          <td>{{clientLeft}} = <strong>border-left</strong></td>
        </tr>
        <tr>
          <td>getBoundingClientRect().left</td>
          <td>{{boundingClientRect.left}} 约= <strong>offsetLeft</strong></td>
        </tr>
        <tr>
          <td>getBoundingClientRect().width</td>
          <td>{{boundingClientRect.width}} = <strong>offsetWidth</strong></td>
        </tr>
        <tr>
          <td>getBoundingClientRect().top</td>
          <td>{{boundingClientRect.top}} <button @click="refresh">刷新</button>元素顶部距可视区域顶部长度</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "CSSAllWidth",
  data() {
    return {
      offsetWidth: 0,
      offsetLeft: 0,
      clientWidth: 0,
      clientLeft: 0,
      boundingClientRect: {},
    };
  },
  mounted() {
    this.offsetWidth = this.$refs.allWidthBox.offsetWidth;
    this.offsetLeft = this.$refs.allWidthBox.offsetLeft;
    this.clientWidth = this.$refs.allWidthBox.clientWidth;
    this.clientLeft = this.$refs.allWidthBox.clientLeft;
    this.boundingClientRect = this.$refs.allWidthBox.getBoundingClientRect();
  },
  methods: {
    refresh() {
      this.boundingClientRect = this.$refs.allWidthBox.getBoundingClientRect();
    }
  }
};
</script>

<style scoped>
.all-width-style {
  padding: 20px;
  margin: 10px;
  width: 100px;
  height: 100px;
  background-color: #FFB5BF;
  border: 6px solid #94E8FF;
}
</style>
