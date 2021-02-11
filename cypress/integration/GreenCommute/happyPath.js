import { RobotEyes, RobotHands, Dependencies } from '../../robots/GreenCommute/Robot';

context('Happy Path flows..!', () => {
    const robotEyes = new RobotEyes();
    const robotHands = new RobotHands();
    const dependencies = new Dependencies()
    const testEnv ='qa';

    // afterEach(()=>{
    //     robotHands.wait(1000)
    // })

    let testData
    before(() => {
        cy.fixture('testData').then((user) => {
            testData = user;
        })
    })
    
    describe("Navigate to Dashboard", () => {
        it("Launch the application", ()=>{
            dependencies.loadEnvironmentUrl(testEnv);
        })
        it("Skip 'Your location'", ()=>{
            robotHands.clickOnSkip();
        })
        it("Skip 'Job Location'", ()=>{
            robotHands.clickOnSkip();
        })
        it("Skip 'Your skills'", ()=>{
            robotHands.clickOnFinish();
        })
        it("Assert the default page", ()=>{
            robotEyes.seesDashboardPage();
            robotEyes.seesDashboardLabel();
        })
    })

    describe("Save a job", () => {
        it("Launch the application", ()=>{
            dependencies.loadEnvironmentUrl(testEnv);
        })
        it("Enter your location and click on Next", ()=>{
            robotHands.fillYourLocation();
            robotHands.clickOnNext();
        })
        it("Enter Job location and click on Next", ()=>{
            robotHands.fillJobLocation();
            robotHands.clickOnNext();
        })
        it("Enter your skills and click on Finish", ()=>{
            //robotHands.enterSkills("Product Manager");
            robotHands.enterSkills(testData.job_types.product_manager)
            robotHands.clickOnFinish();
        })
        it("Go to Save Jobs page", ()=>{
            robotHands.goToSaveJobsPage();
        })
        it("Verify if the job is already saved and remove it before adding it", ()=>{ 
            if(robotEyes.seesSavedJob(testData.job_types.product_manager,testData.job_types.product_manager)){ 
                robotHands.selectAJob(testData.job_types.product_manager);
                robotHands.removeTheSelectedJob();
                robotEyes.seesJobRemovedMessage();
                }
        })
        it("Go back to Find Jobs page", ()=>{
            robotHands.goToFindJobsPage();
        })
    
        it("Select the Job and click on save", ()=>{
            robotHands.selectAJob(testData.job_types.product_manager);
            robotHands.saveTheSelectedJob();
        })
        it("Assert the succes message", ()=>{
            robotEyes.seesJobSavedMessage();
        })
        it("Go to Save Jobs page", ()=>{
            robotHands.goToSaveJobsPage()
        })
        it("Verify if the job saved is available in Saved jobs", ()=>{
            robotEyes.seesSavedJob(testData.job_types.product_manager);
        })
    
    })

    describe("Add Multiple Jobs", () =>{
        it("Launch the application", ()=>{
            dependencies.loadEnvironmentUrl(testEnv);
        })

        it("Enter your location and click on Next", ()=>{
            robotHands.fillYourLocation();
            robotHands.clickOnNext();
        })
        it("Enter Job location and click on Next", ()=>{
            robotHands.fillJobLocation();
            robotHands.clickOnNext();
        })
        it("Enter your skills and click on Finish", ()=>{
            robotHands.enterSkills(testData.job_types.product_manager);
            robotHands.enterSkills(testData.job_types.java_developer);
        })
        it("Verifies if the Entered Skills are present", () => {
            robotEyes.seesForTextWithSelector('[data-tag-index="0"] > .MuiChip-label > h4','PRODUCT_MANAGER')
            robotEyes.seesForTextWithSelector('[data-tag-index="1"] > .MuiChip-label > h4','JAVA_DEVELOPER')
        })
    })
    });


