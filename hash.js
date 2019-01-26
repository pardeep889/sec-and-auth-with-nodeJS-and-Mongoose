const bcrypt = require('bcrypt');

bcrypt.genSalt(10,(err,salt) => {
    if(err) throw err;
    // console.log(salt)
    bcrypt.hash('123456',salt, (err,hash) => {
        if (err) throw err;
        console.log(hash)
    })
})