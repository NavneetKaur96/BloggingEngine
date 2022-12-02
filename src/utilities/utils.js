export const fullName=(firstName,lastName)=>{
    if(firstName==null && lastName==null)
    return ""
    const name=firstName.charAt(0).toUpperCase()+firstName.slice(1)+" "+lastName.charAt(0).toUpperCase()+lastName.slice(1);
    return name

}
export const readMore=(text,len=20)=>{
    if (text && text.length > len) {
        return text.slice(0, len - 1) + "...";
      }
      return text;
}
export const findData=(id,data)=>{
    return data.find(e=>e.id===id)
}
export const getBase64 = file => {
    return new Promise(resolve => {
    
      let baseURL = "";
      // Make new FileReader
      let reader = new FileReader();

      // Convert the file to base64 text
      reader.readAsDataURL(file);

      // on reader load somthing...
      reader.onload = () => {
        // Make a fileInfo Object
      
        baseURL = reader.result;
       
        resolve(baseURL);
      };
      
    });
  };
  export const countWords=(str1)=> {
    let str=str1.toString();
    const wpm = 225;
    console.log(typeof(str))
    const text=str.trim().split(/\s+/).length;
   const time= text > "500"
    ? Math.floor(countWords(text) / wpm) + " " + "mins read"
    : "2 mins read"


    return time
  }
 