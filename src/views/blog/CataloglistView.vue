<template>
  <div class="cataloglist-container">
    <ul class="cataloglist-ul">
        <li v-for="(item,index) in list" :key="index">
            <div @click="handleSelect(item)">
                <span  :class="{active:item.isSelect}">{{ item.name }}</span>
            <span v-if="item.aside" class="aside" :class="{active:item.isSelect}">{{ item.aside }}</span>
            </div>
            <!-- 显示当前组件 -->
            <CataloglistView :list="item.children" @select="handleSelect"/>
        </li>
    </ul>
  </div>
</template>

<script>

export default {
    name:'CataloglistView',
    props:{
        list:{
            type:Array,
            default:()=>[]
        }
    },
    methods:{
        handleSelect(item){
            item.isSelect || this.$emit('select',item);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.cataloglist-container{
    ul{
        padding: 0;
        margin: 0;
        list-style: none;
        .cataloglist-ul{
            margin-left:1em ;
        }
        li{
            min-height: 40px;
            line-height: 40px;
            font-size: 14px;
            cursor: pointer;
            .aside{
                margin-left: 5px;
                font-size: 12px;
                color:$gray;
            }
            .active{
                color:$warn;
                font-weight: bold;
            }
            
        }
    }
}
</style>