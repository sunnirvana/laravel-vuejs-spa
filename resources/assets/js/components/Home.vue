<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Posts</div>

                    <div class="panel-body">
                        <div v-for="post in posts">
                            <h4 class="post-title">
                                <router-link :to="{name: 'post', params: {'postId' : post.id}}">{{ post.title }}</router-link>
                            </h4>
                            <p class="post-body">{{ post.body }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        mounted() {
            // console.log('Component mounted.')
            axios.get('/api/posts').then(response => {
                this.posts = response.data.data;
            })
        },
        data() {
            return {
                posts: []
            }
        }
    }
</script>
