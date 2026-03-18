/***********************************************************************************************************************
 * Program name :           hash_test.js
 * Description :            test of hash function
 * Author :                 Cédric Jankiewicz
 * Creation date :          17.03.2026
 * Modified by :            -
 * Modification date :      -
 * Version :                0.1.0
 **********************************************************************************************************************/
import {hashPassword,verifyPassword} from "./hash.js";

const password = "Pa$$word"
const wrongPassword = "password"
const hashedPassword = await hashPassword(password, 0);
console.log(hashedPassword);
console.log(await verifyPassword(password, hashedPassword));
console.log(await verifyPassword(wrongPassword, hashedPassword));

//test passwords from db
const passwords = [
    "hashedpass1",
    "hashedpass2",
    "hashedpass3",
    "userpass1",
    "userpass2",
    "userpass3",
    "userpass4"
]

const hash = [
    '$2b$10$ysqvT4ggwWNyjPBmKYRoiOOqWm0Jgzqs85IA07US./zKNgEeSVhU2',
    '$2b$10$uJcaq.TG.X4f/YmkhswYa.feiFo1FlzmKSUfUHFcc6i0aijhbYfqW',
    '$2b$10$g4yw/9dNh.5Y2H64Y9J2l.17k.UfREA6TocGDvfDwjjhPkpZusJ1.',
    '$2b$10$qa2l.nxh.EYXdjDwMIITwe7.GRItI1LhUwTErcj5rxh1qZGUhNAhy',
    '$2b$10$GfMQviKBX9yzkAA/JYrtf.NZuo/vLRGr.ChA/Ax71uLML5BbWBBr.',
    '$2b$10$Sw7WNLawh0g9TC48U.ofAeDlmrIdTzjCrC0e7qJMoDwTP8rII9hAq',
    '$2b$10$CGVn1VxphfwFIxo6m5IkKukSy/V/ZPHlzXhXKWWSsObDqJ0A2sRzm'
]
for (let i = 0; i < passwords.length; i++) {
    console.log(await hashPassword(passwords[i], 10));
    console.log(await verifyPassword(passwords[i], hash[i]));
}