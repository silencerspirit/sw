<template>
  <v-flex lg6>
    <v-card ripple @click="toStarship">
      <v-list class="item">
        <v-list-tile>
          <v-list-tile-content>
            <v-list-tile-title>{{name}}</v-list-tile-title>
            <v-list-tile-sub-title>{{model}}</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'ship',
  props: {
    name: String,
    model: String,
    url: String,
  },
  computed: {
    id() {
      return parseInt(this.url.match(/\d+/), 10);
    },
  },
  methods: {
    toStarship() {
      this.$emit('to-starship', this.id);
    },
  },
};
</script>

<style scoped>
  .item {
    cursor: pointer;
  }
</style>
