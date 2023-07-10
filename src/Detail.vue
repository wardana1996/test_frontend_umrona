<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Detail Data</h4>
                        <hr>
                            <div class="form-group">
                                <label for="title" class="font-weight-bold">Title</label>
                                <input type="text" class="form-control" v-model="post.title" placeholder="Insert Title Post..." readonly>
                            </div>
                            <div class="form-group mt-3">
                                <label for="content" class="font-weight-bold">Category</label>
                                <input type="text" class="form-control" v-model="post.category" placeholder="Insert Title Post..." readonly>
                               
                            </div>
                            <div class="form-group mt-3">
                                <label for="content" class="font-weight-bold">Description</label>
                                <textarea class="form-control" rows="4" v-model="post.description" placeholder="Insert Description Post..." readonly></textarea>
                               
                            </div>
                            <router-link :to="{name: 'posts.index'}" class="btn btn-sm btn-primary mt-3">Back</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    name: 'HelloWorld',
    setup() {

        const post = reactive({
            title: '',
            category: '',
            description: ''
        })

        const validation = ref([])

        const router = useRouter()

        const route = useRoute()

        onMounted(() => {

            axios.get(`http://localhost:8000/api/posts/edit/${route.params.id}`)
            .then(response => {
              
              post.title    = response.data.data.title  
              post.category  = response.data.data.category  
              post.description    = response.data.data.description  

            }).catch(error => {
                console.log(error.response.data)
            })

        })

        return {
            post,
            validation,
            router,
            
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>