import { BaseHands, BaseEyes, BaseDependencies } from '../BaseRobot';


export class Dependencies extends BaseDependencies {
     
    loadEnvironmentUrl(env : string) {
        cy.fixture(env).then((envDetails) => {
           this.accessUrl(envDetails.URL);
        })
    }

}

export class RobotEyes extends BaseEyes{
    seesDashboardPage(){
        this.checksPageURL('/findJobs')
    }
    seesDashboardLabel(){
        this.seesDomVisible("p:contains('Dashboard')")
    }
    seesJobRemovedMessage(){
        this.seesDomVisible("div:contains('Job removed from saved jobs.')")
    }
    seesJobSavedMessage(){
        this.seesDomVisible("div:contains('Job saved for future reference')")
    }
    seesSavedJob(job : String){
        return this.seesExactText(`h4:contains('${job}')`, `${job}`);
    }
    seesNoOptionsInSuggestionDropdown(){
        this.seesForTextInDom("No options")
    }
    seesJobLocationSelected(jobLocation : string){
        this.seesDomWithValue("input[placeholder='Enter your job location']", `${jobLocation}`)
    }

    seesSkillsSelected(){
        this.seesDomWithValue("[data-tag-index="0"] > .MuiChip-label > h4")
    }
}

export class RobotHands extends BaseHands{
    clickOnNext(){
        this.clickOnDomElement("span:contains('Next')");
    }

    clickOnSkip(){
        this.clickOnDomElement("span:contains('Skip')");
    }

    clickOnFinish(){
        this.clickOnDomElement("span:contains('Finish')");
    }

    fillYourLocation(){
        this.typeTextonDom("placeholder", "Enter your location", "Hyderabad{downarrow}{enter}")
    }

    fillJobLocation(){
        this.typeTextonDom("placeholder", "Enter your job location", "Hyderabad{downarrow}{enter}")
    }

    enterJobLocationText(jobLocation : string){
        this.typeTextonDom("placeholder", "Enter your job location", `${jobLocation}`)
    }

    enterSkills(skills: string){
        this.typeTextonDom("placeholder", "Enter your skills", `${skills}{downarrow}{enter}`)
    }

    clickOnBackButton(){
        this.clickOnDomElement('[data-testid="back-button"]')
    }

    goToSaveJobsPage(){
        this.clickOnDomElement("p:contains('Saved Jobs')");
    }

    goToFindJobsPage(){
        this.clickOnDomElement("p:contains('Find Jobs')");
    }

    selectAJob(job: string){
        this.clickOnDomElement(`h4:contains('${job}')`);
    }

    saveTheSelectedJob(){
        this.clickOnDomElement('.MuiGrid-root > .MuiButton-outlined')
    }

    removeTheSelectedJob(){
        this.clickOnDomElement('.MuiButton-outlined')
    }
}