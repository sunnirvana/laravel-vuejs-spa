<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>VueJS SPA</title>

        <!-- Fonts -->
        {{--<link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">--}}
        <link rel="stylesheet" href="/css/app.css">
    </head>
    <body>

    <div id="app">
        <div class="navbar">
            <router-link class="navbar-brand" to="/home">Home</router-link>
            <ul class="nav navbar-nav">
                <router-link tag="li" to="/about"> <a>About</a> </router-link>
            </ul>
        </div>
        <router-view></router-view>
    </div>

    <script src="/js/app.js"></script>
    </body>
</html>
