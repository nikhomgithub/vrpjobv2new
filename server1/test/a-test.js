
const mongoose = require('mongoose');
const User = require('../modals/User')
require('dotenv').config();

const db=process.env.MONGO_URI

const fff=()=>{
    return "a"
}

describe('Test all a', () => {
    beforeAll(async () => {
        await mongoose.connect(db, 
            { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }, 
            (err) => {
            if (err) {
                console.log('err')
                console.error(err);
                process.exit(1);
            }
        });
    });

    test("test a 1",async ()=>{
        //connectToMongoose()
        const result = await User.findOne({})
        console.log(result)
        console.log('aaaa')
        expect( fff() ).toBe("a")
    })    

})

  