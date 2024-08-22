export default function mapCardoModel(input) {
    return {
        title: input.title,
        subtitle: input.subtitle,
        description: input.description,
        phone: input.phone,
        email: input.email,
        webUrl: input.web,
        imageUrl: input.image.url,
        imageAlt: input.image.alt,
        state: input.address.state,
        country: input.address.country,
        city: input.address.city,
        street: input.address.street,
        houseNumber: input.address.houseNumber,
        zip: input.address.zip
    }
};