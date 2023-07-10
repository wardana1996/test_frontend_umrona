<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Edit Data</h4>
                        <hr>
                        <form @submit.prevent="update">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold">Title</label>
                                <input type="text" class="form-control" v-model="post.title" placeholder="Insert Title Post...">
                                <div v-if="validation.title" class="mt-2 alert alert-danger">
                                    {{ validation.title[0] }}
                                </div>
                            </div>
                            <div class="form-group mt-3">
                                <label for="content" class="font-weight-bold">Category</label>
                                <input type="text" class="form-control" v-model="post.category" placeholder="Insert Title Post...">
                                <div v-if="validation.category" class="mt-2 alert alert-danger">
                                    {{ validation.category[0] }}
                                </div>
                            </div>
                            <div class="form-group mt-3">
                                <label for="content" class="font-weight-bold">Description</label>
                                <textarea class="form-control" rows="4" v-model="post.description" placeholder="Insert Description Post..."></textarea>
                                <div v-if="validation.description" class="mt-2 alert alert-danger">
                                    {{ validation.description[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-sm btn-primary m-3">Update</button>
                            <router-link :to="{name: 'posts.index'}" class="btn btn-sm btn-primary m-3">Back</router-link>
                        </form>                        

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

        //method update
        function update() {

            let title   = post.title
            let category = post.category
            let description = post.description

            axios.put(`http://localhost:8000/api/posts/update/${route.params.id}`, {
                title: title,
                category: category,
                description: description
            }).then(() => {

                router.push({
                    name: 'posts.index'
                })

            }).catch(error => {
                validation.value = error.response.data
            })

        }

        return {
            post,
            validation,
            router,
            update
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>