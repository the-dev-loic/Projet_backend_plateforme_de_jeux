"use strict";
const App = Vue.createApp({
    data() {
        return {
            username: "",
            email: "",
            password: "",
            password_confirm: "",
        };
    },
    methods: {
        async submit() {
            if (this.username === "" || this.email === "" || this.password === "" || this.password_confirm === "") {
                alert("Missing required fields.");
            }
            else if (this.password !== this.password_confirm) {
                alert("Confirmation password must match.");
            }
            else {
                const result = await fetch('http://localhost:3000/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: this.username,
                        email: this.email,
                        password: this.password
                    })
                });
                if (result.error) {
                    alert(result.error)
                }
            }
        }
    }
});