<template>
  <div class="demo-section">
    <h2>Input Component</h2>
    <!-- 基础输入框 -->
    <h3>Basic Input</h3>
    <div class="demo-block">
      <my-input v-model="input1" placeholder="请输入内容"></my-input>
    </div>
    <!-- 密码框 -->
    <h3>Password Input</h3>
    <div class="demo-block">
      <my-input
        v-model="input2"
        type="password"
        placeholder="请输入密码"
      ></my-input>
    </div>
    <!-- 可清除内容 -->
    <h3>Clearable Input</h3>
    <div class="demo-block">
      <my-input v-model="input10" placeholder="可清除" clearable></my-input>
    </div>
    <!-- 禁用状态 -->
    <h3>Disabled Input</h3>
    <div class="demo-block">
      <my-input v-model="input3" placeholder="禁用输入框" disabled></my-input>
    </div>
    <!-- 朴素和圆角 -->
    <h3>Plain & Round Input</h3>
    <div class="demo-block">
      <my-input v-model="input4" placeholder="朴素" plain></my-input>
      <my-input v-model="input5" placeholder="圆角" round></my-input>
      <my-input v-model="input6" placeholder="朴素圆角" plain round></my-input>
    </div>
    <!-- 前后缀图标 -->
    <h3>Prefix & Suffix Icon</h3>
    <div class="demo-block">
      <my-input v-model="input7" placeholder="带前缀">
        <template #prefix>
          <my-icon name="info" style="margin-right: 4px" />
        </template>
      </my-input>
      <my-input v-model="input8" placeholder="带后缀">
        <template #suffix>
          <my-icon name="close" style="margin-left: 4px" />
        </template>
      </my-input>
      <my-input v-model="input9" placeholder="前后缀" round>
        <template #prefix>
          <my-icon name="info" style="margin-right: 4px" />
        </template>
        <template #suffix>
          <my-button
            round
            :icon="'search'"
            style="transform: translateX(8px)"
          ></my-button>
        </template>
      </my-input>
    </div>
    <!-- 文本域 -->
    <h3>TextArea</h3>
    <div class="demo-block">
      <my-input v-model="input7" type="textarea" placeholder="带前缀">
      </my-input>
      <my-input
        v-model="input8"
        type="textarea"
        :maxlength="100"
        placeholder="带后缀"
      >
      </my-input>
      <my-input
        v-model="input9"
        type="textarea"
        placeholder="n多行"
        :rows="5"
        round
      >
      </my-input>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import MyInput from "../../src/components/Input.vue";
import MyIcon from "../../src/components/Icon.vue";
import MyButton from "../../src/components/Button.vue";
const input1 = ref("");
const input2 = ref("");
const input3 = ref("");
const input4 = ref("");
const input5 = ref("");
const input6 = ref("");
const input7 = ref("");
const input8 = ref("");
const input9 = ref("");
const input10 = ref("");
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
