"use strict";
const App = Vue.createApp({
    data() {
        return {
            games: [],
            publishersById: {},
            loading: true,
            error: ""
        };
    },
    methods: {
        async fetchGames() {
            this.loading = true;
            this.error = "";

            try {
                const [resGames, resPublishers] = await Promise.all([
                    fetch("http://localhost:3000/api/games"),
                    fetch("http://localhost:3000/api/publishers")
                ]);

                if (!resGames.ok) throw new Error("HTTP " + resGames.status + " (games)");
                if (!resPublishers.ok) throw new Error("HTTP " + resPublishers.status + " (publishers)");

                const [gamesRaw, publishersRaw] = await Promise.all([
                    resGames.json(),
                    resPublishers.json()
                ]);

                const byId = {};
                for (const p of publishersRaw) {
                    const id = p.id
                    const name = p.username
                    if (id != null) byId[id] = name || `Publisher #${id}`;
                }
                this.publishersById = byId;

                this.games = gamesRaw.map(g => {
                    const pid = g.publisher_id;
                    return {
                        ...g,
                        publisher_name: byId[pid] || `Publisher #${pid}`
                    };
                });

                console.log("Jeux enrichis :", this.games);
            } catch (e) {
                console.error(e);
                this.error = e.message || String(e);
            } finally {
                this.loading = false;
            }
        }
    },
    mounted() {
        this.fetchGames();
    }
});