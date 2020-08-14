Vue.component('kb-song-list',{
    template:``
})

let vm = new Vue({
    el: '#app',
    data: {
        task:'',
        TheSongList:[]  //歌曲列表
    },
    mounted:function(){
        axios.get('https://apimusic.linweiqin.com/search',{params:{keywords:'热门'}})
        .then(res=>{
            console.log(res)
            this.TheSongList=res.data.result.songs
        })
    },
    methods: {
        hunt:function(){
            var _this=this
            fetch('search',{keywords:this.task},function(res){
                console.log(_this.TheSongList)
                _this.TheSongList=res.songs
            })
            this.task=''
        }
    }
})