"use strict";

const App = Vue.createApp({
    data() {
        return {
            users: [],
            games: [],
            dlcs: [],
            publishers: [],
            usersGames: [],
            usersDlcs: [],
            gamesGenres: [],
            genres: [],

            selectedUserId: "",
            search: "",
            userGames: [],
            userDlcs: [],
            loading: false,
            error: ""
        };
    },

    computed: {
        filteredUsers() {
            return this.users.filter(u =>
                u.username.toLowerCase().includes(this.search.toLowerCase())
            );
        },

        selectedUserName() {
            const u = this.users.find(u => u.id == this.selectedUserId);
            return u ? u.username : "";
        }
    },

    watch: {
        selectedUserId() {
            this.rebuildUserData();
        }
    },

    methods: {
        async fetchAll() {
            this.loading = true;

            try {
                const endpoints = [
                    "users",
                    "games",
                    "publishers",
                    "dlcs",
                    "users_has_games",
                    "users_has_dlcs",
                    "games_has_genres",
                    "genres"
                ];

                const responses = await Promise.all(
                    endpoints.map(e => fetch(`http://localhost:3000/api/${e}`))
                );

                const jsonData = await Promise.all(responses.map(r => r.json()));

                // assignation
                [
                    this.users,
                    this.games,
                    this.publishers,
                    this.dlcs,
                    this.usersGames,
                    this.usersDlcs,
                    this.gamesGenres,
                    this.genres
                ] = jsonData;

            } catch (e) {
                this.error = e.message;
            } finally {
                this.loading = false;
            }
        },

        rebuildUserData() {
            if (!this.selectedUserId) return;

            const uid = parseInt(this.selectedUserId);

            // 🔵 Jeux de l'utilisateur
            const relations = this.usersGames.filter(ug => ug.user_id === uid);
            this.userGames = relations.map(rel => {
                const game = this.games.find(g => g.id === rel.game_id);

                const publisher = this.publishers.find(p => p.id === game.publisher_id);

                const genreLinks = this.gamesGenres.filter(gg => gg.game_id === game.id);
                const gameGenres = genreLinks.map(gl => this.genres.find(g => g.id === gl.genre_id));

                return {
                    ...game,
                    publisher_name: publisher?.username || "Inconnu",
                    genres: gameGenres
                };
            });

            // 🔵 DLCs possédés par l’utilisateur
            const dlcRel = this.usersDlcs.filter(d => d.user_id === uid);
            this.userDlcs = dlcRel.map(link => this.dlcs.find(d => d.id === link.DLC_id));
        }
    },

    mounted() {
        this.fetchAll();
    }
});