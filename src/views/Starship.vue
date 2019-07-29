<template>
<v-container
  grid-list-lg
  v-if="Object.keys(starship).length"
  >
  <h1>Starship: {{starship.name}}</h1>
  <v-expansion-panel>
    <v-expansion-panel-content
      v-for="(item, key) in starship"
      :key="key"
    >
      <template v-slot:header>
        <h3>{{key}}</h3>
      </template>
      <v-card>
        <v-card-text>
          <template v-if="Array.isArray(item)">
            <ol>
              <li v-for="(points, i) in item" :key="i">
                {{points}}
              </li>
            </ol>
          </template>
          <template v-else>
            {{item}}
          </template>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</v-container>
</template>

<script>
export default {
  name: 'starship',
  data() {
    return {
      id: '',
      starship: {},
    };
  },
  created() {
    this.id = this.$route.params.id;
    this.getStarship();
  },
  methods: {
    async getStarship() {
      const topic = `/starships/${this.id}`;
      try {
        const { data } = await this.$https.get(topic);
        this.starship = data;
      } catch (error) {
        console.error(`Ошибка в запросе ${topic}`, error);
      }
    },
  },
};
</script>
