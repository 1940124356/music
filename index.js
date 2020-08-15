Vue.component('kb-song-list', {
    props: {
        thesong: { type: Array, require: true },
    }
    ,
    template: `

    <ul class="song_list">
        <li v-for="(item,index) in thesong" :key="item.id" @click="$emit('click',item.id)">{{item.name}}<em :class="{sp:item.mvid!=0}" @click="playvideo(item.mvid)"></em></li>
    </ul>
    `,
    methods: {
        playvideo: function (id) {
            console.log(id)
            fetch('mv/url', { id:id }, res => {
                window.open(res.data.url)
            })
        }
    }
})
Vue.component('kb-song-comment', {
    props: {
        thecomment: { type: Array, require: true }
    },
    template: `
    <ul class="leave">
        <li v-for="(item,index) in thecomment">
            <div class="portrait"><img :src="item.user.avatarUrl" alt=""></div>
            <div class="leave">
                <p>{{ item.user.nickname }}</p>
                <div>{{ item.content }}</div>
            </div>
        </li>
    </ul>
    `
})
let vm = new Vue({
    el: '#app',
    data: {
        task: '',   //搜索框的内容
        TheSongList: [],  //歌曲列表
        TheSongComment: [],// 歌曲评论
        // TheSongMv:[],   //歌曲mv
        songUrl: '',   //歌曲地址
        songImg: '',  //歌曲图片
        isbol:false      //判断歌曲是否在播放
    },
    mounted: function () {
        //初始化音乐盒
        axios.get('https://apimusic.linweiqin.com/search', { params: { keywords: '热门' } })
            .then(res => {
                //把列表第一首歌的id传过去
                this.TheSongList = res.data.result.songs
                console.log(this.TheSongList)
                var songId = this.TheSongList[0].id
                //根据id获取图片
                fetch('song/detail', { ids: songId }, res => {
                    // console.log(12345679)
                    this.songImg = res.songs[0].al.picUrl
                })
                // 请求歌曲的地址.
                fetch('song/url', { id: songId }, (res) => {

                    this.songUrl = res.data[0].url
                    // console.log(this.songUrl)
                })
                //请求歌曲的评论
                fetch('comment/hot?type=0', { id: songId }, (res) => {
                    this.TheSongComment = res.hotComments
                    // console.log(this.TheSongComment)
                })
            })
    },
    methods: {
        //搜索歌曲获取歌曲列表
        hunt: function () {
            var _this = this
            fetch('search', { keywords: this.task }, function (res) {
                console.log(_this.TheSongList)
                _this.TheSongList = res.result.songs
            })
            this.task = ''

        },
        //点击切换歌曲
        play: function (id) {
            // console.log(id)
            // var _this = this
            // 请求歌曲的地址.
            fetch('song/url', { id: id }, (res) => {

                this.songUrl = res.data[0].url
                // console.log(this.songUrl)
            })
            // 请求歌曲的详情信息
            fetch('song/detail', { ids: id }, (res) => {

                this.songImg = res.songs[0].al.picUrl
            })
            //请求歌曲的评论
            fetch('comment/hot?type=0', { id: id }, (res) => {
                this.TheSongComment = res.hotComments
                // console.log(this.TheSongComment)
            })
        },
        zhuangtai: function (bol) {
            if (bol) {
                console.log('开始')
                this.isbol=true
            } else {
                this.isbol=false
                console.log('暂停')
            }

        }

    }
})