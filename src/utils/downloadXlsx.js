import * as XLSX from "xlsx";



const downloadExcel = async (data) => {
  try {
    const flattenTheData = data.map(item => ({
      urls: item.url,
      emails: Array.isArray(item.emails) ? item.emails.join(', ') : "null"  // Join multiple emails into a single string
    }));
    const worksheet = XLSX.utils.json_to_sheet(flattenTheData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  } catch (err) {
    console.log(err)
  }

};


// const asyncDownloadExcel = (data) => {
//   return new Promise((res, rej) => {
//     if (data.length > 0) {
//       downloadExcel(data)
//     }
//   })
// }


export default downloadExcel;
// export default asyncDownloadExcel; 
