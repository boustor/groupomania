<template>
    <div class="entete">
        <div>
            <input type="checkbox" id="ham-menu" />
            <label for="ham-menu" class="menuLabel">
                <div class="hide-des">
                    <span class="menu-line"></span>
                    <span class="menu-line"></span>
                    <span class="menu-line"></span>
                </div>
            </label>
            <div class="full-page-green"></div>
            <div class="ham-menu">
                <ul class="centre-text bold-text">
                    <li>
                        <router-link :to="{name:'Utilisateurs'}">Utilisateurs</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'ListeMessages'}">Messages</router-link>
                    </li>
                    <li>
                        <router-link :to="{name:'Login'}">Se déconnecter</router-link>
                    </li>
                </ul>
            </div>
        </div>
        <div><img :src="require(`@/assets/groupomania.png`)" class="image"></div>
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
    }

    .image {
        max-height: 40px;
        padding-left: 10px;

    }


</style>