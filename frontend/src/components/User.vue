<template>
  <br />
  <div class="d-flex justify-content-center">
    <div
      class="
        d-flex
        justify-content-center
        border border-1
        shadow-lg
        col-sm-4
        rounded
      "
    >
      <div class="col-sm-12">
        <h4 class="mb-3 my-4">Création utilisateur</h4>

        <div class="my-4 px-3">
          <label for="nom" class="form-label">Nom</label>
          <input
            type="text"
            class="form-control"
            id="nom"
            v-model="nom"
            placeholder="Nom"
          />
          <div class="invalid-feedback" v-bind:class="{ 'd-block': ctrlNom }">
            Le nom est obligatoire.
          </div>
        </div>

        <div class="my-4 px-3">
          <label for="email" class="form-label">Courriel</label>
          <div class="input-group">
            <input
              type="email"
              class="form-control"
              id="email"
              v-model="email"
              placeholder="email"
            />
            <div
              class="invalid-feedback"
              v-bind:class="{ 'd-block': ctrlEmail }"
            >
              L'addresse courriel est obligatoire ou de format incorrect.
            </div>
          </div>
        </div>

        <div class="my-4 px-3">
          <label for="password" class="form-label">Mot de passe</label>
          <div class="input-group">
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="password"
              placeholder="Mot de passe"
            />
            <div
              class="invalid-feedback"
              v-bind:class="{ 'd-block': ctrlPswd }"
            >
              Mot de passe obligatoire ou incorrect.
            </div>
          </div>
        </div>
        <div class="invalid-feedback" v-bind:class="{ 'd-block': creationCpt }">
          Problème lors de la création de l'utilisateur
        </div>
        <button
          class="w-75 btn btn-primary btn-lg my-4"
          v-on:click="createAccount()"
        >
          Valider
        </button>
      </div>
    </div>
  </div>
</template>