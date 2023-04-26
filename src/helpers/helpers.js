export const helpers = {
  guidGenerator: () => {
    var S4 = function () {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      "-" +
      S4() +
      S4() +
      S4()
    );
  },
  randomFromArray: (arr) => arr[Math.floor(Math.random() * arr.length)],
  numberToThreeDigits: (id) => {
    if (!id) return "0000";
    let newId = id;
    let length = id.toString().length;
    if (length === 1) newId = "00" + id;
    else if (length === 2) newId = "0" + id;
    return newId;
  },
  toHashtag: (name) => name.toLowerCase().replace(/ /g, "-"),
};
