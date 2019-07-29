<template>
  <v-container grid-list-lg>
    <h1>
      Starships
      <span v-show="!!starshipsCount">
        (count: {{starshipsCount}})
      </span>
    </h1>
    <FindShips
      @submit="find"
    />
    <v-layout row wrap>
      <Ship
        v-for="(item, i) in starships"
        :key="i"
        :name="item.name"
        :model="item.model"
        :url="item.url"
        @to-starship="toStarship"
        />
    </v-layout>
    <div class="text-xs-center" v-if="starshipsCount> 10">
      <v-btn
        fab
        small
        :disabled="!previous"
        @click="nav('previous')"
        >
        <v-icon dark>chevron_left</v-icon>
      </v-btn>
      <v-btn
        fab
        small
        :disabled="!next"
        @click="nav('next')"
        >
        <v-icon dark>chevron_right</v-icon>
      </v-btn>
    </div>
    <Empty v-if="isEmpty"/>
  </v-container>
</template>

<script>
import FindShips from '@/components/FindShips.vue';
import Ship from '@/components/Ship.vue';
import Empty from '@/components/Empty.vue';

export default {
  name: 'starships',
  components: {
    Ship,
    FindShips,
    Empty,
  },
  data() {
    return {
      starships: [],
      starshipsCount: 0,
      next: '',
      previous: '',
      isEmpty: false,
    };
  },
  created() {
    if (Object.keys(this.$route.query).length) this.getStarships(`starships${this.$route.fullPath}`);
    else this.getStarships();
  },
  methods: {
    async getStarships(topic = 'starships') {
      try {
        const { data } = await this.$https.get(topic);
        this.setData(data);
      } catch (error) {
        console.error(`Ошибка в запросе ${topic}`, error);
      }
    },
    async find(value) {
      const topic = value.length ? `starships/?search=${value}` : 'starships';
      try {
        const { data } = await this.$https.get(topic);
        this.setData(data);
        if (value.length) this.$router.push({ path: '/', query: { search: value } });
        else this.$router.push({ path: '/', query: {} });
      } catch (error) {
        console.error(`Ошибка в запросе ${topic}`, error);
      }
    },
    setData({
      results, count, previous, next,
    }) {
      this.starships = results;
      this.starshipsCount = count;
      this.previous = previous;
      this.next = next;
      this.isEmpty = !this.starships.length;
    },
    toStarship(id) {
      this.$router.push(`/starship/${id}`);
    },
    nav(path) {
      this.getStarships(this[path]);
      const page = parseInt(this[path].match(/\d+/), 10);
      const query = { ...this.$route.query, page };
      this.$router.push({ path: '/', query });
    },
  },
};
</script>
