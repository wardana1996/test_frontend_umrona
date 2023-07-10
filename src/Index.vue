<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Posts Lists</h4>
                        <hr>
                        <router-link :to="{name: 'posts.create'}" class="btn btn-md btn-success">Create Data</router-link>

                        <table class="table table-striped table-bordered mt-4">
                            <thead class="thead-dark">
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(post, index) in posts" :key="index">
                                    <td>{{ post.title }}</td>
                                    <td>{{ post.category }}</td>
                                    <td>{{ post.description }}</td>
                                    <td class="text-center">
                                        <router-link :to="{name: 'posts.edit', params:{id: post.id }}" class="btn btn-sm btn-primary">Edit</router-link>
                                        <router-link :to="{name: 'posts.detail', params:{id: post.id }}" class="btn btn-sm btn-info m-2">Detail</router-link>
                                        <button @click.prevent="postsDelete(post.id)" class="btn btn-sm btn-danger">DELETE</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onMounted, ref } from 'vue'

export default {
    name: 'HelloWorld',
    setup() {

        let posts = ref([])

        onMounted(() => {

            axios.get('http://localhost:8000/api/posts/index')
            .then(response => {
              
              posts.value = response.data.data

            }).catch(error => {
                console.log(error.response.data)
            })

        })

        
        function postsDelete(id, index) {
            
            axios.delete('http://localhost:8000/api/posts/delete/' + id)
            .then(() => {
                this.posts.splice(index, 1);
                window.location.reload()
                }).catch(error => {
                    console.log(error.response.data)
            })

        }

        
        return {
            posts,
            postsDelete
        }
    }

    

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>