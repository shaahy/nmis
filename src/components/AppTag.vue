<template>
  <div class="tag">{{ title }}</div>
</template>

<script>
export default {
  name: 'app-tag',
  props:['title'],
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.tag{
  font-size: 18px;
  padding:10px 0 10px 20px;
  color:$main-color;
  background-color: #fff;
  margin-bottom: 24px;
}
</style>