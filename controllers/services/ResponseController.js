/*
*  This controller using for response
*
*
*
*
*
* */


class ResponseController{
    async 200(res, message, type, data){
        try {
            return res.status(200).json({
                info:{
                    message: message,
                    type: type,
                    data: !data ? null : data,
                    success: true
                }

            })
        }
        catch (e){
            console.log(' response 200 error ' + e)
        }
    }
    async 404(req,message,type){
        try{

        } catch (e){
            console.log(' response 404 error ' + e)
        }
    }
    async 401(res,message,type)
    {
        try{
            return res.status(401).json({
                error:{
                    message: message,
                    type: type,
                    success: false
                }

            })
        } catch (e) {
            console.log(' response 401 error ' + e)
        }
    }
    async 403(res,message,type)
    {
        try{
            return res.status(401).json({
                error:{
                    message: message,
                    type: type,
                    success: false
                }

            })
        } catch (e) {
            console.log(' response 401 error ' + e)
        }
    }
}

module.exports = new ResponseController()