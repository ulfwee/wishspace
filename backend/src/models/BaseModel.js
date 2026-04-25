const db = require('../config/db');

class BaseModel{
    constructor(collectionName){
        this.collection = db.collection(collectionName);
        this.name = collectionName;
    }

    checkWork(){
        console.log(`Working with collection: ${this.name}`);
    } 

    async getDataAll(){
        try{
            const result = await this.collection.get();

            if(result.empty){
                return [];
            }

            return result.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
        }catch(error){
            throw new Error(`Error getting all data from colection ${this.name}: ${error.message}`);
        }
    }

    async create(data){
        try{
            const docRef = await this.collection.add({ 
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return { id: docRef.id, ...data };
        }catch(error){
            throw new Error(`Error creating document in ${this.name}: ${error.message}`);
        }
    }

    async update(id, data){
        try{
            const docRef = this.collection.doc(id);
            await docRef.update({
                ...data,
                updatedAt: new Date()
            });
            return { id, ...data };
        }catch(error){
            throw new Error(`[${this.name}] Update Error for ID ${id}: ${error.message}`);
        }
    }

    async delete(id){
        try{
            await this.collection.doc(id).delete();
            return { id, deleted: true };
        }catch(error){
            throw new Error(`[${this.name}] Delete Error for ID ${id}: ${error.message}`);
        }
    }

    async findByField(field, value){
        const found = await this.collection.where(field, '==', value).get();

        if(found.empty) return null;

        const doc = found.docs[0];
        return { id: doc.id, ...doc.data() };
    }

    async findById(id){
        const doc = await this.collection.doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    }

    validateBool(value) {
        const allowed = ["true", "false"];

        if (!allowed.includes(value)) {
            return "false"; 
        }

        return value;
    }
}

module.exports = BaseModel;