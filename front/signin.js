"use strict";
import {verifyPassword} from "../functions/hash.js";

const App = Vue.createApp({
    data() {
        return {
            username: "",
            password: ""
        };
    },

    methods: {
        async checkLogin() {
            this.error = "";
            this.loading = true;

            try {
                const res = await fetch("http://localhost:3000/api/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password
                    })
                });

                const data = await res.json();

                if (!res.ok) {
                    this.error = data.error || "Erreur de connexion";
                    return;
                }

                alert("Connexion réussie !");
            } catch (e) {
                console.error(e);
                this.error = e.message;
            } finally {
                this.loading = false;
            }
        }
    }
});