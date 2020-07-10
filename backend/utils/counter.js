module.exports = (args, elem) => {

    return args.filter(x => x === args[elem]).length;
    
    // return args.count(elem)
    
}