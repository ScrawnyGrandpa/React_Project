import Model from "./Model";
import UsersAPI from "../services/UsersAPI";
import CardsAPI from "../services/CardsAPI";
import CardModel from "./CardModel";

export default class UserModel extends Model {
    static api = UsersAPI;
    static cache = {};

    cards;

    constructor({
        _id = "",
        name = { first: "", middle: "", last: "" },
        phone = "",
        email = "",
        password = "",
        image = { url: "", alt: "" },
        address = { state: "", country: "", city: "", street: "", houseNumber: 0, zip: 0 },
        isBusiness = false,
        createdAt = ""
    } = {}) {
        super({ _id, createdAt });
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.image = image;
        this.address = address;
        this.isBusiness = isBusiness;
    }

    fromObject({
        _id = "",
        first = "",
        middle = "",
        last = "",
        phone = "",
        email = "",
        password = "",
        url = "",
        alt = "",
        state = "",
        country = "",
        city = "",
        street = "",
        houseNumber = 0,
        zip = 0,
        isBusiness = false
    }) {
        this._id = _id;
        this.name = { first, middle, last };
        this.phone = phone;
        this.email = email;
        this.password = password;
        this.image = { url, alt };
        this.address = { state, country, city, street, houseNumber, zip };
        this.isBusiness = isBusiness;

        return this;
    }

    toObject() {
        return {
            ...this.name,
            phone: this.phone,
            email: this.email,
            password: this.password,
            ...this.image,
            ...this.address,
            isBusiness: this.isBusiness,
            _id: this._id,
        };
    }

    serialize() {
        const data = {
            name: this.name,
            phone: this.phone,
            image: this.image,
            address: this.address
        };

        if (!this._id) {
            data.email = this.email;
            data.password = this.password;
            data.isBusiness = this.isBusiness;
        }

        return data;
    }

    async myCards() {
        if (!this.cards) {
            const data = await CardsAPI.myCards();
            this.cards = CardModel.loadData(data);
        }

        return this.cards;
    }
}