<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">{{ post.title }} </div>

                    <div class="panel-body">
                        <p class="post-body">{{ post.body }}</p>
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
            axios.get('/api/posts/' + this.$route.params.postId).then(response => {
                this.post = response.data;
            });
        },
        data() {
            return {
                post: {}
            }
        }
    }
</script>
