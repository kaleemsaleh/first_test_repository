/**
 * Created by KaleemUllah on 2/17/2016.
 */
var sys = require("sys"),
    my_http = require("http"),
    path = require("path"),
    url = require("url"),
    fs = require("fs");
    filesys = require("fs");
my_http.createServer(function(request,response){
    var my_path = url.parse(request.url).pathname;
    var full_path = path.join(process.cwd(),my_path);
    fs.stat(full_path,function(exists){ /*orignal was path.exist..... but it's deprecated then I used fs.exists but that one is also deprecated-FINAL IS fs.stat*/
        if(!exists){
            response.writeHeader(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
        }
        else{
            filesys.readFile(full_path, "binary", function(err, file) {
                if(err) {
                    response.writeHeader(500, {"Content-Type": "text/plain"});
                    response.write(err + "\n");
                    response.end();

                }
                else{
                    response.writeHeader(200);
                    response.write(file, "binary");
                    response.end();
                }

            });
        }
    });
})
my_http.createServer(function(request,response){
        var my_path = url.parse(request.url).pathname;
        load_file(my_path,response);/*it's saying load file is not defines... I guess it also deprecated. I tried for the alternative but couldn't find anything.*/
    }).listen(8080);
sys.puts("Server Running on 8080");