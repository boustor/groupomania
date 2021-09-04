
<template>
    <div class="hello">
        <form @submit.prevent="sendPost">
            <label for="title">Titre du message </label>
            <input type="text" name="title" v-model="title" />
            <input type="file" id="file" ref="file" @change="changeFile" />
            <input type="submit" value="Envoyer le message" />
        </form>
    </div>
</template>

<script>
// import axios from "axios";
export default {
    name: "HelloWorld",
    data() {
        return {
            title: "",
            file: ""
        };
    },
    methods: {
        changeFile() {
            this.file = this.$refs.file.files[0];
            console.log(this.file);
        },
        sendPost() {
            let formData = new FormData();
            formData.append("title", this.title);
            formData.append("file", this.file);

            fetch("http://localhost:3000/api/messages/image", {
                method: "POST",
                // headers: {
                //  "Content-Type": "multipart/form-data"
                // },
                body: formData
            }).then(res => {
                console.log(res);
            });
            // axios
            //  .post("http://localhost:3001/post", formData, {
            //      headers: {
            //          "Content-Type": "multipart/form-data"
            //      }
            //  })
            //  .then(res => {
            //      console.log(res);
            //  });
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>