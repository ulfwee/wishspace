const db = require('../config/db');

class BaseModel{
    constructor(collectionName){
        this.collection = db.collection(collectionName);
        this.name = collectionName;
    }

    checkWork(){
        console.log(`Working with collection: ${this.name}`);
    }

    async create(data){
        try{
            const docRef = await this.collectionName.add({ 
                ...data,
                createdAt: new Date(),
                updatedAt: new Date()
            });
            return { id: docRef, ...data };
        }catch(error){
            throw new Error(`Error creating document in ${this.collection.id}: ${error.message}`);
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
}

module.exports = BaseModel;