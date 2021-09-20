export default function(number) {
  let id = { '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9' };
  return number.replace(/[^0-9.]/g, function (w) {
    return id[w] || w;
  });
}
