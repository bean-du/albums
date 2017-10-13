<template>
    <div class="dialog-container">
        <el-dialog
            title="上传照片"
            :visible.sync="visible"
            @close="$emit('update:show', false)"
            :show="show">
            <el-upload
                    class="ensure ensureButt"
                    action="http://59.110.160.110:9990/auth/upload"
                    :on-preview="handlePreview"
                    name="images"
                    ref="upload"
                    data: postData
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :onError="uploadError"
                    :onSuccess="uploadSuccess"
                    :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取图片</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过4M</div>
            </el-upload>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                fileList : [],
                visible: this.show
            };
        },
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        watch: {
            show () {
                this.visible = this.show;
            }
        },
        computed : {
            postData (){
                return {
                    username : localStorage.userName,
                    album : this.$store.getters.getCurrentAlbum
                }
            }
        },
        methods : {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file,fileList) {
                console.log(file,fileList);
            },
            submitUpload() {
                this.$refs.upload.submit();
            },
            uploadError (){
                this.$notify({
                    title : '提示信息',
                    message : '上传失败',
                    type : 'error'
                })
            },
            uploadSuccess (){
                this.$notify({
                    title : '提示信息',
                    message : '上传成功',
                    type : 'success'
                })
            }
        }
    };
</script>
<style>
    input[type=file]{
        display: none;
    }
</style>