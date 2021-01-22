// @ts-check

// Телефонная книга
var phoneBook = [];

/**
* @param {String} command
* @returns {*} - результат зависит от команды
*/
module.exports = function (command) {
  if (command.includes('ADD')) return ADD(command);
  else if (command.includes('REMOVE_PHONE')) return REMOVE_PHONE(command);
  else return SHOW();
};

function ADD(data) {
  var arr = data.split(' ');

  if (phoneBook.length == 0) {
    phoneBook = [...phoneBook, { name: arr[1], phones: arr[2] }];
  }
  else {
    phoneBook.forEach(i => {
      if (i.name.includes(arr[1])) {
        i.phones += ',' + arr[2];
      }
      else {
        phoneBook = [...phoneBook, { name: arr[1], phones: arr[2] }];
      }
    })
  }
}

function REMOVE_PHONE(data) {
  var arr = data.split(' ');
  var bool = false;
  for (var i = 0; i < phoneBook.length; i++) {
    if (phoneBook[i].phones.includes(arr[1] + ',')) {
      phoneBook[i].phones = phoneBook[i].phones.replace(arr[1] + ',', '');
      bool = true;
      break;
    }
    else if (phoneBook[i].phones.includes(arr[1])) {
      phoneBook[i].phones = phoneBook[i].phones.replace(arr[1], '');
      bool = true;
      break;
    }
    else bool = false;
  }
  return bool;
}

function SHOW() {
  var resultStr = '';
  var result = [];
  phoneBook.forEach(i => {
    resultStr = i.name + ': ';
    if (i.phones != '') {
      resultStr += i.phones.split(',').join(', ');
      result.push(resultStr);
    }
  })
  return result.sort();
}
