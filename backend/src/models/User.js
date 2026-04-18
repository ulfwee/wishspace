const BaseModel = require('./BaseModel');

class User extends BaseModel{
    constructor(userData = {}){
        super('users');

        this.uid = userData.uid || null;
        this.name = userData.name || "";
        this.surname = userData.surname || "";
        this.username = userData.username || "";
        this.email = userData.email || "";
        this.password = userData.password || "";
        this.biography = userData.biography || "";
        this.image = userData.image || null;
        this.friends = userData.friends || [];
    }

    toData(){
        return{
            name: this.name,
            surname: this.surname,
            username: this.username,
            email: this.email,
            password: this.password,
            biography: this.biography,
            image: this.image,
            friends: this.friends
        }
        
    }
}

module.exports = User;