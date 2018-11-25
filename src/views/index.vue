<template>
    <div class="view">
        这是{{page}}页面
    </div>
</template>
<script>
export default {
    data: function () {
        return {
            page: 'index'
        }
    }
}
</script>
<style lang="less">
.view{
    color:red;
}
</style>