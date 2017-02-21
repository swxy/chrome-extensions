/**
 * Created by baidu on 16/9/27.
 *
 * refer: http://krasimirtsonev.com/blog/article/Javascript-template-engine-in-just-20-line
 */

function Template (tpl, data) {
    console.log(data);
    var code = 'var r=[];\n',
        re = /<%(.+?)%>/g,
        reExp = /(^\s*(if|for|else|switch|case|break|{|})).*/g,
        cursor = 0,
        match;
    var add = function (line, js) {
        js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    };
    while(match = re.exec(tpl)) {
        add(tpl.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(tpl.substr(cursor, tpl.length - cursor));
    code += 'return r.join("");';
    return new Function('data', code.replace(/[\r\t\n]/g, '')).apply(null, [data]);
};