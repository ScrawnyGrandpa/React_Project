export default function normalizeCard(input) {
    return {
        title: input.title,
        subtitle: input.subtitle,
        description: input.description,
        phone: input.phone,
        email: input.email,
        web: input.webUrl,
        image: {
            url: input.imageUrl,
            alt: input.imageAlt,
        },
        address: {
            state: input.state,
            country: input.country,
            city: input.city,
            street: input.street,
            houseNumber: input.houseNumber,
            zip: input.zip
        }
    }
};
