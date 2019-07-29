<template>
  <v-layout>
    <v-form
      class="form"
      @submit.prevent="submit"
      >
      <v-flex lg6 d-flex>
      <v-text-field
        label="Enter name"
        placeholder=" "
        v-model="starshipName"
        />
      <v-btn
        large
        color="white"
        type="submit"
        >
          Find
        </v-btn>
      </v-flex>
    </v-form>
  </v-layout>
</template>

<script>
export default {
  name: 'find-ships',
  data() {
    return {
      starshipName: '',
    };
  },
  methods: {
    submit() {
      this.$emit('submit', this.starshipName);
    },
  },
};
</script>

<style scoped>
  .form {
    width: 100%;
  }
</style>
