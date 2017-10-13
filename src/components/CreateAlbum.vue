<template>
    <div class="dialog-container">
        <el-dialog
                title="创建相册"
                :visible.sync="visible"
                @close="$emit('update:Create', false)"
                :show="Create">
            <el-input type="text" v-model="albumName"></el-input>
            <div>
                <el-button type="success" @click="create">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import qs from 'qs';
    import axios from 'axios';
    export default {
        name: 'create_album',
        data(){
            return {
                albumName : '',
                visible: this.Create
            }
        },
        props: {
            Create: {
                type: Boolean,
                default: false
            }
        },
        watch :{
            show () {
                this.visible = this.Create;
            }
        },
        methods : {
            create(){
                axios.post('auth/managealbum/insert',qs.stringify({username : localStorage.userName,album:this.albumName})).then(res =>{
                    if (res.data.status == 0){
                        this.$notify({
                            title : '提示消息',
                            message : '创建成功',
                            type : 'success'
                        });
                        this.$store.commit('setAlbums',res.data.data);
                    }else {
                        this.$notify({
                            title : '提示消息',
                            message : '创建失败',
                            type : 'error'
                        })
                    }
                })
            }
        }
    }
</script>