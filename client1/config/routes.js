

module.exports=(app)=>{
    app.use('/dashboard/:id',(req,res)=>{
        
        let ahref=`/dashboard/${req.params.id}`
        //res.sendFile('../static/index.html')
        res.render('mockedHome',{ahref})
    });
    app.use('/dashboard',(req,res)=>{
        
        let ahref=`/dashboard`
        //res.sendFile('../static/index.html')
        res.render('mockedHome',{ahref})
    });



}