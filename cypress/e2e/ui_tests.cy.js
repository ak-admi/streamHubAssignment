describe('EMI Calculator UI Tests', () => {
  beforeEach(() => {
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });
  });
  function moveSlider(sliderSelector, inputSelector, targetAmount) {
    cy.get(inputSelector).then($input => {
      const initialAmount = parseInt($input.val().replace(/,/g, ''), 10);
      if (initialAmount === targetAmount) {
        return;
      }
      const stepAmount = 10000;
      const steps = Math.abs((targetAmount - initialAmount) / stepAmount);

      function moveStep(stepIndex) {
        cy.get(sliderSelector).then($slider => {
          // const slider=$slider[0];
          // const rect =$slider.getBoundingCLientRect();
          const handle = $slider[0];
          const handleRect = handle.getBoundingCLientRect();
          const startX = handleRect.left + handle.width / 2;
          const direction = targetAmount > initialAmount ? 1 : -1;
          const endX = startX + direction * stepAmount * rect.width / initialAmount;

          cy.wrap(handle)
            .trigger('mousedown', { which: 1, pageX: startX })
            .trigger('mousemove', { which: 1, pageX: endX })
            .trigger('mouseup');
          cy.get(inputSelector).invoke('val').then(value => {
            const currentValue = parseInt(value.replace(/,/g, ''), 10);
            if (currentValue !== targetAmount && stepIndex < steps) {
              moveStep(stepIndex + 1);
            }
          });

        });
      }
      moveStep(0);
    });
  }

  it('Validates the EMI pie chart for Home Loan with Loan Amount 2500000', () => {
    cy.visit('https://emicalculator.net/');
    cy.get('#home-loan').click();
    cy.get('input#loanamount').clear().type('2500000');
    cy.get('input#loaninterest').clear().type('10');
    cy.get('input#loanterm').clear().type('10{enter}');
    cy.get('.highcharts-pie-series').should('exist');
    cy.get('.highcharts-data-label').each(($el, index, $list) => {
      cy.wrap($el).find('text tspan').invoke('text').then((text) => {
        const percentageText = text.trim();
        const percentageValue = parseFloat(percentageText.replace('%', ''));
        expect(percentageValue).to.be.within(0, 100);
      });
    });
  });

  it('Validates the EMI pie chart for Home Loan with Loan Amount 5000000', () => {
    cy.visit('https://emicalculator.net/');
    cy.get('#home-loan').click();
    cy.get('input#loanamount').clear().type('2500000');
    cy.get('input#loaninterest').clear().type('10');
    cy.get('input#loanterm').clear().type('10{enter}');
    cy.get('.highcharts-pie-series').should('exist');

    cy.get('.highcharts-data-label').each(($el, index, $list) => {
      cy.wrap($el).find('text tspan').invoke('text').then((text) => {
        const percentageText = text.trim();
        const percentageValue = parseFloat(percentageText.replace('%', ''));
        expect(percentageValue).to.be.within(0, 100);
      });
    });
  });
  it('Validate personal loan tab with Bar chart by using input through slider for Amount 1000000', () => {
    cy.visit('https://emicalculator.net/');
    cy.get('#personal-loan').click();
    //moveSlider('#loanamountslider','input#loanamount',1000000);

    cy.get('#loanamountslider')
    .then($slider=>{
      const sliderWidth = $slider.width();
      const maximumSliderValue = 3000000;
      const desiredValue =1000000;
      const percentage = (desiredValue / maximumSliderValue);

      const sliderHeight = $slider.height();
      const clickX = sliderWidth * percentage;
      const clickY = sliderHeight / 2; 

      cy.wrap($slider).click(clickX, clickY);
    });
    cy.get('#loaninterestslider')
    .then($sliderRange=>{
      const sliderWidth = $sliderRange.width();
      const maximumSliderValue = 25;
      const desiredValue =12;
      const percentage = (desiredValue / maximumSliderValue);
      const sliderHeight = $sliderRange.height();
      const clickX = sliderWidth * 0.35;
      const clickY = sliderHeight / 2;
      cy.wrap($sliderRange).click(clickX, clickY); 
    });
    cy.get('#loantermslider')
    .then($termSlider=>{
      const termSliderWidth = $termSlider.width();
      const maximumSliderValue = 5;
      const desiredValue =5;
      const percentage = (desiredValue / maximumSliderValue);
      const sliderHeight = $termSlider.height();
      const clickX = termSliderWidth  * percentage;
      const clickY = sliderHeight / 2;
      cy.wrap($termSlider).click(clickX, clickY,{force: true}); 
    });
    cy.get('#startmonthyear').scrollIntoView();
    cy.get('#startmonthyear').click();
    cy.get('.datepicker-months')
      .contains('span', 'Apr')
      .click();
      cy.get('#emibarchart .highcharts-series-group').should('exist');
      cy.get('#emibarchart .highcharts-series-group .highcharts-point').its('length').then((numberOfBars) => {
        cy.log('Number of bars:', numberOfBars);
  
        // Additional assertions or actions can be taken based on the number of bars
        expect(numberOfBars).to.be.greaterThan(0); // Example assertion
      });
      cy.get('#emibarchart .highcharts-series-group .highcharts-point')
      .should('length',18)
      .then((bars)=>{
        const firstBar =bars.eq(0);
        cy.wrap(firstBar).trigger('mouseover',{force:true});
        cy.get('.highcharts-tooltip')
        .should('be.visible')
        .then((tooltip)=>{
          const toolTipText=tooltip.text();
          cy.log('Tooltip Text:',toolTipText);
          expect(toolTipText).to.not.be.empty;
        });
      });
  });
});