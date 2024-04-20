<template>
  <div class="home">
    <appTitle />
    <StoriesBar />
    <SingleLineSection v-for="(item, key, index) in this.cards" :key="index" :title="key" :sizes="formatCards(item)" />
    <NavBar />
    <div class=" h-10"></div>
  </div>
</template>

<script>
import appTitle from "@/components/appTitle.vue"
import SingleLineSection from "@/components/SingleLineSection.vue";
import StoriesBar from "@/components/StoriesBar.vue";
import NavBar from "@/components/NavBar.vue"
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    appTitle,
    SingleLineSection,
    StoriesBar,
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
      console.log(cards)
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
