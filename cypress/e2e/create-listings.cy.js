const LISTINGS = [
	{ title: 'iPhone 12 Pro', description: 'Brand new iPhone 12 Pro, never used.' },
	{ title: 'Nike Air Max 90', description: 'Limited edition Nike Air Max 90 sneakers.' },
	{
		title: 'Modern Apartment in City Center',
		description: 'Spacious apartment in the heart of the city.'
	},
	{
		title: 'Canon EOS Rebel T7i',
		description: 'High-quality DSLR camera for photography enthusiasts.'
	},
	{
		title: 'Vintage Vinyl Record Collection',
		description: 'Collection of classic vinyl records in excellent condition.'
	},
	{ title: 'Mountain Bike', description: 'Full-suspension mountain bike for off-road adventures.' },
	{ title: 'Designer Handbag', description: 'Luxury designer handbag, perfect for any occasion.' },
	{
		title: 'Cozy Studio Apartment',
		description: 'Comfortable studio apartment with modern amenities.'
	},
	{
		title: 'Gaming Laptop',
		description: 'Powerful gaming laptop for immersive gaming experiences.'
	},
	{ title: 'Electric Guitar', description: 'Electric guitar for musicians and music lovers.' }
];

const CONDITIONS = [
	'New',
	'Very good condition',
	'Good condition',
	'Satisfactory condition',
	'For parts'
];
const CATEGORIES = ['Vehicles', 'Fashion', 'Housing', 'Multimedia', 'Recreational'];

const USER_NUM = Math.floor(Math.random() * 3);

describe('Create listing', () => {
	it('should signin & create a listing', () => {
		cy.visit('/auth/signin');

		cy.get('#email').type('test' + USER_NUM + '@mail.com', { force: true });
		cy.get('#password').type('test' + USER_NUM + '$', { force: true });

		cy.get('#submit').click({ force: true });

		cy.visit('/new');

		const LISTING = LISTINGS[Math.floor(Math.random() * Object.keys(LISTINGS).length)];
        const PRICE = Math.floor(Math.random() * 10_000)
		const CATEGORY_INDEX =Math.floor(Math.random() * CATEGORIES.length);
		const CONDITION_INDEX = Math.floor(Math.random() * CONDITIONS.length);

		cy.get('#title').type(LISTING.title, { force: true });
		cy.get('#description').type(LISTING.description, { force: true });
		cy.get('#price').type(PRICE, { force: true });
		cy.get('#category').select(CATEGORY_INDEX, { force: true });
		cy.get(`:nth-child(${CONDITION_INDEX+1}) > [data-testid="radio-item"]`).click({ force: true });

        cy.get('#submit').click({force:true})

	});
});
