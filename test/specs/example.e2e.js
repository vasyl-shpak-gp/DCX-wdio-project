const dcxPage = require('../pageobjects/dcx.page')
const SecurePage = require('../pageobjects/secure.page')
const text = require('../../translations/data');

const dropdownData = [
    { item: 3, value: 'Products & Platforms' },
    { item: 7, value: 'Technology Expertise' },
]

const teachnologyExpertiseData = [
    { item: 0, nameValue: 'Salesforce', attributeValue: 'salesforce-partner-logo', desriptionValue: text.Salesforce },
    { item: 1, nameValue: 'Acquia', attributeValue: 'acquia-logo', desriptionValue: text.Acquia },
    { item: 2, nameValue: 'Acoustic', attributeValue: 'acoustic-campaign', desriptionValue: text.Acoustic },
    { item: 3, nameValue: 'Adobe', attributeValue: 'adobe-campaign-logo', desriptionValue: text.Adobe },
    { item: 4, nameValue: 'Bynder', attributeValue: 'bynder-logo', desriptionValue: text.Bynder },
    { item: 5, nameValue: 'Sitecore', attributeValue: 'sitecore-logo', desriptionValue: text.Sitecore },
]

describe('List of capabilities', () => {
    beforeEach(async () => {
        await dcxPage.open()
        browser.maximizeWindow()
    });

    //! Task Scope covered in test case below
    // ?Open the main page
    // ?On the header locate the capabilities dropdown
    // ?Ensure that the capabilities dropdown list contains [Products & Platforms, Technology Expertise]
    dropdownData.forEach((element) => {
        it(`should contain capabilities "${element.value}" dropdown list`, async () => {
            await $(`span*=${'Capabilities'}`).moveTo()
            const dropdownValue = await $('ul.dropdown-menu.single');
            const dropVal = await dropdownValue.$$('li.mega-submenu')[element.item].getText()
            await expect(dropVal).to.equal(element.value);
        })
    })

    //! Task Scope covered in test case below
    //? Select Technology Expertise and ensure that the page contains a list of technologies
    //?  Each of the technology blocks should contain: Name, Image, Description]
    teachnologyExpertiseData.forEach((element) => {
        it('select Technology Expertise should contain a list of technologies', async () => {
            await $(`span*=${'Capabilities'}`).moveTo()
            const dropdownValue = await $('ul.dropdown-menu.single');
            await dropdownValue.$$('li.mega-submenu')[7].click()
            const imgA = await $$('.card-image img')[element.item].getAttribute('alt')
            //assert name
            expect(await $(`h5=${element.nameValue}`).getText()).to.equal(`${element.nameValue}`);
            //assert image
            expect(imgA).to.equal(element.attributeValue);
            const description = await $$('.card-description h5')[element.item].getText()
            //assert description
            expect(description).to.contain(element.desriptionValue)
        })
    })
})


