"use strict";
const App = Vue.createApp({
    data() {
        return {
            games: [],
            loading: true,
            error: ""
        };
    },
    methods: {
        async fetchGames() {
            try {
                const res = await fetch("http://localhost:3000/api/games");

                if (!res.ok) {
                    throw new Error("HTTP " + res.status);
                }

                const data = await res.json();
                console.log("Réponse API :", data);

                // Le backend doit renvoyer un tableau [{publisher_id,name,description,price}]
                this.games = data;

            } catch (e) {
                this.error = e.message;
                console.error(e);
            } finally {
                this.loading = false;
            }
        }
    },
    mounted() {
        this.fetchGames();
    }
});