# Project showcasing Python+AngularJS usecases

[Iftekher Toufique Imam](https://www.github.com/toufique-imam)

---

[![GitHub Stars](https://img.shields.io/github/stars/toufique-imam/skunkworks-Project-Submission?style=social)](https://github.com/caojiezhang/DAVSR)
[![download](https://img.shields.io/github/downloads/toufique-imam/skunkworks-Project-Submission/total.svg)](https://github.com/caojiezhang/DAVSR/releases)
![visitors](https://visitor-badge.glitch.me/badge?page_id=toufique-imam/skunkworks-Project-Submission)

---

## Setup
- goto `Flask\RestService.py` and edit your mongodb Client url `(line 15)`
```py
client = MongoClient("<PUT YOUR MONGODB URL HERE>")
#other configs for mongodb
```
- open a terminal , navigate to `Flask\` and run `python RestService.py`
- open another termial , navigate to Root folder 
- Run `npm install`
- Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. 

## Website navigations
### When first time , website will ask for Admin Account Signup 
![Admin Signup first time](Images\adminLogin.png "Admin Signup first time")

### After signed up from admin login section can add user / view current users
![Admin Panel 1](Images\adminPanel1.png "Admin Panel 1")
![Admin Panel 2](Images\adminPanel2.png "Admin Panel 2")
![Admin Panel 3](Images\adminPanel3.png "Admin Panel 3")

### Access suite from homepages
![suite access](Images\suiteAccess1.png "Suite Access")
![suite enter](Images\suiteEnter1.png "Suite Enter")
![suite cant access](Images\suiteCantAccess.png "Suite Cant Access")
![suite Exit](Images\suiteexit1.png "Suite exit")
