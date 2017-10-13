<template>
    <div class="dialog-container">
        <el-dialog
                title="上传图片"
                :visible.sync="visible"
                @close="$emit('update:show', false)"
                :show="show">
            <el-upload
                    class="upload-demo"
                    action="http://59.110.160.110:9990/auth/upload"
                    ref="upload"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
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
        methods : {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file,fileList) {
                console.log(file,fileList);
            },
            submitUpload (file,fileList){
                console.log(file,fileList)
            }
        }
    };
</script>
<style>
    input[type=file]{
        display: none;
    }
</style>