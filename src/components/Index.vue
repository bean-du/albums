<template>
    <div id="index" class="row">
        <nav class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">{{title}}</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="#">退出</a></li>
                    </ul>
                    <form class="navbar-form navbar-right">
                        <input type="text" class="form-control" placeholder="Search...">
                    </form>
                </div>
            </div>
        </nav>
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-3 col-md-2 sidebar">
                    <ul class="nav nav-sidebar">
                        <li class="active"><a href="#"><i class="fa fa-folder" aria-hidden="true"></i> 相册列表  <span class="sr-only">(current)</span></a></li>
                        <li>
                            <a href="#" v-for="list in albumsName" @click="listImages(list)"><i class="fa fa-picture-o" aria-hidden="true"></i> {{list}} <span class="btn btn-default btn-sm"><i class="fa fa-trash-o" aria-hidden="true"></i> 删除</span></a>
                        </li>
                    </ul>
                </div>
                <div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
                    <create-album :show.sync="Create"></create-album>
                    <el-button class="my-create"  type="success" @click="showCreate">创建相册</el-button>

                    
                    <upload-image :show.sync="show"></upload-image>
                    <el-button class="my-upload" type="button" @click="uploadImage">上传照片到此相册</el-button>
                    <h1 class="page-header"></h1>

                    <div class="row placeholders">
                        <div class="col-xs-6 col-sm-3 placeholder" v-for="image in images">
                            <img :src="image.url" width="200" height="200" class="img-responsive" alt="Generic placeholder thumbnail">
                            <h4>{{image.album}} </h4>
                            <span class="text-muted">{{image.filename}}</span>
                            <a  :href="image.url">下载</a>
                            <el-button size="small" type="danger" @click="deleteImage(image.url,image.album)">删除</el-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>
<script>
import axios from 'axios';
import qs from 'qs';
import UploadImage from './UploadImage.vue';
import CreateAlbum from './CreateAlbum.vue';
export default {
    name : 'index',
    data () {
        return {
            Create : false,
            show : false,
            title : this.$store.state.title
        }
    },
    components :{UploadImage,CreateAlbum},
    computed : {
        // 获取相册列表
        albumsName (){
            return this.$store.getters.getAlbumsName;
        },
        // 获取相册内的图片列表
        images (){
            return this.$store.getters.getImagesList;
        }
    },
    mounted (){
        axios.post('/auth/managealbum/get', JSON.stringify({username : localStorage.userName})).then(res => {
                if (res.data.status == 0){
                    this.$store.commit('setAlbums',res.data.data)
                }else {
                    this.$store.commit('setAlbums','您没有相册')
                }
            }).catch(err => {

            })
    },
    methods : {
        // 打开上传弹窗
        uploadImage (){
            this.show = true;
        },
        showCreate(){
          this.Create = true;
        },
        // 获取选中的相册的图片列表
        listImages (name){
            this.$store.commit('setCurrentAlbum',name);
            axios.post('/auth/download?page=1&size=10',qs.stringify({username :localStorage.userName,album:name})).then(res => {
                if (res.data.status == 0){
                    if (res.data.data == null){
                        this.$notify({
                            title : '提示信息',
                            message : ' 相册是空的哦，上传一些照片吧',
                            type : 'error'
                        })
                    }else {
                        this.$store.commit('putImages',res.data.data);
                    }
                }else {
                    this.$msgbox({
                        title : '提示信息',
                        message : '没有此相册',
                    })
                }
            }).catch(err => {

            })
        },
        // 删除图片
        deleteImage (image,album){
            console.log(image);
            axios.post('/auth/delete',qs.stringify({username : localStorage.userName,album : album,md5:image.split('/')[4]})).then(res => {
                if (res.data.status == 0){
                    this.$notify({
                        title : '提示信息',
                        message : '删除成功',
                        type : 'success'
                    });
                    this.listImages(album);
                }else {
                    this.$notify({
                        title : '提示信息',
                        message : '删除失败',
                        type : 'error'
                    })
                }
            }).catch(err => {

            })
        }
    }
}
</script>
<style>
    /* Move down content because we have a fixed navbar that is 50px tall */
    body {
        padding-top: 50px;
    }
    /*
     * Global add-ons
     */

    .sub-header {
        padding-bottom: 10px;
        border-bottom: 1px solid #eee;
    }
    /*
     * Top navigation
     * Hide default border to remove 1px line.
     */
    .navbar-fixed-top {
        border: 0;
    }
    /*
     * Sidebar
     */

    /* Hide for mobile, show later */
    .sidebar {
        text-align: left;
        display: none;
    }
    @media (min-width: 768px) {
        .sidebar {
            position: fixed;
            top: 51px;
            bottom: 0;
            left: 0;
            z-index: 1000;
            display: block;
            padding: 20px;
            overflow-x: hidden;
            overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
            background-color: #f5f5f5;
            border-right: 1px solid #eee;
        }
    }
    .my-create {
        float: left;
    }
    /* Sidebar navigation */
    .nav-sidebar {
        margin-right: -21px; /* 20px padding + 1px border */
        margin-bottom: 20px;
        margin-left: -20px;
    }
    .nav-sidebar > li > a {
        padding-right: 20px;
        padding-left: 20px;
    }
    .nav-sidebar > .active > a,
    .nav-sidebar > .active > a:hover,
    .nav-sidebar > .active > a:focus {
        color: #fff;
        background-color: #428bca;
    }
    /*
     * Main content
     */
    .main {
        padding: 20px;
        margin-top: -65px;
    }
    .main > span {
    }
    @media (min-width: 768px) {
        .main {
            padding-right: 40px;
            padding-left: 40px;
        }
    }
    .main .page-header {
        margin-top: 0;
    }
    /*
     * Placeholder dashboard ideas
     */
    .placeholders {
        margin-bottom: 30px;
        text-align: center;
    }
    .placeholders h4 {
        margin-bottom: 0;
    }
    .placeholder {
        margin-bottom: 20px;
    }
    .placeholder img {
        display: inline-block;
        border-radius: 10%;
    }
</style>