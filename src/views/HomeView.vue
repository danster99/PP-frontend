<template>
  <div class="home min-h-full">
    <SingleLineSection v-for="(item, key, index) in this.cards" :key="index" :title="key" :sizes="formatCards(item)" />
    <div class="h-4"></div>
  </div>
</template>

<script>
import SingleLineSection from "@/components/SingleLineSection.vue";
import axios from 'axios';

export default {
  name: 'HomeView',
  components: {
    SingleLineSection,
  },
  data() {
    return {
      cards: [],
    }
  },
  created() {
    let willLoad = true;
        setTimeout(() => {
            if (willLoad) {
                localStorage.setItem('isLoading', 'true');
            }
        }, 200);
    this.getCards().then(() => {
      const cardsPromises = [];
      Object.values(this.cards).forEach(element => {
        element.forEach(card => {
          cardsPromises.push(new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = resolve;
            img.onerror = reject;
            img.src = card.b2StorageFile;
          }));
        });
      });
      Promise.all(cardsPromises).then(() => {
        localStorage.setItem('isLoading', 'false');
        willLoad = false;
      });
  }).catch(error => {
    console.log(error);
  });
  },
  methods: {
    async getCards() {
      try {
        await axios.get('https://plate-pal-97cd0667892d.herokuapp.com/api/menu/' + localStorage.getItem('menuId') + '/homepageCards/').then(response => {
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
          text: element.text,
          link: element.links_to
        })
      });
      return returnCards;
    }
  }
}
</script>
