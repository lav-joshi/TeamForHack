const request = require('request');

const Hackathons = require('../models/Hackathon');

const uri = "https://devfolio.co/api/hackathons?filter=all&page=1&limit=20";

module.exports = ()=>{
    Hackathons.find({}, async(err,hackathons)=>{
        if(err){
            console.log(err);
        } else {
            request(uri,(err,res,body)=>{
                if(err){
                    console.log("Request error:" + err);
                } else {
                    const hackathonNames = [];
                    const start = [];
                    const end = [];
                    const links = [];
                    const data = JSON.parse(body); 
                    const ObjArray = [];
                    const flag = [];
                    data.result.forEach((obj)=>{
                        hackathonNames.push(obj.name.trim());
                        start.push(new Date(obj.starts_at));
                        end.push(new Date(obj.ends_at));
                        links.push(obj.hackathon_setting.site);
                        if(Date.now() - new Date(obj.ends_at) > 0){
                            flag.push(1);
                        } else flag.push(0);
                    });
                    for(let i=0;i<start.length;i++){
                        ObjArray.push({
                            title: hackathonNames[i],
                            start_date: start[i],
                            end_date: end[i],
                            link: links[i],
                            finished:flag[i]
                        });
                    }
                    // Hackathons.deleteMany({},()=>{}); return;
                    // ObjArray.reverse();
                    // console.log(ObjArray);
                    if(hackathons.length == 0){
                        Hackathons.create(ObjArray, async(err) => {
                            if (err) {
                                console.log("Can't save array: "+ err);
                            } else{
                                console.log("Latest Hackathons added in DB");
                            }
                        });
                    } else { //add more hackathons
                        hackathons.forEach(async(hackathon)=>{
                            if(Date.now() - new Date(hackathon.end_date) > 0){
                                hackathon.finished = 1;
                            } else hackathon.finished = 0;
                            await hackathon.save();
                        })
                        ObjArray.forEach((Obj)=>{
                            Hackathons.findOne({title:Obj.title},(err,exist)=>{
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
                }
            });
        }
    })
}