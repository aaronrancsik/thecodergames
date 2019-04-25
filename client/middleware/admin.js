export default (context) => {

    let x = context.app.context.app.$cookies.get('roles');
    
    if(x!==undefined && x.includes('admin')){
        
    }else{
        return context.redirect('/login');
    }
}
  