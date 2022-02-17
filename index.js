class GitBot{

    constructor(){
        this.config = require('./config/puppeteer.json');
    }

    async init(){
        const puppeteer = require('puppeteer');
        this.browser = await puppeteer.launch({
            headless:this.config.settings.headless,
        });
        this.page = await this.browser.newPage();
        this.page.setViewport({width:1280, height:720});
    }

    async visitGit(){
        await this.page.goto(this.config.base_url);
        await this.page.waitForTimeout(500);
        await this.page.click(this.config.selectors.signin_button);
        await this.page.waitForTimeout(2000);

        await this.page.focus(this.config.selectors.username_field);
        await this.page.keyboard.type(this.config.username);

        await this.page.focus(this.config.selectors.password_field);
        await this.page.keyboard.type(this.config.password);

        await this.page.click(this.config.selectors.login_button);
        await this.page.waitForNavigation();

        await this.page.waitForTimeout(1500);
    }

   
  async closeBrowser(){
      await this.browser.close()
  }

}

module.exports = GitBot
