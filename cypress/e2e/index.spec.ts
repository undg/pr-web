describe('Basic flow', () => {
	beforeEach(() => {
		cy.viewport('samsung-s10')
	})

	it('Should render app correctly', () => {
		cy.visit('/')
	})
})
