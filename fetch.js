var baseUrl='https://apimusic.linweiqin.com/'   //相同的头路径

/**调接口
 * @param url      <string>     后面请求的路径
 * @param data     <obj>        请求携带的参数
 * @param fn       <function>   请求成功的回调函数
*/
function fetch(url,data,fn){
    axios.get(`${baseUrl+url}`,{
        params:data
    }).then(res=>{
        // console.log(123)
            fn(res.data.result)  
    }).catch(err=>{
        console.log('调接口失败')
    })
}
