//handlebars helpers

module.exports = {
  //truncate function from stackoverflow
  truncate: (str, len) => {
    if(str.length > len && str.length >0){
      var new_str = str + " ";
      new_str = str.substr(0, len);
      new_str = str.substr(0, new_str.lastIndexOf(" "));
      new_str = (new_str.length > 0) ? new_str : str.substr(0, len);
      return new_str + '...';
    }
    return str;
  },
  //strips html tags
  stripTags: (input) => {
    return input.replace(/<(?:.|\n)*?>/gm, '');   
  }
}