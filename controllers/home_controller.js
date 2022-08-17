module.exports.home = function(req,res){
    return res.end('<h1>Express is up for codeial</h1>');
};

module.exports.profile = function(req,res){
    return res.end('<h1>This is profile</h1>');
}