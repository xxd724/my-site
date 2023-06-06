<template>
  <div class="contact-container">
    <ul>
        <li>
            <a target="_blank" :href="data.github">
                <div class="icon">
                    <Icon type="github"/>
                </div>
                <span>{{data.githubName}}</span>
            </a>
        </li>
        <li>
            <a :href="`mailto:${data.mail}`">
                <div class="icon">
                    <Icon type="mail"/>
                </div>
                <span>{{ data.mail }}</span>
            </a>
        </li>
        <li>
            <a :href="
          `tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`
        "
      >
                <div class="icon">
                    <Icon type="qq"/>
                </div>
                <span>{{data.qq}}</span>
            </a>
            <div class="pop">
                <img :src="data.qqQrCode" alt="">
            </div>
        </li>
        <li>
            <a>
                <div class="icon">
                    <Icon type="weixin" class="weixin"/>
                </div>
                <span>{{data.weixin}}</span>
            </a>
            <div class="pop">
                <img :src="data.weixinQrCode" alt="">
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
import Icon from '@/components/IconView'
import { mapState } from 'vuex';
export default {
    components:{
        Icon
    },
    computed:{
        ...mapState('setting',['data'])
    }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variable.scss';
.contact-container{
    width: 100%;
    height: 100%;
    color: $gray;
    padding: 30px 0;
    ul{
        list-style: none;
        padding: 0 20px;
        li{
            cursor: pointer;
            position: relative;
            a{
                display: flex;
                align-items: center;
                height: 35px;
                line-height: 35px;
                font-size: 14px;
                .icon{
                    width: 30px;
                    font-size: 20px;
                    .weixin{
                        text-indent: -2px;
                        font-size: 25px;
                    }
                }
            }
            &:hover{
                .pop{
                    transform: scale(1);
                }
            }
            .pop{
                width: 120px;
                height: 120px;
                background: #fff;
                border-radius: 5px;
                padding: 0 5px;
                position: absolute;
                left: 0;
                bottom: 35px;
                transform: scale(0);
                transform-origin: center bottom;
                transition: .3s;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                &::after{
                    content: '';
                    width: 10px;
                    height: 10px;
                    background-color: #fff;
                    position: absolute;
                    left: 50%;
                    bottom: -5px;
                    transform: translateX(-50%) rotate(45deg);
                }
            }
        }
    }
}
</style>