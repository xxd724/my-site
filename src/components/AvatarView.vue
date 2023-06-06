<template>
  <div >
    <img class="avatar-container" :src="url" alt="" :style="{width:size + 'px',height:size + 'px'}">
  </div>
</template>

<script>
export default{
  props:{
    url:{
      type:String,
      require:true
    },
    size:{
      type:Number,
      default:150
    }
  }
}
</script>
<style scoped lang="scss">
  .avatar-container{
    border-radius:50%;
    object-fit:cover;
    display:block;
  }
</style>
