describe('Visit Store', () => {
  it('Visits the Storefront with Correct Theme Applied', () => {
    cy.visit(Cypress.env('STORE_URL'));
    // Check Theme: Shopify.theme.id
  });

  it('Inputs Password if Password Protected', () => {
    cy.url().then(($url) => {
      if ($url.includes('/password')) {
        cy.get('#input-password').type(Cypress.env('STORE_PW'));
        cy.get('#submit').click();
        cy.url().should('not.include', '/password');
      } else {
        cy.url().should('not.include', '/password');
      }
    });
  });
});

describe('Find, Open & Close, and Add to Cart', () => {
  beforeEach(() => {
    cy.get('.cart-toggle').as('toggles');
    cy.get('.cart-toggle').first().as('firstToggle');
    cy.get('#cart').as('globalCart');
    cy.get('#cart').find('button.close').as('globalCartCloseButton');
    cy.get('#cart').find('.global-cart__overlay').as('globalCartOverlay');
  });

  it('Finds visible, undisabled cart toggles & hidden, mounted global cart with a close button', () => {
    cy.get('@toggles').should('be.visible').should('not.be.disabled');

    cy.get('@globalCart').should('not.be.visible').should('not.have.css', 'display', 'none');
  });

  it('Opens cart with every toggle then closes with close button each time', () => {
    cy.get('@toggles').each(($toggle) => {
      cy.wrap($toggle).click();
      cy.get('@globalCart').should('be.visible');
      cy.get('@globalCartCloseButton').click();
      cy.get('@globalCart').should('not.be.visible');
    });
  });

  it('Opens cart with first toggle then closes by clicking overlay', () => {
    cy.get('@firstToggle').click();
    cy.get('@globalCart').should('be.visible');
    cy.get('@globalCartOverlay').click();
    cy.get('@globalCart').should('not.be.visible');
  });

  it('Opens cart and checks for body scroll lock', () => {
    cy.get('@firstToggle').click();
    cy.get('@globalCart').should('be.visible');
    cy.scrollTo('top');
    cy.get('body').should('have.css', 'overflow', 'hidden');
    cy.get('@globalCartOverlay').click();
    cy.get('@globalCart').should('not.be.visible');
    cy.get('body').should('not.have.css', 'overflow', 'hidden');
    cy.scrollTo('top');
  });
});

describe('Add Product To Cart', () => {
  beforeEach(() => {
    cy.get('.cart-toggle').as('toggles');
    cy.get('.cart-toggle').first().as('firstToggle');
    cy.get('#cart').as('globalCart');
    cy.get('#cart').find('button.close').as('globalCartCloseButton');
    cy.get('#cart').find('.global-cart__overlay').as('globalCartOverlay');
  });

  it('Visits PDPs abd adds products to cart', () => {
    Cypress.env('PRODUCT_HANDLES').forEach((productHandle) => {
      cy.visit(`${Cypress.env('STORE_URL')}/products/${productHandle}`);
      cy.get('.atc-button').click();
      cy.get('@globalCart').find('.global-cart__drawer__item-list a').should('have.attr', 'href').and('include', productHandle);
      cy.get('@globalCartCloseButton').click();
    });
  });

  it('Scrolls to bottom of cart list', () => {
    cy.get('@globalCart').find('.global-cart__drawer__item-list').scrollTo('bottom');
  });
});
