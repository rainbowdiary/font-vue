<template>
    <div>123</div>
</template>

<script>
    import axios from "axios"
    export default {
        name: "axiosbase",
        async created(){
         /* const res = await axios({
            url: '/search/users',
            method: 'get',
            baseURL: 'https://api.github.com',
            params: {
              q: "betterDamu"
            },
          })*/
         /*const res = await axios("/search/users",{
            method: 'get',
            baseURL: 'https://api.github.com',
            params: {
              q: "betterDamu"
            },
          })*/
         /*const res = await Promise.all([ axios({
           url: '/search/users',
           method: 'get',
           baseURL: 'https://api.github.com',
           params: {
             q: "betterDamu"
           },
         }) , axios({
           url: '/search/users',
           method: 'get',
           baseURL: 'https://api.github.com',
           params: {
             q: "zdy"
           },
         })])*/
         axios.all([axios({
                 baseURL:"https://api.github.com",
                 url:"/search/repositories",
                 method:"get",
                 params:{
                     q:"js"
                 }
             }),axios({
                 baseURL:"https://api.github.com",
                 url:"/search/repositories",
                 method:"get",
                 params:{
                     q:"vue"
                 }
             })]).then(
                   axios.spread((val1,val2)=>{
                       console.log(val1,val2,1);
                   })
             )


          }
    }
</script>

<style scoped>

</style>
