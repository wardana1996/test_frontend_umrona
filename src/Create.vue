<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-12">
                <div class="card border-0 rounded shadow">
                    <div class="card-body">
                        <h4>Create Data</h4>
                        <hr>

                        <form @submit.prevent="store">
                            <div class="form-group">
                                <label for="title" class="font-weight-bold">Title</label>
                                <input type="text" class="form-control" v-model="post.title" placeholder="Insert Title Post...">
                                <div v-if="validation.title" class="mt-2 alert alert-danger">
                                    {{ validation.title[0] }}
                                </div>
                            </div>
                            <div class="form-group mt-3">
                                <label for="content" class="font-weight-bold">Category</label>
                                <input type="text" class="form-control" v-model="post.category" placeholder="Insert Category Post...">
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
                            <button @click="showAlert" type="submit" class="btn btn-sm btn-primary m-3">Create</button>
                            <router-link :to="{name: 'posts.index'}" class="btn btn-sm btn-primary m-3">Back</router-link>
                        </form>                        

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
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

        function store() {

            let title   = post.title
            let category = post.category
            let description = post.description

            axios.post('http://localhost:8000/api/posts/store', {
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
            store
        }

    }

}
</script>

<style>
    body{
        background: lightgray;
    }
</style>