const connection =require('../config/database');
const UserModel=require('../models/UserModel');

class UserController{

    async getAllUsers(req,res){
        try{
            const [rows] = await connection.query('SELECT * FROM users');
            const users=rows.map(row=>new UserModel(row));
            res.json(users);
        }catch(error){
            console.error(error);
            res.status(500).json({error:'server error'});
        }
    }
    async getUserById(req,res){
        try {
            const [rows] =await connection.query('SELECT * FROM users WHERE id = ?',[req.params.id]);
            if(rows.length>0){
                const user=new UserModel(rows[0]);
                res.json(user);
            }else{
                res.status(404).json({error:'user not found'});
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({error:'server error'});
        }
    }
    async createUser(req,res){
        try {
            const formData=req.body;
            const newUser=new UserController({...formData});
            await connection.query('INSERT INTO users (name,email) VALUES (?,?)',[
                formData.name,
                formData.email
            ]);
            res.status(201).json({success:true,message:'User created success'});
        } catch (error) {
            console.error(error);
            res.status(500).json({error:'server error'});
        }
    }
    async updateUser(req,res){
        try {
            const userId= req.params.id;
            const formData=req.body;
            await connection.query("UPDATE users SET name=? , email=? WHERE id=?",[
                formData.name,
                formData.email,
                userId
            ]);
            res.json({id:userId,...formData});
        } catch (error) {
            console.error(error);
            res.status(500).json({error:'server error'});
        }
    }
    async deleteUser(req,res){
        try {
            const userId= req.params.id;
            const [result]=connection.query('DELETE FROM users WHERE id=?',[
                userId
            ]);
            if(result.affectedRows>0){
                res.json({success:true});
            }else{
                res.status(404).json({error:'User not found'});
            }
            
        } catch (error) {
            console.error(error);
            res.status(500).json({error:'server error'});
        }
    }

}

module.exports = UserController;