import { Dependencies, RobotEyes, RobotHands } from "../../robots/GreenCommute/Robot";

context('Exception path flows', ()=>{
    const robotEyes = new RobotEyes();
    const robotHands = new RobotHands();
    const dependencies = new Dependencies()
    const testEnv ='qa';

    let testData
    before(() => {
        cy.fixture('testData').then((user) => {
            testData = user;
        })
    })

    describe('Enter random text to the input field', () => {
        it("Launch the application", ()=>{
            dependencies.loadEnvironmentUrl(testEnv);
        })
        it("Skip 'Your location'", ()=>{
            robotHands.clickOnSkip();
        })
        it("Skip 'Job Location'", ()=>{
            robotHands.clickOnSkip();
        })
        it("Enter your skills and click on Finish", ()=>{
            //robotHands.enterSkills("Product Manager");
            robotHands.enterSkills('aabdklkc12344')
            robotEyes.seesNoOptionsInSuggestionDropdown();
        })
    })
})