<template>
  <br>
  <div class="d-flex justify-content-center align-items-center">
    <form class="needs-validation" validate>
      <div>
        <label for="nom" class="form-label">Nom</label>
        <input type="text" class="form-control" id="nom" required>
      </div>

      <div class="p-4">
        <label for="courriel" class="form-label">Courriel</label>
        <div class="input-group has-validation">
          <span class="input-group-text" id="inputGroupPrepend">@</span>
          <input type="email" class="form-control" id="courriel" aria-describedby="inputGroupPrepend" required>
        </div>
      </div>

      <div class="p-4">
        <label for="passwd" class="form-label">mot de passe</label>
        <input type="password" class="form-control" id="passwd" required>
      </div>

      <div class="col-12 p-4">
        <button class="btn btn-primary" type="submit">Valider</button>
      </div>
    </form>
  </div>
</template>



<script>
  export default {
    name: 'CreateUser'
  }

</script>



<style>
  .cadreLogin {
    border: 2px solid blue;
  }
</style>