export default function (refValue) {
    return {
        mounted() {
            this.$bus.$on("setMainScroll", this.setMainScroll);
            this.$refs[refValue].addEventListener("scroll", this.handlemainScroll)
        },
        beforeDestroy() {
            this.$bus.$off("setMainScroll", this.setMainScroll);
            this.$refs[refValue].removeEventListener("scroll", this.handlemainScroll);
            this.$bus.$emit("mainScroll");
        },
        methods:{
            handlemainScroll(){
                this.$bus.$emit("mainScroll",this.$refs[refValue]);
            },
            setMainScroll(scrollTop){
                this.$refs[refValue].scrollTop=scrollTop;
            }
        }
    }
}