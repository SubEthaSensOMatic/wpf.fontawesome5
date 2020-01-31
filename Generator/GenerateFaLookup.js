let fs = require('fs');
let path = require('path');

let sourceFile = __dirname + '/../Font-Awesome/metadata/icons.json';
let targetFile = __dirname + '/../FaLookup.g.cs';

fs.readFile(sourceFile, { encoding: 'utf-8' }, (err, json) => {

    if (!err) {

        let awesome = JSON.parse(json);

        let cs = ` 
            using System.Collections.Generic;

            namespace FontAwesome.Wpf { 
                
                public static class FaLookup { \r\n\r\n `


        cs += 'public static readonly Dictionary<string, char> Regular = new Dictionary<string, char>()\r\n';
        cs += '{\r\n';

        for (var key in awesome) {
            if ('regular' in awesome[key].svg)
                cs += '{"' + key + '",  \'\\u' + awesome[key].unicode + '\'},\r\n';
        }

        cs += '};\r\n';


        cs += 'public static readonly Dictionary<string, char> Solid = new Dictionary<string, char>() \r\n';
        cs += '{\r\n';

        for (var key in awesome) {
            if ('solid' in awesome[key].svg)
                cs += '{"' + key + '",  \'\\u' + awesome[key].unicode + '\'},\r\n';
        }

        cs += '};\r\n';


        cs += 'public static readonly Dictionary<string, char> Brands = new Dictionary<string, char>() \r\n';
        cs += '{\r\n';

        for (var key in awesome) {
            if ('brands' in awesome[key].svg)
                cs += '{"' + key + '",  \'\\u' + awesome[key].unicode + '\'},\r\n';
        }

        cs += '};\r\n';

        cs += `
                }   
            }
        `;

        fs.writeFile(targetFile, cs, err => {
            if (err)
                console.log(err);
        });
    }
    else {
        console.log(err);
    }
});