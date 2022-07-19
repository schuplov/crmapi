

class adminController {
    async create_cic (req, res) {
        try{
            console.log('yesss')
        } catch (e){
            res.status(403).json({message: 'Ошибка', e})
            console.log(e);
        }   
    }
    async add_homework (req, res) {
        try{
            
        } catch (e){
            res.status(403).json({message: 'Ошибка', e})
            console.log(e);
        }   
    }
    async add_comments (req, res) {
        try{
            
        } catch (e){
            res.status(403).json({message: 'Ошибка', e})
            console.log(e);
        }   
    }




}


module.exports = new adminController()