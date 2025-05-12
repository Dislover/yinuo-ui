<template>
  <div class="demo-section">
    <h2>Watermark Component</h2>
    <h3>Basic Watermark</h3>
    <div
      class="demo-block"
      style="width: 400px; height: 200px; border: 1px solid #eee"
    >
      <my-watermark text="My UI Watermark">
        <div style="padding: 40px">这里是内容区域</div>
      </my-watermark>
    </div>
    <h3>Custom Watermark</h3>
    <div
      class="demo-block"
      style="width: 400px; height: 200px; border: 1px solid #eee"
    >
      <my-watermark
        text="Confidential"
        color="rgba(255,0,0,0.15)"
        :rotate="-30"
        font="bold 20px Arial"
        :gap="60"
        :opacity="0.4"
        :width="180"
        :height="80"
      >
        <div style="padding: 40px">自定义水印样式</div>
      </my-watermark>
    </div>
    <div style="margin-top: 24px">
      <h3>Props</h3>
      <table
        border="1"
        cellpadding="4"
        style="border-collapse: collapse; font-size: 13px"
      >
        <tbody>
          <tr>
            <th>属性</th>
            <th>说明</th>
            <th>类型</th>
            <th>默认值</th>
          </tr>
          <tr>
            <td>text</td>
            <td>水印文字</td>
            <td>string</td>
            <td>Watermark</td>
          </tr>
          <tr>
            <td>font</td>
            <td>字体样式</td>
            <td>string</td>
            <td>16px Arial</td>
          </tr>
          <tr>
            <td>color</td>
            <td>颜色</td>
            <td>string</td>
            <td>rgba(0,0,0,0.15)</td>
          </tr>
          <tr>
            <td>rotate</td>
            <td>旋转角度</td>
            <td>number</td>
            <td>-20</td>
          </tr>
          <tr>
            <td>gap</td>
            <td>水平/垂直间距</td>
            <td>number</td>
            <td>120</td>
          </tr>
          <tr>
            <td>opacity</td>
            <td>透明度</td>
            <td>number</td>
            <td>0.15</td>
          </tr>
          <tr>
            <td>width</td>
            <td>单个水印宽度</td>
            <td>number</td>
            <td>240</td>
          </tr>
          <tr>
            <td>height</td>
            <td>单个水印高度</td>
            <td>number</td>
            <td>120</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import MyWatermark from "../../src/components/Watermark.vue";
</script>

<style scoped>
.demo-section {
  margin: 20px 0;
}
.demo-block {
  margin: 16px 0;
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
