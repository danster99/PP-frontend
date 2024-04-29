<template>
  <div class="home">
    <SingleLineSection v-for="(item, key, index) in this.cards" :key="index" :title="key" :sizes="formatCards(item)" />
    <div class="h-4"></div>
    <NavBar />
  </div>
</template>

<script>
import SingleLineSection from "@/components/SingleLineSection.vue";
import NavBar from "@/components/NavBar.vue"
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    SingleLineSection,
    NavBar
  },
  data() {
    return {
      cards: [],
    }
  },
  created() {
    this.getCards();
  },
  methods: {
    async getCards() {
      try {
        await axios.get('https://plate-pal-97cd0667892d.herokuapp.com/api/menu/1/homepageCards/').then(response => {
          this.cards = response.data;
        });
      } catch (error) {
        console.log(error)
      }
    },
    formatCards(cards) {
      let returnCards = [];
      cards.forEach(element => {
        returnCards.push({
          size: element.size,
          image: element.b2StorageFile,
          text: element.text
        })
      });
      return returnCards;
    }
  }
}
</script>
