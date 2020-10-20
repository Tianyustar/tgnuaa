<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>
<style>
/*全局滚动条样式*/
::-webkit-scrollbar {
  width: 5px;
  height: 14px;
}

::-webkit-scrollbar-thumb {
  background-color: #01c8dc;
  border-radius: 3px;
  background-color: #b6b6b6;
}
/*全局滚动条样式结束*/
</style>
