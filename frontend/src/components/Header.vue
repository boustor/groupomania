<template>
    <div class="entete">
        <div><img :src="require(`@/assets/groupomania.png`)" class="image"></div>
        <div>
            <input class="menu-btn" type="checkbox" id="menu-btn" />
            <label class="menu-icon" for="menu-btn"><span class="navicon"></span></label>
            <ul class="menu">
                <li><router-link :to="{name:'ListeMessages'}">Messages</router-link></li>
                <li><router-link :to="{name:'Login'}">Se déconnecter</router-link></li>
            </ul>
        </div>
    </div>

</template>

<script>
    export default {
        name: 'Header'
    }
</script>

<style scoped>
    .entete {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: 50px;
        background-color: #f5f5f5;
        border-bottom: 2px solid black;
        padding-left: 5px;
        padding-right: 20px;
        z-index: 100;
    }

    .image {
        max-height: 40px;
        padding-left: 10px;

    }

    .menu li {
        margin-top: -5px;
    }

    .entete ul {
        margin: 0;
        padding: 0;
        list-style: none;
        overflow: hidden;
        background-color: #f5f5f5;
        border-radius: 10px;
    }

    .entete li a {
        display: block;
        padding: 20px 20px;
        border-right: 1px solid #f4f4f4;
        text-decoration: none;
    }

    .entete li a:hover,
    .entete .menu-btn:hover {
        background-color: #f4f4f4;
    }


    /* menu */
    .entete .menu {
        clear: both;
        max-height: 0px;
        transition: max-height .0s ease-out;
    }

    /* menu icon */

    .entete .menu-icon {
        cursor: pointer;
        display: inline-block;
        float: right;
        padding: 28px 20px;
        position: relative;
        user-select: none;
    }

    .entete .menu-icon .navicon {
        background: #333;
        display: block;
        height: 2px;
        position: relative;
        transition: background .2s ease-out;
        width: 18px;
    }

    .entete .menu-icon .navicon:before,
    .entete .menu-icon .navicon:after {
        background: #333;
        content: '';
        display: block;
        height: 100%;
        position: absolute;
        transition: all .2s ease-out;
        width: 100%;
    }

    .entete .menu-icon .navicon:before {
        top: 5px;
    }

    .entete .menu-icon .navicon:after {
        top: -5px;
    }

    /* menu btn */

    .entete .menu-btn {
        display: none;
    }

    .entete .menu-btn:checked~.menu {
        margin-top: 160px;
        max-height: 240px;
    }

    .entete .menu-btn:checked~.menu-icon .navicon {
        background: transparent;
    }

    .entete .menu-btn:checked~.menu-icon .navicon:before {
        transform: rotate(-45deg);
    }

    .entete .menu-btn:checked~.menu-icon .navicon:after {
        transform: rotate(45deg);
    }

    .entete .menu-btn:checked~.menu-icon:not(.steps) .navicon:before,
    .entete .menu-btn:checked~.menu-icon:not(.steps) .navicon:after {
        top: 100px;
    }

    /* 48em = 768px */

    @media (min-width: 48em) {
        .entete li {
            float: left;
        }

        .entete li a {
            padding: 20px 30px;
        }

        .entete .menu {
            clear: none;
            float: right;
            max-height: none;
        }

        .entete .menu-icon {
            display: none;
        }

        .entete .menu {
            height: 50px;
        }

        .entete ul {
            margin: 0px;
            background-color: #fff;
        }
    }
</style>