/* eslint no-console: 0 */

var coolPak = require('jsmp-infra-very-very-cool-pak');

require('bootstrap/less/bootstrap.less');
require('./less/all.less');
require('bootstrap');

$('button[data-target="#myModal"]').click(function handleClick() {
    console.log(coolPak.reverseAndSpace('apple'));
    console.log(coolPak.squareAndSort([2, 1]));
});
