
// If you dont want to use special characters:
export const specialCharsFunction =(str)=>{
    var specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\?]/;
        return specialChars.test(str)
}

// Inputun date'inde bugunku tarihi otomatik yazmasi icin:
export const formtDateForDateInput=(date)=>{
  var year = new Date(date).getFullYear();
  var month = new Date(date).getMonth() + 1;
  if (month < 10) month = `0${month}`;
  var date = new Date(date).getDate();
  if (date < 10) date = `0${date}`;

  return `${year}-${month}-${date}`
}

// Inputu kullanici kucuk harfle girse bile kaydi buyuk harfle yapmak icin:
export const uppercaseFirstLetter =(str)=>{
    let temp = ""
    temp += str[0].toUpperCase()   // ilk harfi buyuk harfe cevir
    for(let i=1; i<str.length; i++){
        temp+=str[i].toLowerCase() // Geri kalanlari kucuk harfe cevir: kelime dEneMe boyle girilse bile, boyle (Deneme) kaydedecek (yalniz veri tabaninda kullanicinin girdigi gibi kaydedilir)
    }
    return temp
}