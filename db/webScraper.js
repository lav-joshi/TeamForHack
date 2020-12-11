const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const Hackathons = require('../models/Hackathon');

const uri = "https://devfolio.co/hackathons";

module.exports = ()=>{
    Hackathons.find({}, async(err,hackathons)=>{
        if(err){
            console.log(err);
        } else {
            puppeteer
            .launch()
            .then(browser => browser.newPage())
            .then(page => {
            return page.goto(uri).then(function() {
                return page.content();
            });
            })
            .then(html => { 
                const $ = cheerio.load(html);
                const ObjArray = [];
                const hackathonNames = [];
                const start = [];
                const end = [];
                const links = [];
                $('a[class="style__Anchor-sc-19afmba-4 hcmcER"] > span > span[class="sc-fzokOt kIFYmG"]').each(function() {
                    hackathonNames.push($(this).text());
                });
                var i=0;
                $('span[color="grey-8"]').each(function(){
                    if(i%2==0) start.push($(this).text());
                    else end.push($(this).text());
                    i++;
                })
                $('a[class="style__Anchor-sc-19afmba-4 hcmcER"]').each(function(){
                    links.push($(this).attr('href'));
                })
                for(let i=0;i<start.length;i++){
                    ObjArray.push({
                        title: hackathonNames[i],
                        start_date: start[i],
                        end_date: end[i],
                        link: links[i]
                    });
                }
                ObjArray.reverse();
                if(hackathons.length == 0){
                    Hackathons.create(ObjArray, async(err) => {
                        if (err) {
                            console.log("Can't save array: "+ err);
                        } else{
                            console.log("Latest Hackathons added in DB");
                        }
                    });
                } else { //add more hackathons
                    ObjArray.forEach((Obj)=>{
                        Hackathons.find({title:Obj.title},(err,exist)=>{
                            if(err) console.err();
                            if(exist) {}
                            else {
                                Hackathons.create(Obj, async(err) => {
                                    if (err) {
                                        console.log("Can't save new Hackathon: "+ err);
                                    } else{
                                        console.log("A New Hackathon added in DB");
                                    }
                                });
                            }
                        })
                    })
                }
            })
            .catch(console.error);
        }
    })
}