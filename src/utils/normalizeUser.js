export default function normalizeUser(input) {
    return {
        user: {
            first: input.first,
            middle: input.middle,
            last: input.last,
        },
        phone: input.phone,
        email: input.email,
        password: input.password,
        image: {
            url: input.url,
            alt: input.alt,
        },
        address: {
            state: input.state,
            country: input.country,
            city: input.city,
            street: input.street,
            houseNumber: input.houseNumber,
            zip: input.zip
        },
        isBusiness: input.isBusiness
    }
};
