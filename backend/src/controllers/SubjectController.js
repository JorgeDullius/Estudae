const sequelize = require("../server");
const topic = sequelize.import('../models/Topic');
const subject = sequelize.import('../models/Subject');
class SubjectController{
    async getAllSubjects(req,res){
        try{
            const subjects = await subject.findAll();
            res.json(subjects);
        }catch(e){
            res.status(500).json({error : `${e}`});
        }
    }
    async getSubjectByName(req,res){
        try{
            const subjectData = await subject.findOne({ where : {name: req.params.subjectName}});
            if(subjectData){
                let subjectTopics = await topic.findAll({ where: {subjectId: subjectData.id}});
                if(subjectTopics != ""){
                    subjectTopics = subjectTopics.map(topic => {
                        return {
                            "name": topic.name,
                            "content": topic.conteudo,
                            "id": topic.id,
                            "subjectId": topic.subjectId
                        }
                    });
                    res.json(subjectTopics);
                }else{
                    res.status(404).json({error : `Não existem tópicos cadastrados nessa disciplina`});
                }

            }else{
                res.status(404).json({error : `Essa disciplina não existe`});
            }
        }catch(e){
            res.status(500).json({error : `${e}`});
        }        
    }
    async create(req,res){
        try{
            if(await subject.findOne({ where: {name: req.body.name}})){
                res.status(400).json({error : "Subject already exist"});
            }
            const subjectData = await subject.create(req.body);
            res.send(subjectData);
        }catch(e){
            res.status(500).json({error : `${e}`});
            console.log(e);
        }
    }
    async deleteSubject(req,res){
        try{
            const NumberOfSubjectsDeleted = await subject.destroy({ where: {name: req.body.subjectName}});
            res.json(`${NumberOfSubjectsDeleted}`);
        }catch(e){
            res.status(500).json({error : `${e}`});
        }
    }
}
module.exports = new SubjectController();