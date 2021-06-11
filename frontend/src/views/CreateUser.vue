<template>
  <br>
  <div class="d-flex justify-content-center">
  <div class="d-flex justify-content-center border border-1 shadow-lg col-sm-3  rounded">
    <div class="col-sm-8">
      <h4 class="mb-3 my-4">Création utilisateur</h4>
      <form class="needs-validation" validate>
        <div class="column g-5">
          <div class="my-4">
            <label for="nom" class="form-label">Nom</label>
            <input type="text" class="form-control" id="nom" placeholder="Nom" value="" required>
            <div class="invalid-feedback">
              Le nom est obligatoire.
            </div>
          </div>

          <div class="my-4">
            <label for="prenom" class="form-label">Prénom</label>
            <input type="text" class="form-control" id="prenom" placeholder="prenom" value="" required>
            <div class="invalid-feedback">
              Le prénom est obligatoire.
            </div>
          </div>

          <div class="my-4">
            <label for="email" class="form-label">Courriel</label>
            <div class="input-group has-validation">
              <input type="email" class="form-control" id="email" placeholder="email" required>
              <div class="invalid-feedback">
                L'addresse courriel est obligatoire.
              </div>
            </div>
          </div>

          <div class="my-4">
            <label for="password" class="form-label">Mot de passe</label>
            <div class="input-group has-validation">
              <input type="password" class="form-control" id="password" placeholder="Mot de passe" required>
              <div class="invalid-feedback">
                Mot de passe obligatoire.
              </div>
            </div>
          </div>

          <div class="my-4">
            <label for="passwordv" class="form-label">Confirmation mot de passe</label>
            <div class="input-group has-validation">
              <input type="password" class="form-control" id="passwordv" placeholder="Confirmation password" required>
              <div class="invalid-feedback">
                Confirmation obligatoire.
              </div>
            </div>
          </div>
        </div>

        <button class="w-75 btn btn-primary btn-lg my-4" type="submit">Valider</button>

      </form>
    </div>
  </div>
</div>
</template>
<script>
  export default {
    name: 'Login',
    components: {
    }
  }
</script>
<style>
  .cadreLogin {
    border: 2px solid blue;
  }
</style>